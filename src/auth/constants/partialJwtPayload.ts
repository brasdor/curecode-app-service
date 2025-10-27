import { AccessTokenJwtPayload } from "../types/AuthJwtPayload"

export const partialJwtPayload: Pick<AccessTokenJwtPayload, "aud" | "iss"> = {
  iss: "curecode-app-service",
  aud: "curecode-app-service",
}
