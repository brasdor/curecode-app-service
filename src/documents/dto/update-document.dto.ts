import { ApiProperty, PartialType } from "@nestjs/swagger"
import { CreateDocumentDto } from "./create-document.dto"
import { IsOptional, IsString } from "class-validator"

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, nullable: true })
  correctionComment?: string | null
}
