import { BadRequestException, Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { GetIcdSearchDto } from "./dto/icd-search.dto"
import { Icd10Code, Icd10Group, Prisma } from "@prisma/client"

type IcdSearchFilter = {
  groupFrom?: string | undefined
  chapterCode?: string | undefined
  codeOhnePunkt?: string | undefined
  searchTerm?: string | undefined
}

@Injectable()
export class IcdService {
  constructor(private readonly prisma: PrismaService) {}

  async getIcdSearchResults({
    chapterCode,
    groupFrom,
    codeOhnePunkt,
    searchTerm,
  }: IcdSearchFilter): Promise<GetIcdSearchDto> {
    if (searchTerm) {
      const params: any[] = [searchTerm] // Always include searchTerm

      let query = Prisma.sql`
        SELECT * 
        FROM curecode_app_service."Icd10Code"
        WHERE 
          (
            to_tsvector('german', "Titel") @@ plainto_tsquery(${searchTerm})
            OR curecode_app_service.similarity("Code"::text, ${searchTerm}) > 0.7
          )
      `

      // If `codeOhnePunkt` is provided, add the condition
      if (codeOhnePunkt !== undefined) {
        const code = await this.prisma.icd10Code.findUnique({
          where: { CodeOhnePunkt: codeOhnePunkt },
        })

        if (!code) {
          throw new BadRequestException("Code not found")
        }

        // Convert `Ebene` to an integer and increment it
        const deeperEbene = (parseInt(code.Ebene, 10) + 1).toString()

        query = Prisma.sql`
          ${query}
          AND CAST("CodeOhnePunkt" AS text) ILIKE '%' || ${codeOhnePunkt} || '%'
          AND "Ebene" = ${deeperEbene}
        `
        params.push(codeOhnePunkt)
      }

      // If `groupFrom` is provided, add the condition for `GrVon`
      if (groupFrom !== undefined) {
        query = Prisma.sql`
          ${query}
          AND "GrVon" = ${groupFrom}
        `
        params.push(groupFrom)
      }

      // If `chapterCode` is provided, add the condition for `KapNr`
      if (chapterCode !== undefined) {
        query = Prisma.sql`
          ${query}
          AND "KapNr" = ${chapterCode}
        `
        params.push(chapterCode)
      }

      query = Prisma.sql`${query} ORDER BY "NormCode" ASC;`

      // Execute safely
      const codes = await this.prisma.$queryRaw<Icd10Code[]>(query, ...params)

      // const groups = await this.prisma.$queryRaw<Icd10Group[]>`
      //   SELECT *
      //   FROM curecode_app_service."Icd10Group"
      //   WHERE to_tsvector('german', "title") @@ plainto_tsquery(CAST(${searchTerm} AS text))
      //   ORDER BY "groupFrom" ASC`

      const groups = await this.prisma.$queryRaw<Icd10Group[]>`
        SELECT *
        FROM curecode_app_service."Icd10Group"
        WHERE "title" ILIKE '%' || ${searchTerm} || '%'
        ORDER BY "groupFrom" ASC;`

      return { codes, groups }
    }

    if (codeOhnePunkt) {
      const codes = await this.getSubcodesByCode(codeOhnePunkt)

      return { codes }
    }

    if (groupFrom) {
      const codes = await this.getEbene3CodeByGroup(groupFrom)

      return { codes }
    }

    if (chapterCode) {
      const groups = await this.getGroupByChapter(chapterCode)

      return { groups }
    }

    const chapters = await this.getIcdChapters()
    return { chapters }
  }

  async getSubcodesByCode(codeOhnePunkt: string) {
    const code = await this.prisma.icd10Code.findUnique({
      where: { CodeOhnePunkt: codeOhnePunkt },
    })

    if (!code) {
      throw new BadRequestException("Code not found")
    }

    if (code.Ort === "T") {
      throw new BadRequestException("Code is a terminal code")
    }

    return this.prisma.icd10Code.findMany({
      where: {
        AND: [
          { Ebene: (Number(code.Ebene) + 1).toString() },
          { CodeOhnePunkt: { contains: codeOhnePunkt, mode: "insensitive" } },
          { CodeOhnePunkt: { not: codeOhnePunkt } }, // Ensures it's not exactly equal
        ],
      },
    })
  }

  async getEbene3CodeByGroup(groupFrom: string) {
    return this.prisma.icd10Code.findMany({
      where: { GrVon: groupFrom, Ebene: "3" },
    })
  }

  async getGroupByChapter(chapterCode: string) {
    return this.prisma.icd10Group.findMany({
      where: { chapterCode },
    })
  }

  async getIcdChapters() {
    const chapters = await this.prisma.icd10Chapter.findMany({
      include: { Icd10Group: true },
    })

    return chapters.map((chapter) => ({
      code: chapter.code,
      name: chapter.name,
      groupFrom: chapter.Icd10Group[0].groupFrom,
      groupTo: chapter.Icd10Group[chapter.Icd10Group.length - 1].groupTo,
    }))
  }
}
