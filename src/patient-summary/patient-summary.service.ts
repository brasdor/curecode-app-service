import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma"

@Injectable()
export class PatientSummaryService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    patientId,
    contentHash,
    id,
  }: {
    patientId: string
    contentHash: string
    id: string
  }) {
    return this.prisma.patientSummary.upsert({
      where: { patientId },
      update: { contentHash, id },
      create: { contentHash, id, patientId },
    })
  }
}
