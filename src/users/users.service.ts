import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { licenseRequiredLevels } from "../constants/license.constants"
import { CryptoService } from "../crypto/crypto.service"
import { PrismaService } from "../prisma/prisma.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { Level } from "@prisma/client"

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService
  ) {}

  async create(createUserDto: CreateUserDto, organisationId) {
    const { hash, salt } = await this.cryptoService.hashPassword(
      createUserDto.password
    )

    delete createUserDto.password

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        organisationId,
        passwordHash: hash,
        passwordHashSalt: salt,
      },
    })
  }

  findUsersByOrganisation(organisationId: string) {
    return this.prisma.user.findMany({
      where: {
        organisationId: organisationId,
      },
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } })

    // System admins don't have an organisation
    if (user.level !== Level.SYSTEM_ADMIN) {
      const organisation = await this.prisma.organisation.findUniqueOrThrow({
        where: { id: user.organisationId },
      })
  
      const currentLevelRequiresLicense = licenseRequiredLevels.includes(
        user.level
      )
      const newLevelRequiresLicense =
        updateUserDto.level && licenseRequiredLevels.includes(updateUserDto.level)
  
      if (newLevelRequiresLicense && !currentLevelRequiresLicense) {
        const usersWithLicense = await this.prisma.user.count({
          where: {
            organisationId: user.organisationId,
            level: { in: licenseRequiredLevels },
          },
        })
  
        if (usersWithLicense >= organisation.licenseCount) {
          throw new ForbiddenException(
            "The organisation does not have enough licenses available"
          )
        }
      }
    }
   
    if (updateUserDto.password) {
      const { hash: passwordHash, salt: passwordHashSalt } =
        await this.cryptoService.hashPassword(updateUserDto.password)

      delete updateUserDto.password

      return this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          passwordHash,
          passwordHashSalt,
        },
      })
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}
