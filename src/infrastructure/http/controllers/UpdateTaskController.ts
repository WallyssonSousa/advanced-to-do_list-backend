import { Request, Response } from "express";
import { UpdateTaskUseCase } from "../../../domain/ports/input/UpdateTaskUseCase";

export class UpdateTaskController {
  constructor(private readonly updateTaskUseCase: UpdateTaskUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;
    const payload = req.body;

    await this.updateTaskUseCase.execute({ uuid, ...payload });

    return res.status(200).json({ message: "Task atualizada" });
  }
}
