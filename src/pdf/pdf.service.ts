import { Injectable } from "@nestjs/common"
import { DocumentType } from "@prisma/client"
import * as puppeteer from "puppeteer"
import { PatientEntity } from "../patients/entities/patient.entity"
import { PatientsService } from "../patients/patients.service"
import { CreatePdfDto } from "./dto/create-pdf.dto"
import { pdfBodyTemplate } from "./templates/pdfBody"

const mapDocumentTypeToTitle: Record<DocumentType, string> = {
  [DocumentType.REFERRAL_LETTER]: "Verlaufsbericht",
  [DocumentType.PROGRESS_REPORT]: "Arztbrief",
}

@Injectable()
export class PdfService {
  constructor(private readonly patientService: PatientsService) {}

  async create({
    htmlContent,
    documentType,
    patientId,
  }: CreatePdfDto): Promise<Buffer> {
    const patient = (await this.patientService.findOne(
      patientId
    )) as PatientEntity

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const bodyContent = pdfBodyTemplate({
      title: mapDocumentTypeToTitle[documentType],
      htmlContent,
      patient,
    })

    // Set the HTML content for the page
    await page.setContent(bodyContent, { waitUntil: "networkidle0" })

    await page.bringToFront()

    // Generate the PDF
    const pdfUint8Array = await page.pdf({
      format: "A4",
      printBackground: true,
      // displayHeaderFooter: true,
      waitForFonts: true,
      margin: {
        bottom: "100px", // Adjust margin to make room for the footer,
        right: "40px",
        left: "40px",
      },
      // footerTemplate: pdfFooter(),
    })

    await browser.close()

    return Buffer.from(pdfUint8Array)
  }
}
