import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "../../../domain/ports/input/AuthenticateUserUseCase";

export class AuthenticateUserController {

  constructor(
    private readonly useCase: AuthenticateUserUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const result = await this.useCase.execute({ email, password });

    return res.json(result);
  }
}