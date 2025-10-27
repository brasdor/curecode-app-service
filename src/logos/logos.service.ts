import { Injectable } from "@nestjs/common"
import { CreateLogoDto } from "./dto/create-logo.dto"
import { PrismaService } from "../prisma"
import { LogoEntity } from "./entities/logo.entity"
import { UpdateLogoDto } from "./dto/update-logo.dto"

@Injectable()
export class LogosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLogoDto: CreateLogoDto): Promise<LogoEntity> {
    const { organisationId, imageData } = createLogoDto

    // Convert the base64-encoded image data to a Buffer
    const imageBuffer = Buffer.from(imageData, "base64")

    const logo = await this.prisma.logo.create({
      data: {
        organisationId,
        imageData: imageBuffer,
      },
    })

    return new LogoEntity(logo)
  }

  async update(updateLogoDto: UpdateLogoDto): Promise<LogoEntity> {
    const { organisationId, imageData } = updateLogoDto

    // Convert the base64-encoded image data to a Buffer
    const imageBuffer = Buffer.from(imageData, "utf-8")

    const logo = await this.prisma.logo.update({
      where: { organisationId },
      data: {
        organisationId,
        imageData: imageBuffer,
      },
    })

    return new LogoEntity(logo)
  }

  async findOne(id: string) {
    const logo = await this.prisma.logo.findUnique({
      where: { id },
    })

    return logo
  }

  async findOneForOrganisation(organisationId: string) {
    const logo = await this.prisma.logo.findUnique({
      where: { organisationId },
    })

    return logo
  }

  async remove(id: string) {
    const deletedLogo = await this.prisma.logo.delete({
      where: { id },
    })

    return deletedLogo
  }
}
