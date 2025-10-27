import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from "@nestjs/common"
import { ConsultationsService } from "./consultations.service"
import { CreateConsultationDto } from "./dto/create-consultation.dto"
import { UpdateConsultationDto } from "./dto/update-consultation.dto"
import { UserEntity } from "../users"
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { ConsultationEntity } from "./entities/consultation.entity"

@Controller("consultations")
@ApiTags("consultations")
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  @ApiCreatedResponse({ type: ConsultationEntity })
  create(@Body() createConsultationDto: CreateConsultationDto, @Request() req) {
    const userId = (req.user as UserEntity).id
    return this.consultationsService.create(createConsultationDto, userId)
  }

  @Get()
  @ApiOkResponse({ type: ConsultationEntity, isArray: true })
  findAll() {
    return this.consultationsService.findAll()
  }

  @Get(":id")
  @ApiOkResponse({ type: ConsultationEntity })
  findOne(@Param("id") id: string) {
    return this.consultationsService.findOne(id)
  }

  @Patch(":id")
  @ApiOkResponse({ type: ConsultationEntity })
  update(
    @Param("id") id: string,
    @Body() updateConsultationDto: UpdateConsultationDto
  ) {
    return this.consultationsService.update(id, updateConsultationDto)
  }

  @Delete(":id")
  @ApiOkResponse({ type: ConsultationEntity })
  remove(@Param("id") id: string) {
    return this.consultationsService.remove(id)
  }
}
