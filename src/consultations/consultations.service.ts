import { Injectable } from "@nestjs/common"
import { CreateConsultationDto } from "./dto/create-consultation.dto"
import { UpdateConsultationDto } from "./dto/update-consultation.dto"
import { PrismaService } from "../prisma"

@Injectable()
export class ConsultationsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createConsultationDto: CreateConsultationDto, userId: string) {
    return this.prismaService.consultation.create({
      data: { ...createConsultationDto, userId },
    })
  }

  findAll() {
    return this.prismaService.consultation.findMany()
  }

  findOne(id: string) {
    return this.prismaService.consultation.findUniqueOrThrow({
      where: { id },
      include: { patient: true },
    })
  }

  update(id: string, updateConsultationDto: UpdateConsultationDto) {
    return this.prismaService.consultation.update({
      where: { id },
      data: updateConsultationDto,
    })
  }

  remove(id: string) {
    return this.prismaService.consultation.delete({ where: { id } })
  }
}
