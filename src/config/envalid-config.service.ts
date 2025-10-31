import { Injectable } from "@nestjs/common"
import * as envalid from "envalid"
import { ConfigService, Config } from "./config.service"

/**
 * Envalid Config Service
 */
@Injectable()
export class EnvalidConfigService extends ConfigService {
  private readonly configProps: Config

  public constructor() {
    super()
    this.configProps = EnvalidConfigService.createAndValidateConfigProps()
  }

  /**
   * Get a config variable.
   */
  public get<K extends keyof Config>(key: K): Config[K] {
    return this.configProps[key]
  }

  private static createAndValidateConfigProps(): Config {
    return envalid.cleanEnv(process.env, {
      NODE_ENV: envalid.str({ choices: ["development", "test", "production"] }),
      DEPLOYMENT_ENV: envalid.str({
        choices: ["development", "staging", "production"],
        devDefault: "development",
      }),
      PORT: envalid.port({ devDefault: 3000 }),
      USER_AGENT: envalid.str({ default: "CureCode-AppService/1.0" }),
      DATABASE_URL: envalid.url({
        devDefault:
          "postgres://developer:developer@localhost:6432/curecode_app_service",
      }),
      DATABASE_SCHEMA: envalid.str({ default: "curecode_app_service" }),
      DATABASE_MAX_CONNECTIONS: envalid.num({ default: 100 }),
      OPENAI_API_KEY: envalid.str({ default: "" }),
      APPLICATIONINSIGHTS_CONNECTION_STRING: envalid.str({
        devDefault: "InstrumentationKey=00000000-0000-0000-0000-000000000000",
      }),
      JWT_SECRET: EnvalidConfigService.hex64String({
        devDefault:
          "0000000000000000000000000000000000000000000000000000000000000000",
      }),
      JWT_EXPIRE_IN: envalid.str({ devDefault: "1h" }),
      REFRESH_JTW_SECRET: EnvalidConfigService.hex64String({
        devDefault:
          "0000000000000000000000000000000000000000000000000000000000000000",
      }),
      REFRESH_JWT_EXPIRE_IN: envalid.str({ devDefault: "7d" }),
      BCRYPT_COST: envalid.num({ default: 12 }),
      DEMO_USER_PASSWORD: envalid.str({ default: "password" }),
      SYSTEM_ADMIN_PASSWORD: envalid.str({ default: "admin" }),
      AI_SERVICE_URL: envalid.url({
        devDefault: "https://app-curecode-ai-staging.azurewebsites.net",
      }),
      AI_SERVICE_VERSION: envalid.str({ default: "2024-10-18" }),
      AI_SERVICE_USERNAME: envalid.str({ default: "curecode-app-service" }),
      AI_SERVICE_PASSWORD: envalid.str({ default: "" }),
    })
  }

  private static readonly hex64String = envalid.makeValidator<string>((x) => {
    if (/^[0-9a-f]{64}$/.test(x)) {
      return x
    }
    throw new Error("Expected a hex-character string of length 64")
  })
}
