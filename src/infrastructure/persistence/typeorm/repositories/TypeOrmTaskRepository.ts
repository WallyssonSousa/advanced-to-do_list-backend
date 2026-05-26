import { Repository } from "typeorm";
import { TaskRepositoryPort } from "../../../../domain/ports/output/TaskRepositoryPort";
import { Task } from "../../../../domain/entities/Task";
import { TaskEntity } from "../entities/TaskEntity";

export class TypeOrmTaskRepository implements TaskRepositoryPort {
  constructor(
    private readonly repository: Repository<TaskEntity>
  ) {}

  async findByTeam(teamUUID: string): Promise<Task[]> {
    const entities = await this.repository.find({ where: { teamUUID } });

    return entities.map((e) => new Task({
      uuid: e.uuid,
      title: e.title,
      description: e.description,
      tag: e.tag,
      priority: e.priority as any,
      assigneeUUID: e.assigneeUUID ?? null,
      status: e.status as any,
      position: e.position,
      teamUUID: e.teamUUID
    }));
  }

  async findByUUID(uuid: string): Promise<Task | null> {
    const e = await this.repository.findOne({ where: { uuid } });
    if (!e) return null;
    return new Task({
      uuid: e.uuid,
      title: e.title,
      description: e.description,
      tag: e.tag,
      priority: e.priority as any,
      assigneeUUID: e.assigneeUUID ?? null,
      status: e.status as any,
      position: e.position,
      teamUUID: e.teamUUID
    });
  }

  async save(task: Task): Promise<void> {
    const entity = this.repository.create({
      uuid: task.getUUID(),
      title: task.getTitle(),
      description: task.getDescription(),
      tag: task.getTag(),
      priority: task.getPriority(),
      assigneeUUID: task.getAssigneeUUID() ?? undefined,
      status: task.getStatus(),
      position: task.getPosition(),
      teamUUID: task.getTeamUUID(),
      createdAt: new Date()
    });

    await this.repository.save(entity);
  }

  async update(task: Task): Promise<void> {
    await this.repository.update({ uuid: task.getUUID() }, {
      title: task.getTitle(),
      description: task.getDescription(),
      tag: task.getTag(),
      priority: task.getPriority(),
      assigneeUUID: task.getAssigneeUUID() ?? undefined,
      status: task.getStatus(),
      position: task.getPosition()
    } as any);
  }

  async delete(uuid: string): Promise<void> {
    await this.repository.delete({ uuid });
  }
}
