import { Request, Response } from "express";
import { ChangePasswordUseCase } from "../../../domain/ports/input/ChangePasswordUseCase";

export class ChangePasswordController {

  constructor(
    private readonly useCase: ChangePasswordUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, newPassword } = req.body;

    await this.useCase.execute({ email, newPassword });

    return res.json({
      message: "Senha atualizada com sucesso"
    });
  }
}