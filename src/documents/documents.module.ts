import { Module } from "@nestjs/common"
import { AiModule } from "../ai/ai.module"
import { DocumentHistoryModule } from "../document-history/document-history.module"
import { PrismaModule } from "../prisma"
import { DocumentsController } from "./documents.controller"
import { DocumentsService } from "./documents.service"

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  imports: [PrismaModule, DocumentHistoryModule, AiModule],
})
export class DocumentsModule {}
