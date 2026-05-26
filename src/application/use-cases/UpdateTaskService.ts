import { UpdateTaskUseCase, UpdateTaskInput } from "../../domain/ports/input/UpdateTaskUseCase";
import { TaskRepositoryPort } from "../../domain/ports/output/TaskRepositoryPort";
import { Task } from "../../domain/entities/Task";

export class UpdateTaskService implements UpdateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort
  ) {}

  async execute(input: UpdateTaskInput): Promise<void> {
    const existing = await this.taskRepository.findByUUID(input.uuid);
    if (!existing) throw new Error("Task not found");

    const updated = new Task({
      uuid: existing.getUUID(),
      title: input.title ?? existing.getTitle(),
      description: input.description ?? existing.getDescription(),
      tag: input.tag ?? existing.getTag(),
      priority: input.priority as any ?? existing.getPriority(),
      assigneeUUID: (input.assigneeUUID === undefined) ? existing.getAssigneeUUID() : input.assigneeUUID,
      status: input.status ?? existing.getStatus(),
      position: input.position ?? existing.getPosition(),
      teamUUID: existing.getTeamUUID()
    });

    await this.taskRepository.update(updated);
  }
}
