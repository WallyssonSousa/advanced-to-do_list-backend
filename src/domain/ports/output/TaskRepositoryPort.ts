import { Task } from "../../entities/Task";

export interface TaskRepositoryPort {
  findByTeam(teamUUID: string): Promise<Task[]>;
  findByUUID(uuid: string): Promise<Task | null>;
  save(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  delete(uuid: string): Promise<void>;
}
