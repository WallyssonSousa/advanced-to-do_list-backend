import { DeleteTaskUseCase } from "../../domain/ports/input/DeleteTaskUseCase";
import { TaskRepositoryPort } from "../../domain/ports/output/TaskRepositoryPort";

export class DeleteTaskService implements DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepositoryPort) {}

  async execute(uuid: string): Promise<void> {
    await this.taskRepository.delete(uuid);
  }
}
