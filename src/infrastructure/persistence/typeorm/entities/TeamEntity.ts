import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("teams")
export class TeamEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uuid!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  responsavel!: string;

  @Column({ name: "created_at" })
  createdAt!: Date;
}