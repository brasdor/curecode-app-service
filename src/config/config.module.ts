import { Global, Module } from "@nestjs/common"
import { EnvalidConfigService } from "./envalid-config.service"
import { ConfigService } from "./config.service"

/**
 * Config Module
 */
@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useClass: EnvalidConfigService,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
