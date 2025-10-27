import { ApiProperty } from "@nestjs/swagger"
import { Organisation } from "@prisma/client"
import { LogoEntity } from "../../logos/entities/logo.entity"

export class OrganisationEntity implements Organisation {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty({ required: false, nullable: true })
  taxNumber: string | null

  @ApiProperty({ required: false, nullable: true })
  street: string | null

  @ApiProperty({ required: false, nullable: true })
  city: string | null

  @ApiProperty({ required: false, nullable: true })
  zip: string | null

  @ApiProperty({ required: false, nullable: true })
  email: string | null

  @ApiProperty({ required: false, nullable: true })
  phone: string | null

  @ApiProperty({ required: false, nullable: true })
  websiteUrl: string | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ required: false, type: () => LogoEntity })
  logo?: LogoEntity

  @ApiProperty({ required: true })
  licenseCount: number

  @ApiProperty({ required: true })
  licensesUsed: number
}
