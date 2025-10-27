//src/auth/auth.service.ts
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common"
import { ConfigType } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { v4 as uuidv4 } from "uuid"
import refreshJwtConfig from "./config/refresh-jwt.config"
import { partialJwtPayload } from "./constants/partialJwtPayload"
import { AuthEntity } from "./entities/auth.entity"
import {
  AccessTokenJwtPayload,
  RefreshTokenJwtPayload,
} from "./types/AuthJwtPayload"
import { UsersService } from "../users"
import { CryptoService } from "../crypto/crypto.service"

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.userService.findOneByEmail(email)

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await this.cryptoService.verifyPassword(
      password,
      user.passwordHashSalt,
      user.passwordHash
    )

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password")
    }

    // Step 3: Generate access and refresh tokens
    const { refreshTokenJti, ...tokens } = this.generateTokens(user.id)

    await this.userService.update(user.id, {
      refreshTokenJti,
    })

    return tokens
  }

  async refresh(refreshToken: string): Promise<AuthEntity> {
    try {
      // Step 1: Verify the refresh token
      const { sub: userId, jti } =
        this.jwtService.verify<RefreshTokenJwtPayload>(refreshToken, {
          secret: this.refreshTokenConfig.secret,
        })

      // Step 2: Compare with the refresh token in the db
      const user = await this.userService.findOne(userId)

      const isRefreshTokenMatching = jti === user.refreshTokenJti

      if (!isRefreshTokenMatching) {
        throw new UnauthorizedException()
      }

      // Step 3: Generate new access and refresh tokens
      const { refreshTokenJti, ...tokens } = this.generateTokens(userId)

      await this.userService.update(user.id, {
        refreshTokenJti,
      })

      return tokens
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token")
    }
  }

  generateTokens(userId: string) {
    const accessTokenPayload: AccessTokenJwtPayload = {
      ...partialJwtPayload,
      sub: userId,
    }

    const jti = uuidv4()

    const refreshTokenPayload: RefreshTokenJwtPayload = {
      ...accessTokenPayload,
      jti,
    }

    const accessToken = this.jwtService.sign(accessTokenPayload)
    const refreshToken = this.jwtService.sign(
      refreshTokenPayload,
      this.refreshTokenConfig
    )

    return {
      accessToken,
      refreshToken,
      refreshTokenJti: jti,
    }
  }

  async validateUser(userId: string) {
    const user = await this.userService.findOne(userId)
    if (!user) {
      throw new UnauthorizedException("User not found")
    }
    return user
  }
}
