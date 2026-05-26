import { GetTeamTasksUseCase } from "../../domain/ports/input/GetTeamTasksUseCase";
import { TaskRepositoryPort } from "../../domain/ports/output/TaskRepositoryPort";
import { Task } from "../../domain/entities/Task";

export class GetTeamTasksService implements GetTeamTasksUseCase {
  constructor(
    private readonly taskRepository: TaskRepositoryPort
  ) {}

  async execute(teamUUID: string): Promise<Task[]> {
    return this.taskRepository.findByTeam(teamUUID);
  }
}
