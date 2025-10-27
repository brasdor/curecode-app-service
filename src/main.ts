import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { NestExpressApplication } from "@nestjs/platform-express"
import { ConfigService } from "./config"
import "reflect-metadata"

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  AppModule.configureExpressApp(app)

  const configService = app.get(ConfigService)
  const port = configService.get("PORT")

  await app.listen(port)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
