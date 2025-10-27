import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNotEmpty, IsString } from "class-validator"

export class CreateSummaryDto {
  @ApiProperty({ description: "Id of patient to create summary of." })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  patientId: string
}
