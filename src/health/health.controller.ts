import { Controller, Get } from "@nestjs/common"
import { HealthCheckResult, HealthCheckService } from "@nestjs/terminus"
import { PrismaHealthIndicator } from "../prisma"
import { Public } from "../auth/decorators/public.decorators"

@Controller("health")
export class HealthController {
  private readonly healthCheckService: HealthCheckService
  private readonly prismaHealthIndicator: PrismaHealthIndicator

  public constructor(
    healthCheckService: HealthCheckService,
    prismaHealthIndicator: PrismaHealthIndicator
  ) {
    this.healthCheckService = healthCheckService
    this.prismaHealthIndicator = prismaHealthIndicator
  }

  @Get()
  @Public()
  public async getHealth(): Promise<HealthCheckResult> {
    return await this.healthCheckService.check([
      () => this.prismaHealthIndicator.isHealthy("database"),
    ])
  }

  @Get("live")
  @Public()
  public async getLivenessHealth(): Promise<HealthCheckResult> {
    return await this.healthCheckService.check([
      () => this.prismaHealthIndicator.isHealthy("database"),
    ])
  }

  @Get("ready")
  @Public()
  public async getReadinessHealth(): Promise<HealthCheckResult> {
    return await this.healthCheckService.check([
      () => this.prismaHealthIndicator.isHealthy("database"),
    ])
  }
}
