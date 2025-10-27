import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { ConfigService } from "../config"
import {
  CreateCompletion,
  CreateSummary,
  CreateTranscriptionData,
} from "../openapi"
import * as OpenApi from "../openapi/services.gen"

import { CryptoService } from "../crypto/crypto.service"
import { PatientSummaryService } from "../patient-summary/patient-summary.service"
import { PatientsService } from "../patients/patients.service"
import { UserEntity } from "../users"
import { extractTextFromProseMirror } from "../utils/prosemirror.utils"
import { CreateCompletionDto } from "./dto/create-completion.dto"
import { CreateSummaryDto } from "./dto/create-summary.dto"
import { NewTranscriptionResponseDto } from "./dto/create-transcription.dto"

@Injectable()
export class AiService {
  constructor(
    configService: ConfigService,
    private readonly patientsService: PatientsService,
    private readonly cryptoService: CryptoService,
    private readonly patientSummaryService: PatientSummaryService
  ) {
    OpenApi.client.setConfig({
      baseURL: configService.get("AI_SERVICE_URL"),
      auth: {
        username: configService.get("AI_SERVICE_USERNAME"),
        password: configService.get("AI_SERVICE_PASSWORD"),
      },
      headers: {
        "X-Api-Version": configService.get("AI_SERVICE_VERSION"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  }

  async createCompletion(
    createCompletionDto: CreateCompletionDto,
    user: UserEntity
  ) {
    const body: CreateCompletion = {
      ...createCompletionDto,
      user: { id: user.id },
      tenant: { id: user.organisationId },
    }

    const res = await OpenApi.createCompletion({
      body,
    })
    return res.data
  }

  async getCompletion(id: string) {
    const res = await OpenApi.getCompletion({ path: { id } })
    return res.data
  }

  async createSummary(content: string, user: UserEntity) {
    const body: CreateSummary = {
      user: { id: user.id },
      tenant: { id: user.organisationId },
      prompt: {
        type: "simple",
        content,
      },
    }
    const res = await OpenApi.createSummary({ body })

    return res.data
  }

  async getSummary(summaryId: string) {
    const res = await OpenApi.getSummary({ path: { id: summaryId } })
    const summary = res.data

    if (!summary) {
      throw new NotFoundException("Summary not found")
    }

    return summary
  }

  async createSummaryForPatient(
    { patientId }: CreateSummaryDto,
    user: UserEntity
  ) {
    const patient = await this.patientsService.findOne(patientId)

    if (patient.organisationId !== user.organisationId) {
      throw new ForbiddenException(
        "Patient does not belong to your organisation."
      )
    }

    // filter all documents that are not in draft state
    // const nonDraftDocuments = patient.documents.filter(
    //   (document) => document.status !== DocumentStatus.DRAFT
    // )

    const extractedTexts = patient.documents.map((document) =>
      extractTextFromProseMirror(document.content)
    )

    const relevantPatientInformation = {
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthDate: patient.birthDate,
      insurance: patient.insurance,
    }

    const content =
      "Patient: " +
      JSON.stringify(relevantPatientInformation) +
      "\n" +
      extractedTexts.join("\n")

    const contentHash = await this.cryptoService.hashString(content)

    // check if a summary with the same content already exists
    // If exists return the existing summary
    if (patient.summary && patient.summary.contentHash === contentHash) {
      return this.getSummary(patient.summary.id)
    }

    // If not exists create a new summary and update the patient with the summary id

    const summary = await this.createSummary(content, user)

    await this.patientSummaryService.create({
      patientId: patient.id,
      contentHash,
      id: summary.id,
    })

    return summary
  }

  async createTranscription(
    audioFile: Express.Multer.File,
    user: UserEntity
  ): Promise<NewTranscriptionResponseDto> {
    const data: CreateTranscriptionData = {
      body: {
        userId: user.id,
        tenantId: user.organisationId,
        audioFile: new Blob([audioFile.buffer]),
      },
    }

    const res = await OpenApi.createTranscription(data)

    return res.data
  }

  async getTranscription(id: string) {
    const res = await OpenApi.getTranscription({ path: { id } })
    return res.data
  }
}
