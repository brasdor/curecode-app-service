import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsObject, IsOptional, IsString } from "class-validator"
import { DocumentStatus, DocumentType } from "@prisma/client"

export class CreateDocumentDto {
  @IsString()
  @ApiProperty()
  title: string

  @IsString()
  @ApiProperty()
  patientId: string

  @IsString()
  @ApiProperty()
  authorId: string

  @IsEnum(DocumentType)
  @ApiProperty({ enum: DocumentType, enumName: "DocumentType" })
  documentType: DocumentType

  @IsObject({})
  @IsOptional()
  @ApiProperty({ type: "object", required: false })
  content?: any

  @IsOptional()
  @IsEnum(DocumentStatus)
  @ApiProperty({
    required: false,
    enum: DocumentStatus,
    enumName: "DocumentStatus",
  })
  status?: DocumentStatus
}
