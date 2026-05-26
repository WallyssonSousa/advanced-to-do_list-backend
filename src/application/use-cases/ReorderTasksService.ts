import { ReorderTasksUseCase, ReorderItem } from "../../domain/ports/input/ReorderTasksUseCase";
import { TaskRepositoryPort } from "../../domain/ports/output/TaskRepositoryPort";

export class ReorderTasksService implements ReorderTasksUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(teamUUID: string, items: ReorderItem[]): Promise<void> {
    // update each task with provided status/position
    for (const it of items) {
      const existing = await this.taskRepository.findByUUID(it.uuid);
      if (!existing) continue;
      // only update if belongs to team
      if (existing.getTeamUUID() !== teamUUID) continue;

      const updated = new (existing.constructor as any)({
        uuid: existing.getUUID(),
        title: existing.getTitle(),
        description: existing.getDescription(),
        tag: existing.getTag(),
        priority: existing.getPriority(),
        assigneeUUID: existing.getAssigneeUUID(),
        status: it.status ?? existing.getStatus(),
        position: it.position ?? existing.getPosition(),
        teamUUID: existing.getTeamUUID()
      });

      await this.taskRepository.update(updated);
    }
  }
}
