import {
  Global,
  Logger,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from "@nestjs/common"
import { TerminusModule } from "@nestjs/terminus"
import {
  Icd10Chapter,
  Icd10Group,
  DocumentAction,
  DocumentStatus,
  DocumentType,
  Level,
  Icd10Morbidity,
  Icd10MortalityGroup1,
  Icd10Mortality1,
  Icd10Mortality2,
  Icd10MortalityGroup3,
  Icd10Mortality3,
  Icd10Mortality4,
  Icd10Code,
} from "@prisma/client"
import { ConfigService } from "../config"
import ProgressReportTemplate from "../templates/progressReport.json"
import ReferalLetterTemplate from "../templates/referalLetter.json"
import { PrismaHealthIndicator } from "./prisma.health"
import { PrismaService } from "./prisma.service"
import { CryptoService } from "../crypto/crypto.service"
import * as fs from "fs"
import * as path from "path"

@Global()
@Module({
  imports: [TerminusModule],
  providers: [PrismaService, PrismaHealthIndicator, CryptoService],
  exports: [PrismaService, PrismaHealthIndicator],
})
export class PrismaModule
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(PrismaModule.name)

  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly cryptoService: CryptoService
  ) {}

  public async onApplicationBootstrap(): Promise<void> {
    this.logger.log("Connecting to database")
    await this.prismaService.$connect()
    await this.applySeedData()
  }

  public async onApplicationShutdown(): Promise<void> {
    this.logger.log("Disconnecting from database")
    await this.prismaService.$disconnect()
  }

  private async applySeedData(): Promise<void> {
    this.logger.log("Applying seed data")

    const demoUserPassword = this.configService.get("DEMO_USER_PASSWORD")
    const { hash: passwordHash, salt: passwordHashSalt } =
      await this.cryptoService.hashPassword(demoUserPassword)

    const systemAdminPassword = this.configService.get("SYSTEM_ADMIN_PASSWORD")
    const { hash: systemAdminPasswordHash, salt: systemAdminPasswordHashSalt } =
      await this.cryptoService.hashPassword(systemAdminPassword)

    const organisation1Uuid = "e5aac5c6-835d-4d36-b018-0f55949ffab1"
    const organisation1 = await this.prismaService.organisation.upsert({
      where: { id: organisation1Uuid },
      update: {},
      create: {
        id: organisation1Uuid,
        name: "Cure Code SA",
        taxNumber: "CHE-123.456.789",
        street: "Rue du Lac 12",
        city: "Lausanne",
        zip: "1000",
        email: "info@curecode.ch",
        phone: "+41 21 123 45 67",
        websiteUrl: "https://curecode.ch",
      },
    })
    this.logger.debug(`organisation1: ${JSON.stringify(organisation1)}`)

    const systemAdminUuid = "35363f56-60d1-482e-9809-e05a1123da02"
    const systemAdmin = await this.prismaService.user.upsert({
      where: { id: systemAdminUuid },
      update: {
        email: "admin@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "System",
        lastName: "Admin",
        passwordHash: systemAdminPasswordHash,
        passwordHashSalt: systemAdminPasswordHashSalt,
        level: Level.SYSTEM_ADMIN,
      },
      create: {
        id: systemAdminUuid,
        email: "admin@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "System",
        lastName: "Admin",
        passwordHash: systemAdminPasswordHash,
        passwordHashSalt: systemAdminPasswordHashSalt,
        level: Level.SYSTEM_ADMIN,
      },
    })
    this.logger.debug(`demoUser: ${JSON.stringify(systemAdmin)}`)


    const demoUserUuid = "c4d00e69-7898-40a1-9efb-9dc367217a23"
    const demoUser = await this.prismaService.user.upsert({
      where: { id: demoUserUuid },
      update: {
        email: "demo@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "Demo",
        lastName: "User",
        passwordHash,
        passwordHashSalt,
        level: Level.Level1,
      },
      create: {
        id: demoUserUuid,
        organisationId: organisation1.id,
        email: "demo@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "Demo",
        lastName: "User",
        passwordHash,
        passwordHashSalt,
        level: Level.Level1,
      },
    })
    this.logger.debug(`demoUser: ${JSON.stringify(demoUser)}`)

    const level1UserUuid = "1440cda7-e83e-4386-80b2-01149b17db3c"
    const level1User = await this.prismaService.user.upsert({
      where: { id: level1UserUuid },
      update: {
        email: "level1@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "Level 1",
        lastName: "User",
        passwordHash,
        passwordHashSalt,
        level: Level.Level1,
      },
      create: {
        id: level1UserUuid,
        organisationId: organisation1.id,
        email: "level1@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "Level 1",
        lastName: "User",
        passwordHash,
        passwordHashSalt,
        level: Level.Level1,
      },
    })
    this.logger.debug(`level1User: ${JSON.stringify(level1User)}`)

    const level2UserUuid = "4b8b5693-f9e1-4cdf-ae9c-710ce5bda2db"
    const level2User = await this.prismaService.user.upsert({
      where: { id: level2UserUuid },
      update: {
        email: "level2@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "Level 2",
        lastName: "User",
        passwordHash,
        passwordHashSalt,
        level: Level.Level2,
      },
      create: {
        id: level2UserUuid,
        organisationId: organisation1.id,
        email: "level2@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "Level 2",
        lastName: "User",
        passwordHash,
        passwordHashSalt,
        level: Level.Level2,
      },
    })
    this.logger.debug(`level2User: ${JSON.stringify(level2User)}`)

    const level3UserUuid = "ea2c093e-15f2-4b30-ae64-13f9815b5f70"
    const level3User = await this.prismaService.user.upsert({
      where: { id: level3UserUuid },
      update: {
        email: "level3@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "Level 3",
        lastName: "User",
        passwordHash,
        passwordHashSalt,
        level: Level.Level3,
      },
      create: {
        id: level3UserUuid,
        organisationId: organisation1.id,
        email: "level3@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "Level 3",
        lastName: "User",
        passwordHash,
        passwordHashSalt,
        level: Level.Level3,
      },
    })
    this.logger.debug(`level3User: ${JSON.stringify(level3User)}`)

    const level4UserUuid = "b30ca79a-8416-4b05-b400-92deb8707835"
    const level4User = await this.prismaService.user.upsert({
      where: { email: "level4@curecode.ch" },
      update: {
        email: "level4@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "Level 4",
        lastName: "User",
        passwordHash,
        passwordHashSalt,
        level: Level.Level4,
      },
      create: {
        id: level4UserUuid,
        organisationId: organisation1.id,
        email: "level4@curecode.ch",
        phoneNumber: "+41 79 123 45 67",
        firstName: "Level 4",
        lastName: "User",
        passwordHash,
        passwordHashSalt,
        level: Level.Level4,
      },
    })
    this.logger.debug(`level4User: ${JSON.stringify(level4User)}`)

    const patient1Uuid = "7e23f0c9-34f8-47b8-bfc6-be8d5b93e580"
    const patient1 = await this.prismaService.patient.upsert({
      where: { id: patient1Uuid },
      update: {},
      create: {
        id: patient1Uuid,
        organisationId: organisation1.id,
        firstName: "Max",
        lastName: "Muster",
        insurance: "Helsana",
        street: "Musterstrasse 12",
        city: "Musterhausen",
        zip: "1234",
        ahvNumber: "756.1234.5678.97",
        birthDate: new Date("1990-01-01"),
      },
    })
    this.logger.debug(`patient1: ${JSON.stringify(patient1)}`)

    const progressReportUuid = "92836446-8a5b-4169-aa2e-6f163068a6af"
    const progressReport = await this.prismaService.document.upsert({
      where: { id: progressReportUuid },
      update: {
        title: "Progress Report",
        content: ProgressReportTemplate,
        authorId: demoUser.id,
        patientId: patient1.id,
        documentType: DocumentType.PROGRESS_REPORT,
        status: DocumentStatus.DRAFT,
      },
      create: {
        id: progressReportUuid,
        title: "Progress Report",
        content: ProgressReportTemplate,
        authorId: demoUser.id,
        patientId: patient1.id,
        documentType: DocumentType.PROGRESS_REPORT,
        status: DocumentStatus.DRAFT,
      },
    })
    this.logger.debug(`progressReport: ${JSON.stringify(progressReport)}`)

    const referralLetterUuid = "8d0b7142-4c61-4499-93fc-5db18d31d7d7"
    const recommendationLetter = await this.prismaService.document.upsert({
      where: { id: referralLetterUuid },
      update: {
        title: "Referral Letter",
        content: ReferalLetterTemplate,
        authorId: demoUser.id,
        patientId: patient1.id,
        documentType: DocumentType.REFERRAL_LETTER,
        status: DocumentStatus.DRAFT,
      },
      create: {
        id: referralLetterUuid,
        title: "Refreral Letter",
        content: ReferalLetterTemplate,
        authorId: demoUser.id,
        patientId: patient1.id,
        documentType: DocumentType.REFERRAL_LETTER,
        status: DocumentStatus.DRAFT,
      },
    })
    this.logger.debug(
      `recommendationLetter: ${JSON.stringify(recommendationLetter)}`
    )

    // upsert document history
    const documentHistory1Uuid = "e31acc9f-1192-4b47-9009-e706db7d826e"
    const documentHistory2Uuid = "0c1a4510-51e9-48f3-bf39-c28c64422cf9"

    const documentHistories = [
      {
        documentId: progressReportUuid,
        documentHistoryUuid: documentHistory1Uuid,
      },
      {
        documentId: referralLetterUuid,
        documentHistoryUuid: documentHistory2Uuid,
      },
    ]

    await Promise.all(
      documentHistories.map(({ documentId, documentHistoryUuid }) =>
        this.prismaService.documentHistory.upsert({
          where: { id: documentHistoryUuid },
          update: {
            id: documentHistoryUuid,
            action: DocumentAction.CREATED,
            documentId,
            userId: demoUser.id,
          },
          create: {
            id: documentHistoryUuid,
            action: DocumentAction.CREATED,
            documentId,
            userId: demoUser.id,
          },
        })
      )
    )

    const icd10Chapters = await this.getIcdSeedObject<Icd10Chapter>(
      "icd10gm2025syst_kapitel.txt",
      ["code", "name"]
    )

    await this.prismaService.icd10Chapter.createMany({
      data: icd10Chapters,
      skipDuplicates: true, // Prevents errors on re-seeding
    })

    const icd10Groups = await this.getIcdSeedObject<Icd10Group>(
      "icd10gm2025syst_gruppen.txt",
      ["groupFrom", "groupTo", "chapterCode", "title"]
    )

    await this.prismaService.icd10Group.createMany({
      data: icd10Groups,
      skipDuplicates: true,
    })

    const icd10Morbidities = await this.getIcdSeedObject<Icd10Morbidity>(
      "morbl_2025.txt",
      ["code", "title"]
    )

    await this.prismaService.icd10Morbidity.createMany({
      data: icd10Morbidities,
      skipDuplicates: true,
    })

    const icd10MortalityGroups1 =
      await this.getIcdSeedObject<Icd10MortalityGroup1>("mortl1grp_2025.txt", [
        "code",
        "title",
      ])

    await this.prismaService.icd10MortalityGroup1.createMany({
      data: icd10MortalityGroups1,
      skipDuplicates: true,
    })

    const icd10Mortality1 = await this.getIcdSeedObject<Icd10Mortality1>(
      "mortl1_2025.txt",
      ["code", "groupCode", "title"]
    )

    await this.prismaService.icd10Mortality1.createMany({
      data: icd10Mortality1,
      skipDuplicates: true,
    })

    const icd10Mortality2 = await this.getIcdSeedObject<Icd10Mortality2>(
      "mortl2_2025.txt",
      ["code", "title"]
    )

    await this.prismaService.icd10Mortality2.createMany({
      data: icd10Mortality2,
      skipDuplicates: true,
    })

    const icd10MortalityGroup3 =
      await this.getIcdSeedObject<Icd10MortalityGroup3>("mortl3grp_2025.txt", [
        "code",
        "title",
      ])

    await this.prismaService.icd10MortalityGroup3.createMany({
      data: icd10MortalityGroup3,
      skipDuplicates: true,
    })

    const icd10Mortality3 = await this.getIcdSeedObject<Icd10Mortality3>(
      "mortl3_2025.txt",
      ["code", "groupCode", "title"]
    )

    await this.prismaService.icd10Mortality3.createMany({
      data: icd10Mortality3,
      skipDuplicates: true,
    })

    const icd10Mortality4 = await this.getIcdSeedObject<Icd10Mortality4>(
      "mortl4_2025.txt",
      ["code", "title"]
    )

    await this.prismaService.icd10Mortality4.createMany({
      data: icd10Mortality4,
      skipDuplicates: true,
    })

    const icd10Codes = await this.getIcdSeedObject<Icd10Code>(
      "icd10gm2025syst_kodes.txt",
      [
        "Ebene",
        "Ort",
        "Art",
        "KapNr",
        "GrVon",
        "Code",
        "NormCode",
        "CodeOhnePunkt",
        "Titel",
        "Dreisteller",
        "Viersteller",
        "Fuenfsteller",
        "P295",
        "P301",
        "MortL1Code",
        "MortL2Code",
        "MortL3Code",
        "MortL4Code",
        "MorbLCode",
        "SexCode",
        "SexFehlerTyp",
        "AltUnt",
        "AltOb",
        "AltFehlerTyp",
        "Exot",
        "Belegt",
        "IfSGMeldung",
        "IfSGLabor",
      ]
    )

    await this.prismaService.icd10Code.createMany({
      data: icd10Codes,
      skipDuplicates: true,
    })
  }

  private async getIcdSeedObject<T extends object>(
    fileName: string,
    keys: Array<keyof T>
  ): Promise<T[]> {
    /**
     * Add ICD-10 disease categories here
     */
    const filePath = path.join(
      process.cwd(), // Ensures the path is relative to the project root
      `public/icd-10-seed-data/${fileName}`
    )

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`)
      process.exit(1)
    }

    const fileContent = fs.readFileSync(filePath, "utf8")

    const entries = fileContent
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const columns = line.trim().split(";")
        return columns.reduce((acc, column, index) => {
          return { ...acc, [keys[index]]: column }
        }, {} as T)
      })

    return entries
  }
}
