import { CreateTaskUseCase, CreateTaskInput } from "../../domain/ports/input/CreateTaskUseCase";
import { TaskRepositoryPort } from "../../domain/ports/output/TaskRepositoryPort";
import { Task } from "../../domain/entities/Task";
import { v4 as uuidv4 } from "uuid";

export class CreateTaskService implements CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort
  ) {}

  async execute(input: CreateTaskInput): Promise<void> {
    const task = new Task({
      uuid: uuidv4(),
      title: input.title,
      description: input.description,
      tag: input.tag,
      priority: input.priority as any,
      assigneeUUID: input.assigneeUUID ?? null,
      status: "todo",
      position: input.position ?? 0,
      teamUUID: input.teamUUID
    });

    await this.taskRepository.save(task);
  }
}
