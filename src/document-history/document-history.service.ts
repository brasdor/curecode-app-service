import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma"
import { UpdateDocumentDto } from "../documents/dto/update-document.dto"
import { getDocumentAction } from "./utils"
import { DocumentAction } from "@prisma/client"

@Injectable()
export class DocumentHistoryService {
  constructor(private prisma: PrismaService) {}

  async create(documentId: string, userId: string) {
    return this.prisma.documentHistory.create({
      data: {
        action: DocumentAction.CREATED,
        userId,
        documentId,
      },
    })
  }

  async addHistory(
    updateDocumentDto: UpdateDocumentDto,
    documentId: string,
    userId: string
  ) {
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)

    const endOfToday = new Date()
    endOfToday.setHours(23, 59, 59, 999)

    const latestDocumentUpdateToday =
      await this.prisma.documentHistory.findFirst({
        where: {
          createdAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })

    const action = getDocumentAction(updateDocumentDto)

    if (
      action !== DocumentAction.UPDATED ||
      latestDocumentUpdateToday?.action !== DocumentAction.UPDATED ||
      latestDocumentUpdateToday.userId !== userId
    ) {
      await this.prisma.documentHistory.create({
        data: {
          documentId,
          action,
          userId,
        },
      })
    }
  }
}
