import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { PrismaModule } from "../prisma"
import { CryptoModule } from "../crypto/crypto.module"

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, CryptoModule],
  exports: [UsersService],
})
export class UsersModule {}
