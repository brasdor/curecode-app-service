import { PrismaPg } from "@prisma/adapter-pg"
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import pg from "pg"
import { ConfigService } from "../config"

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pgPool: pg.Pool

  constructor(configService: ConfigService) {
    // prisma with pg
    // https://www.prisma.io/docs/orm/overview/databases/postgresql#3-instantiate-prisma-client-using-the-driver-adapter
    const connectionString = configService.get("DATABASE_URL")
    const max = configService.get("DATABASE_MAX_CONNECTIONS")
    const pgPool = new pg.Pool({ connectionString, max })

    // specify schema
    // https://www.prisma.io/docs/orm/overview/databases/postgresql#specifying-a-postgresql-schema
    const schema = configService.get("DATABASE_SCHEMA")
    const adapter = new PrismaPg(pgPool, { schema })

    super({ adapter })

    this.pgPool = pgPool
  }
  // Lifecycle hook to connect to the database
  async onModuleInit() {
    await this.$connect()
  }

  // Lifecycle hook to disconnect from the database
  async onModuleDestroy() {
    await this.$disconnect()
    await this.pgPool.end()
  }
}
