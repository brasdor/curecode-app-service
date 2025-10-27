import { ApiProperty } from "@nestjs/swagger"
import { Document, DocumentStatus, DocumentType } from "@prisma/client"
import { ConsultationWithoutRelationsEntity } from "../../consultations/entities/consultation.entity"
import { PatientWithoutRelationsEntity } from "../../patients/entities/patient.entity"
import { UserEntity } from "../../users"
import { DocumentHistoryEntity } from "./documentHistory.entity"

export class DocumentEntity implements Document {
  constructor({ author, ...data }: Partial<DocumentEntity>) {
    Object.assign(this, data)

    if (author) {
      this.author = new UserEntity(author)
    }
  }

  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty({ type: "object" })
  content: any

  @ApiProperty({ enum: DocumentStatus, enumName: "DocumentStatus" })
  status: DocumentStatus

  @ApiProperty({ enum: DocumentType, enumName: "DocumentType" })
  documentType: DocumentType

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  authorId: string

  @ApiProperty({ required: false, type: UserEntity })
  author?: UserEntity

  @ApiProperty()
  patientId: string

  @ApiProperty({ type: PatientWithoutRelationsEntity })
  patient: PatientWithoutRelationsEntity

  @ApiProperty({ required: false })
  correctionComment: string

  @ApiProperty({ type: DocumentHistoryEntity, isArray: true })
  documentHistory: DocumentHistoryEntity[]

  @ApiProperty({ required: false })
  consultationId: string

  @ApiProperty({ type: ConsultationWithoutRelationsEntity, required: false })
  consultation: ConsultationWithoutRelationsEntity
}
