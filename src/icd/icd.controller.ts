import { Controller, Get, Query } from "@nestjs/common"
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger"
import { IcdService } from "./icd.service"
import { GetIcdSearchDto } from "./dto/icd-search.dto"

@Controller("icd")
@ApiTags("icd")
export class IcdController {
  constructor(private readonly icdService: IcdService) {}

  @Get("search")
  @ApiOkResponse({ type: GetIcdSearchDto })
  @ApiQuery({ name: "chapter", required: false, type: String })
  @ApiQuery({ name: "groupFrom", required: false, type: String })
  @ApiQuery({ name: "codeOhnePunkt", required: false, type: String })
  @ApiQuery({ name: "searchTerm", required: false, type: String })
  async getIcdSearchResults(
    @Query("chapter") chapter?: string,
    @Query("groupFrom") groupFrom?: string,
    @Query("codeOhnePunkt") codeOhnePunkt?: string,
    @Query("searchTerm") searchTerm?: string
  ) {
    return await this.icdService.getIcdSearchResults({
      chapterCode: chapter,
      groupFrom,
      codeOhnePunkt,
      searchTerm,
    })
  }
}
