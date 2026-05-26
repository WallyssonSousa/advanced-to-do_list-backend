import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uuid!: string;

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ nullable: true })
  tag?: string;

  @Column({ nullable: true })
  priority?: string;

  @Column({ name: "assignee_uuid", nullable: true })
  assigneeUUID?: string;

  @Column({ default: "todo" })
  status!: string;

  @Column({ name: "position", type: "integer", default: 0 })
  position!: number;

  @Column({ name: "team_uuid" })
  teamUUID!: string;

  @Column({ name: "created_at" })
  createdAt!: Date;
}
