export type AccessTokenJwtPayload = {
  iss: "curecode-app-service"
  aud: "curecode-app-service"
  sub: string
}

export type RefreshTokenJwtPayload = AccessTokenJwtPayload & { jti: string }
