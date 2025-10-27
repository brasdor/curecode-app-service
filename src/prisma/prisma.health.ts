import { Injectable } from "@nestjs/common"
import {
  HealthIndicatorResult,
  PrismaHealthIndicator as TerminusPrismaHealthIndicator,
  HealthIndicator,
  HealthCheckError,
} from "@nestjs/terminus"
import { PrismaService } from "./prisma.service"

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  private readonly prismaService: PrismaService
  private readonly terminusPrismaHealthIndicator: TerminusPrismaHealthIndicator

  public constructor(
    prismaService: PrismaService,
    terminusPrismaHealthIndicator: TerminusPrismaHealthIndicator
  ) {
    super()
    this.prismaService = prismaService
    this.terminusPrismaHealthIndicator = terminusPrismaHealthIndicator
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      // Perform a simple query to check database connectivity
      await this.prismaService.$queryRaw`SELECT 1`
      return this.getStatus(key, true)
    } catch (error) {
      throw new HealthCheckError("Prisma check failed", error)
    }
  }
}
