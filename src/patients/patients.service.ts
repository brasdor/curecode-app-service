import { Injectable } from "@nestjs/common"
import { CreatePatientDto } from "./dto/create-patient.dto"
import { UpdatePatientDto } from "./dto/update-patient.dto"
import { PrismaService } from "../prisma"

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto, organisationId: string) {
    return this.prisma.patient.create({
      data: {
        ...createPatientDto,
        birthDate: new Date(createPatientDto.birthDate),
        organisationId,
      },
    })
  }

  async findAll() {
    return this.prisma.patient.findMany({
      include: { documents: { select: { id: true, documentType: true } } },
    })
  }

  async findAllByOrganisation(organisationId: string) {
    return this.prisma.patient.findMany({
      where: { organisationId },
      include: { documents: { select: { id: true, documentType: true } } },
    })
  }

  async findOne(id) {
    return this.prisma.patient.findUniqueOrThrow({
      where: { id },
      include: {
        summary: true,
        consultations: {
          select: {
            id: true,
            date: true,
            transcriptionId: true,
            createdAt: true,
            user: true,
          },
        },
        documents: {
          select: {
            id: true,
            title: true,
            documentType: true,
            updatedAt: true,
            status: true,
            correctionComment: true,
            content: true,
            author: { select: { firstName: true, lastName: true } },
          },
          orderBy: { updatedAt: "desc" },
        },
      },
    })
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const data: any = {
      ...updatePatientDto,
    }

    // Handle birthDate conversion if provided
    if (updatePatientDto.birthDate) {
      data.birthDate = new Date(updatePatientDto.birthDate)
    }

    return this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
    })
  }

  async remove(id: string) {
    return this.prisma.patient.delete({ where: { id } })
  }
}
