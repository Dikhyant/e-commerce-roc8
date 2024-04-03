import jwt from "jsonwebtoken";

export function getDecodedJWTToken<T>(token: string): T {
  const decodedToken: T = jwt.verify(
    token,
    process.env.USER_LOGIN_TOKEN_SECRET!,
  ) as T;
  return decodedToken;
}
