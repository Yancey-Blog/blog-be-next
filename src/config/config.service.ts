import dotenv from 'dotenv'
import fs from 'fs'

export class ConfigService {
  private readonly envConfig: Record<string, string>

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath))
  }

  get(key: string): string {
    return this.envConfig[key]
  }
}
