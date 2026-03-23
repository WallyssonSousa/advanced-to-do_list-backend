import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../domain/ports/input/CreateUserUseCase";

export class CreateUserController {

  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    await this.createUserUseCase.execute({
      name,
      email, 
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso"
    });
  }
}