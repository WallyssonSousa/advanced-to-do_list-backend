import { Request, Response } from "express";
import { GetAllUsersUseCase } from "@/domain/ports/input/GetAllUsersUseCase";

export class GetAllUsersController {
  constructor(
    private readonly service: GetAllUsersUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const rawEmail = Array.isArray(req.query.email) ? req.query.email[0] : req.query.email;
      const email = typeof rawEmail === "string" ? rawEmail : undefined;
      const users = await this.service.execute({ email });
      return res.json({ users });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).json({ message });
    }
  }
}
