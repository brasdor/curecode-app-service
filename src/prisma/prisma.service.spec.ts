import { Test } from "@nestjs/testing"
import { PrismaService } from "./prisma.service"
import { AppModule } from "../app.module"

describe("PrismaService", () => {
  let service: PrismaService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    service = module.get(PrismaService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
