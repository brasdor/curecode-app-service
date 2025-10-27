import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from "@nestjs/common"
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { CreatePatientDto } from "./dto/create-patient.dto"
import { UpdatePatientDto } from "./dto/update-patient.dto"
import { PatientsService } from "./patients.service"
import { PatientEntity } from "./entities/patient.entity"

@Controller("patients")
@ApiTags("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiCreatedResponse({ type: PatientEntity })
  create(@Body() createPatientDto: CreatePatientDto, @Request() req) {
    const { organisationId } = req.user
    return this.patientsService.create(createPatientDto, organisationId)
  }

  @Get()
  @ApiOkResponse({ type: PatientEntity, isArray: true })
  findAll(@Request() req) {
    const { organisationId } = req.user
    return this.patientsService.findAllByOrganisation(organisationId)
  }

  @Get(":id")
  @ApiOkResponse({ type: PatientEntity })
  async findOne(@Param("id") id: string, @Request() req) {
    const patient = await this.patientsService.findOne(id)

    if (patient.organisationId !== req.user.organisationId) {
      throw new ForbiddenException(
        "Patient does not belong to your organisation"
      )
    }

    return patient
  }

  @Patch(":id")
  @ApiCreatedResponse({ type: PatientEntity })
  async update(
    @Param("id") id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @Request() req
  ) {
    const patient = await this.patientsService.findOne(id)

    if (patient.organisationId !== req.user.organisationId) {
      throw new ForbiddenException(
        "Patient does not belong to your organisation"
      )
    }

    return this.patientsService.update(id, updatePatientDto)
  }

  @Delete(":id")
  @ApiOkResponse({ type: PatientEntity })
  async remove(@Param("id") id: string, @Request() req) {
    const patient = await this.patientsService.findOne(id)

    if (patient.organisationId !== req.user.organisationId) {
      throw new ForbiddenException(
        "Patient does not belong to your organisation"
      )
    }

    return this.patientsService.remove(id)
  }
}
