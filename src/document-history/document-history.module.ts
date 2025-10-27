import { Module } from "@nestjs/common"
import { DocumentHistoryService } from "./document-history.service"

@Module({
  providers: [DocumentHistoryService],
  exports: [DocumentHistoryService],
})
export class DocumentHistoryModule {}
