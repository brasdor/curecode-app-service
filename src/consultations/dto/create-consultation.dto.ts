import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateConsultationDto {
  @IsDateString()
  @ApiProperty()
  date: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  transcriptionId?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  patientId: string
}
