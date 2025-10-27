import { ApiProperty, PartialType } from "@nestjs/swagger"
import { CreatePatientDto } from "./create-patient.dto"
import { IsOptional } from "class-validator"

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  summaryId?: string
}
