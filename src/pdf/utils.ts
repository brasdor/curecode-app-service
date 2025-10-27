import fs from "fs"
import { join } from "path"

export const getBase64Font = (fileName: string) => {
  const fontPath = join(__dirname, "..", "assets", "fonts", fileName)

  const fileData = fs.readFileSync(fontPath)
  return fileData.toString("base64")
}
