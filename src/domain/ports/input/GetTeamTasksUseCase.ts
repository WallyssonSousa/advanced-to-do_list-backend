import { Task } from "../../entities/Task";

export interface GetTeamTasksUseCase {
  execute(teamUUID: string): Promise<Task[]>;
}
