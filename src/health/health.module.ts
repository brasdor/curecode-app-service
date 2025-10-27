import { Module } from "@nestjs/common"
import { TerminusModule } from "@nestjs/terminus"
import { HealthController } from "./health.controller"
import { PrismaModule } from "../prisma"

/**
 * Health Module
 */
@Module({
  imports: [TerminusModule, PrismaModule],
  controllers: [HealthController],
})
export class HealthModule {}
