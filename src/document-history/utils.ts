import { DocumentAction, DocumentStatus } from "@prisma/client"
import { UpdateDocumentDto } from "../documents/dto/update-document.dto"

export const getDocumentAction = (updateDocumentDto: UpdateDocumentDto) => {
  if (updateDocumentDto.status === DocumentStatus.APPROVED) {
    return DocumentAction.APPROVED
  } else if (updateDocumentDto.status === DocumentStatus.CORRECTION) {
    return DocumentAction.REJECTED
  } else if (updateDocumentDto.status === DocumentStatus.PENDING) {
    return DocumentAction.SUBMITTED
  } else return DocumentAction.UPDATED
}
