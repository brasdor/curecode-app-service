import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNumber, IsString } from "class-validator"
import { DocumentType } from "@prisma/client"

export class CreatePdfDto {
  @ApiProperty()
  @IsString()
  htmlContent: string

  @IsEnum(DocumentType)
  @ApiProperty({ enum: DocumentType, enumName: "DocumentType" })
  documentType: DocumentType

  @ApiProperty()
  @IsNumber()
  patientId: string
}
