import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Level } from "@prisma/client"
import { LEVELS_KEY } from "../../decorators/levels.decorator"
import { UserEntity } from "../../../users"

@Injectable()
export class LevelsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const authorisedLevels = this.reflector.getAllAndOverride<Level[]>(
      LEVELS_KEY,
      [context.getHandler(), context.getClass()]
    )

    if (!authorisedLevels) {
      return true
    }

    const user: UserEntity = context.switchToHttp().getRequest().user

    const hasRequiredLevel = authorisedLevels.some(
      (level) => user.level === level
    ) || user.level === Level.SYSTEM_ADMIN // system admin can access all levels

    return hasRequiredLevel
  }
}
