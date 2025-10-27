import { Injectable } from "@nestjs/common"
import { pbkdf2, randomBytes, createHash } from "crypto"
import { promisify } from "util"

@Injectable()
export class CryptoService {
  private readonly iterations = 600000 // OWASP recommendation for PBKDF2 with SHA-256
  private readonly keyLength = 32 // 32 bytes = 256 bits
  private readonly digest = "sha256" // SHA-256 hashing algorithm

  private pbkdf2Async = promisify(pbkdf2)

  async hashPassword(
    password: string
  ): Promise<{ salt: string; hash: string }> {
    const salt = randomBytes(16).toString("hex")
    const hash = await this.pbkdf2Async(
      password,
      salt,
      this.iterations,
      this.keyLength,
      this.digest
    )
    return { salt, hash: hash.toString("hex") }
  }

  async verifyPassword(
    password: string,
    salt: string,
    hash: string
  ): Promise<boolean> {
    const derivedHash = await this.pbkdf2Async(
      password,
      salt,
      this.iterations,
      this.keyLength,
      this.digest
    )
    return derivedHash.toString("hex") === hash
  }

  async hashString(input: string): Promise<string> {
    return createHash("sha256").update(input).digest("hex")
  }
}
