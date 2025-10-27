import { ApiProperty } from "@nestjs/swagger"
import { DocumentAction, DocumentHistory } from "@prisma/client"
import { UserEntity } from "../../users"

export class DocumentHistoryEntity implements DocumentHistory {
  @ApiProperty()
  id: string

  @ApiProperty()
  documentId: string

  @ApiProperty()
  userId: string

  @ApiProperty({ type: UserEntity })
  user: UserEntity

  @ApiProperty()
  createdAt: Date

  @ApiProperty({ enum: DocumentAction, enumName: "DocumentAction" })
  action: DocumentAction
}
