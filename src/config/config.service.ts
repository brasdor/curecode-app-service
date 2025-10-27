/**
 * Config Properties
 */
export interface Config {
  NODE_ENV: "development" | "test" | "production"
  DEPLOYMENT_ENV: "development" | "staging" | "production"
  PORT: number
  USER_AGENT: string
  DATABASE_URL: string
  DATABASE_SCHEMA: string
  DATABASE_MAX_CONNECTIONS: number
  OPENAI_API_KEY: string
  APPLICATIONINSIGHTS_CONNECTION_STRING: string
  JWT_SECRET: string
  JWT_EXPIRE_IN: string
  REFRESH_JTW_SECRET: string
  REFRESH_JWT_EXPIRE_IN: string
  BCRYPT_COST: number
  DEMO_USER_PASSWORD: string
  SYSTEM_ADMIN_PASSWORD: string
  AI_SERVICE_URL: string
  AI_SERVICE_USERNAME: string
  AI_SERVICE_PASSWORD: string
  AI_SERVICE_VERSION: string
}

/**
 * Config
 */
export abstract class ConfigService {
  /**
   * Get a config variable.
   */
  public abstract get<K extends keyof Config>(key: K): Config[K]
}
