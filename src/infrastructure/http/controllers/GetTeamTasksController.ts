import { Request, Response } from "express";
import { GetTeamTasksUseCase } from "../../../domain/ports/input/GetTeamTasksUseCase";

export class GetTeamTasksController {
  constructor(private readonly getTeamTasksUseCase: GetTeamTasksUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const teamUUID = String(req.params.teamUUID);
    const tasks = await this.getTeamTasksUseCase.execute(teamUUID);
    return res.status(200).json(tasks.map((t) => ({
      uuid: t.getUUID(),
      title: t.getTitle(),
      description: t.getDescription(),
      tag: t.getTag(),
      priority: t.getPriority(),
      assigneeUUID: t.getAssigneeUUID(),
      status: t.getStatus(),
      position: t.getPosition(),
      teamUUID: t.getTeamUUID()
    })));
  }
}
