import { Module } from "@nestjs/common"
import { PatientsService } from "./patients.service"
import { PatientsController } from "./patients.controller"
import { PrismaModule } from "../prisma"

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [PrismaModule],
  exports: [PatientsService],
})
export class PatientsModule {}
