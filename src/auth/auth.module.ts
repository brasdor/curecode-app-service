import { Global, Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_GUARD } from "@nestjs/core"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { UsersModule } from "../users"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import jwtConfig from "./config/jwt.config"
import refreshJwtConfig from "./config/refresh-jwt.config"
import { JwtAuthGuard } from "./guards/levels/jwt-auth.guard"
import { LevelsGuard } from "./guards/levels/levels.guard"
import { JwtStrategy } from "./strategies/jwt.strategy"

@Global()
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard }, // @UseGuards(JwtAuthGuard) applied on all API endpoints
    { provide: APP_GUARD, useClass: LevelsGuard },
  ],
})
export class AuthModule {}
