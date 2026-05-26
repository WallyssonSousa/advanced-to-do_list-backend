import { Request, Response } from "express";
import { DeleteTaskUseCase } from "../../../domain/ports/input/DeleteTaskUseCase";

export class DeleteTaskController {
  constructor(private readonly deleteTaskUseCase: DeleteTaskUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const uuid = String(req.params.uuid);
    await this.deleteTaskUseCase.execute(uuid);
    return res.status(200).json({ message: "Task deletada" });
  }
}
