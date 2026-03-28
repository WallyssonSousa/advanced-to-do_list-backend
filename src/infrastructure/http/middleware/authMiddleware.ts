import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/config/env";

export interface AuthRequest extends Request {
  user?: {
    uuid: string;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as any;

    req.user = {
      uuid: decoded.uuid
    };

    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}