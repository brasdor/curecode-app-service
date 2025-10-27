import { ApiProperty } from "@nestjs/swagger"
import { Level } from "@prisma/client"
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string

  @IsEnum(Level)
  @ApiProperty({
    enum: Level,
    enumName: "Level", // <-- makes #/components/schemas/Level
  })
  level: Level

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  organisationId?: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string
}
