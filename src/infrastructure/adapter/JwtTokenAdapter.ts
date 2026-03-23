import jwt from "jsonwebtoken";
import { TokenProviderPort } from "../../domain/ports/output/TokenProviderPort";
import { env } from "../../config/env";

export class JwtTokenAdapter implements TokenProviderPort {

  generate(payload: any): string {
    return jwt.sign(payload, env.jwtSecret, {
      expiresIn: "1d"
    });
  }
}