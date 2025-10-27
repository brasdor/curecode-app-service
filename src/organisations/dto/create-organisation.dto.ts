import { ApiProperty } from "@nestjs/swagger"
import { Prisma } from "@prisma/client"
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from "class-validator"

export class CreateOrganisationDto implements Prisma.OrganisationCreateInput {
  @IsString()
  @ApiProperty()
  name: string

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  taxNumber?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  street?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  city?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  zip?: string

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  email?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  phone?: string

  @IsOptional()
  @IsUrl()
  @ApiProperty({ required: false })
  websiteUrl?: string

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false })
  licenseCount?: number
}
