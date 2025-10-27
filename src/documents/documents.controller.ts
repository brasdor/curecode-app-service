import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from "@nestjs/common"
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { DocumentHistoryService } from "../document-history/document-history.service"
import { UserEntity } from "../users"
import { DocumentsService } from "./documents.service"
import { CreateDocumentDto } from "./dto/create-document.dto"
import { UpdateDocumentDto } from "./dto/update-document.dto"
import { DocumentEntity } from "./entities/document.entity"
import { AiService } from "../ai/ai.service"
import { DocumentStatus } from "@prisma/client"

@Controller("documents")
@ApiTags("documents")
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly documentHistoryService: DocumentHistoryService,
    private readonly aiService: AiService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: DocumentEntity })
  async create(@Body() createDocumentDto: CreateDocumentDto, @Request() req) {
    const userId = (req.user as UserEntity).id

    const newDocument = new DocumentEntity(
      await this.documentsService.create(createDocumentDto)
    )

    await this.documentHistoryService.create(newDocument.id, userId)

    return newDocument
  }

  @Get()
  @ApiOkResponse({ type: DocumentEntity, isArray: true })
  async findAll() {
    const documents = await this.documentsService.findAll()
    return documents.map((document) => new DocumentEntity(document))
  }

  @Get(":id")
  @ApiOkResponse({ type: DocumentEntity })
  async findOne(@Param("id") id: string) {
    return new DocumentEntity(await this.documentsService.findOne(id))
  }

  @Patch(":id")
  @ApiCreatedResponse({ type: DocumentEntity })
  async update(
    @Param("id") id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @Request() req
  ) {
    const user: UserEntity = req.user

    const updatedDocument = new DocumentEntity(
      await this.documentsService.update(id, updateDocumentDto)
    )

    // if the document has changed state, create a new summary for that patient
    if (
      updateDocumentDto.status &&
      updateDocumentDto.status !== DocumentStatus.DRAFT
    ) {
      this.aiService.createSummaryForPatient(
        { patientId: updatedDocument.patientId },
        user
      )
    }

    await this.documentHistoryService.addHistory(
      updateDocumentDto,
      updatedDocument.id,
      user.id
    )

    return updatedDocument
  }

  @Delete(":id")
  @ApiOkResponse({ type: DocumentEntity })
  async remove(@Param("id") id: string) {
    return new DocumentEntity(await this.documentsService.remove(id))
  }
}
