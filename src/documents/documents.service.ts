import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma"
import { CreateDocumentDto } from "./dto/create-document.dto"
import { UpdateDocumentDto } from "./dto/update-document.dto"
import ProgressReportTemplate from "../templates/progressReport.json"
import { DocumentType } from "@prisma/client"

const mapDocumentTypeToTemplate: Record<DocumentType, object> = {
  [DocumentType.PROGRESS_REPORT]: ProgressReportTemplate,
  [DocumentType.REFERRAL_LETTER]: {},
}

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async create(createDocumentDto: CreateDocumentDto) {
    return this.prisma.document.create({
      data: {
        ...createDocumentDto,
        content: mapDocumentTypeToTemplate[createDocumentDto.documentType],
      },
    })
  }

  async findAll() {
    return this.prisma.document.findMany({
      include: { author: true, patient: true, consultation: true },
    })
  }

  async findOne(id: string) {
    return this.prisma.document.findUniqueOrThrow({
      where: { id },
      include: {
        author: true,
        patient: true,
        documentHistory: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
      },
    })
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    return this.prisma.document.update({
      where: { id },
      data: updateDocumentDto,
    })
  }

  async remove(id: string) {
    return this.prisma.document.delete({ where: { id } })
  }
}
