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
import { ApiTags } from "@nestjs/swagger"
import { CreateOrganisationDto } from "./dto/create-organisation.dto"
import { UpdateOrganisationDto } from "./dto/update-organisation.dto"
import { OrganisationsService } from "./organisations.service"
import { OrganisationEntity } from "./entities/organisation.entity"
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger"
import { LevelsGuard } from "../auth/guards/levels/levels.guard"

@Controller("organisations")
@ApiTags("organisations")
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Post()
  @ApiCreatedResponse({ type: OrganisationEntity })
  create(@Body() createOrganisationDto: CreateOrganisationDto) {
    return this.organisationsService.create(createOrganisationDto)
  }

  @Get()
  @ApiOkResponse({ type: OrganisationEntity, isArray: true })
  findAll() {
    return this.organisationsService.findAll()
  }

  @Get(":id")
  @ApiOkResponse({ type: OrganisationEntity })
  findOne(@Param("id") id: string) {
    return this.organisationsService.findOne(id)
  }

  @Patch(":id")
  @ApiCreatedResponse({ type: OrganisationEntity })
  @UseGuards(LevelsGuard)
  update(
    @Param("id") id: string,
    @Body() updateOrganisationDto: UpdateOrganisationDto,
    @Request() req
  ) {
    const { user } = req
    return this.organisationsService.update(id, updateOrganisationDto, user)
  }

  @Delete(":id")
  @ApiOkResponse({ type: OrganisationEntity })
  remove(@Param("id") id: string) {
    return this.organisationsService.remove(id)
  }
}
