import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { CreateLogoDto } from "./dto/create-logo.dto"
import { UpdateLogoDto } from "./dto/update-logo.dto"
import { LogoEntity } from "./entities/logo.entity"
import { LogosService } from "./logos.service"

@Controller("logos")
@ApiTags("logos")
export class LogosController {
  constructor(private readonly logosService: LogosService) {}

  @Post()
  @ApiCreatedResponse({ type: LogoEntity })
  async create(@Body() createLogoDto: CreateLogoDto) {
    return new LogoEntity(await this.logosService.create(createLogoDto))
  }

  @Put()
  @ApiCreatedResponse({ type: LogoEntity })
  async update(@Body() createLogoDto: UpdateLogoDto) {
    return new LogoEntity(await this.logosService.update(createLogoDto))
  }

  @Get(":id")
  @ApiOkResponse({ type: LogoEntity })
  async findOne(@Param("id") id: string) {
    return new LogoEntity(await this.logosService.findOne(id))
  }

  @Get("organisation/:organisationId")
  @ApiOkResponse({ type: LogoEntity })
  async findOneForOrganisation(@Param("organisationId") id: string) {
    return new LogoEntity(await this.logosService.findOneForOrganisation(id))
  }

  @Delete(":id")
  @ApiOkResponse({ type: LogoEntity })
  async remove(@Param("id") id: string) {
    return new LogoEntity(await this.logosService.remove(id))
  }
}
