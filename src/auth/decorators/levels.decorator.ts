import { SetMetadata } from "@nestjs/common"
import { Level } from "@prisma/client"

export const LEVELS_KEY = "levels"

export const Levels = (...levels: [Level, ...Level[]]) =>
  SetMetadata(LEVELS_KEY, levels)
