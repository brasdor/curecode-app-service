import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "../../config"
import { AuthService } from "../auth.service"
import { AccessTokenJwtPayload } from "../types/AuthJwtPayload"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  public constructor(
    configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_SECRET"),
      ignoreExpiration: false,
    })
  }

  async validate(payload: AccessTokenJwtPayload) {
    return this.authService.validateUser(payload.sub)
  }
}
