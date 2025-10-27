import { ForbiddenException, Injectable } from "@nestjs/common"
import { CreateOrganisationDto } from "./dto/create-organisation.dto"
import { UpdateOrganisationDto } from "./dto/update-organisation.dto"
import { PrismaService } from "../prisma"
import { UserEntity } from "../users"
import { Level } from "@prisma/client"
import { licenseRequiredLevels } from "../constants/license.constants"

@Injectable()
export class OrganisationsService {
  constructor(private prisma: PrismaService) {}

  async create(createOrganisationDto: CreateOrganisationDto) {
    return this.prisma.organisation.create({ data: createOrganisationDto })
  }

  async findAll() {
    const organisations = await this.prisma.organisation.findMany()

    const organisationsWithLicensesUsed = await Promise.all(
      organisations.map(async (organisation) => {
        const licensesUsed = await this.prisma.user.count({
          where: {
            organisationId: organisation.id,
            level: { in: licenseRequiredLevels },
          },
        })
        return { ...organisation, licensesUsed }
      })
    )

    return organisationsWithLicensesUsed
  }

  async findOne(id: string) {
    const organisation = await this.prisma.organisation.findUniqueOrThrow({
      where: { id },
      include: { logo: true },
    })

    const licensesUsed = await this.prisma.user.count({
      where: {
        organisationId: id,
        level: { in: licenseRequiredLevels },
      },
    })

    return { ...organisation, licensesUsed }
  }

  async update(
    id: string,
    updateOrganisationDto: UpdateOrganisationDto,
    user: UserEntity
  ) {
    if (
      updateOrganisationDto.licenseCount !== undefined &&
      user.level !== Level.SYSTEM_ADMIN
    ) {
      throw new ForbiddenException(
        "Only system_admin can change the licenses of an organisation"
      )
    }

    return this.prisma.organisation.update({
      where: { id },
      data: updateOrganisationDto,
    })
  }

  async remove(id: string) {
    return this.prisma.organisation.delete({ where: { id } })
  }
}
