import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserEntity } from "./entities/user.entity"
import { UsersService } from "./users.service"
import { LevelsGuard } from "../auth/guards/levels/levels.guard"
import { Level } from "@prisma/client"
import { Levels } from "../auth/decorators/levels.decorator"

@Controller("users")
@ApiTags("users")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    const organisationId =
      createUserDto.organisationId ?? req.user.organisationId
    return new UserEntity(
      await this.usersService.create(createUserDto, organisationId)
    )
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.usersService.findAll()
    return users.map((user) => new UserEntity(user))
  }

  @Get("me")
  @ApiOkResponse({ type: UserEntity })
  me(@Request() req) {
    const { user } = req
    return new UserEntity(user)
  }

  @Get("/organisation/:organisationId")
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getUsersByOrganisation(
    @Param("organisationId") organisationId: string
  ) {
    const users =
      await this.usersService.findUsersByOrganisation(organisationId)
    return users.map((user) => new UserEntity(user))
  }

  @Get(":id")
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param("id") id: string) {
    return new UserEntity(await this.usersService.findOne(id))
  }

  @Patch(":id")
  @UseGuards(LevelsGuard)
  @Levels(Level.Level1)
  @ApiOkResponse({ type: UserEntity })
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.usersService.update(id, updateUserDto))
  }

  @Delete(":id")
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param("id") id: string) {
    return new UserEntity(await this.usersService.remove(id))
  }
}
