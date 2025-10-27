import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  insurance: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  ahvNumber: string

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  birthDate: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  street: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  city: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  zip: string

  @IsString()
  @ApiProperty({ required: false })
  apartmentNumber?: string
}
