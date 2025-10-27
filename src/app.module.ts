import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from "@nestjs/common"
import { HttpAdapterHost, Reflector } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import * as bodyParser from "body-parser"
import { AiModule } from "./ai/ai.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { ConfigModule } from "./config/config.module"
import { CryptoService } from "./crypto/crypto.service"
import { DocumentHistoryModule } from "./document-history/document-history.module"
import { DocumentHistoryService } from "./document-history/document-history.service"
import { DocumentsModule } from "./documents/documents.module"
import { HealthModule } from "./health/health.module"
import { IcdModule } from "./icd/icd.module"
import { LogosModule } from "./logos/logos.module"
import { OpenaiModule } from "./openai/openai.module"
import { OpenaiService } from "./openai/openai.service"
import { OrganisationsModule } from "./organisations/organisations.module"
import { PatientsModule } from "./patients/patients.module"
import { PdfController } from "./pdf/pdf.controller"
import { PdfModule } from "./pdf/pdf.module"
import { PdfService } from "./pdf/pdf.service"
import { PrismaClientExceptionFilter } from "./prisma-client-exception/prisma-client-exception.filter"
import { PrismaModule } from "./prisma/prisma.module"
import { UsersModule } from "./users/users.module"
import { ConsultationsModule } from './consultations/consultations.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    UsersModule,
    DocumentsModule,
    AuthModule,
    PatientsModule,
    PdfModule,
    OrganisationsModule,
    HealthModule,
    LogosModule,
    AiModule,
    DocumentHistoryModule,
    OpenaiModule,
    IcdModule,
    ConsultationsModule, // File Upload Configuration (Multer)
  ],
  controllers: [AppController, PdfController],
  providers: [
    AppService,
    OpenaiService,
    PdfService,
    CryptoService,
    DocumentHistoryService,
  ],
})
export class AppModule {
  public static configureExpressApp(app: NestExpressApplication): void {
    // detect shutdown signals
    // https://docs.nestjs.com/fundamentals/lifecycle-events#application-shutdown
    app.enableShutdownHooks()

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      })
    )
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector))
    )
    // app.enableCors({
    //   origin: ['http://localhost:5173'],
    //   methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    //   credentials: true,
    // });

    // Increase the payload size limit
    app.use(bodyParser.json({ limit: "50mb" })) // Adjust the size as needed

    const config = new DocumentBuilder()
      .setTitle("CureCode GenAI API")
      .setDescription("The CureCode GenAI API description")
      .setVersion("0.1")
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("api", app, document)

    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
  }
}
