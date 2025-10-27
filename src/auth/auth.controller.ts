import { Body, Controller, Post } from "@nestjs/common"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { Public } from "./decorators/public.decorators"
import { LoginDto } from "./dto/login.dto"
import { RefreshDto } from "./dto/refresh.dto"
import { AuthEntity } from "./entities/auth.entity"

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @Public()
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password)
  }

  @Post("refresh")
  @Public()
  @ApiOkResponse({ type: AuthEntity })
  refresh(@Body() { refreshToken }: RefreshDto) {
    return this.authService.refresh(refreshToken)
  }
}
