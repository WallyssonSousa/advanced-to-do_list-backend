import { Request, Response } from "express";
import { ReorderTasksUseCase } from "../../../domain/ports/input/ReorderTasksUseCase";

export class ReorderTasksController {
  constructor(private readonly reorderTasksUseCase: ReorderTasksUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const teamUUID = String(req.params.teamUUID);
    const items = req.body; // expect array of { uuid, status?, position? }

    await this.reorderTasksUseCase.execute(teamUUID, items);

    return res.status(200).json({ message: "Tasks reordenadas" });
  }
}
