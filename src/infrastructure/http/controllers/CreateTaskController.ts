import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../../domain/ports/input/CreateTaskUseCase";

export class CreateTaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { title, description, tag, priority, assigneeUUID, position } = req.body;
    const teamUUID = String(req.params.teamUUID);

    await this.createTaskUseCase.execute({
      teamUUID,
      title,
      description,
      tag,
      priority,
      assigneeUUID,
      position,
    });

    return res.status(201).json({ message: "Task criada" });
  }
}
