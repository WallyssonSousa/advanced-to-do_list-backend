import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_teams")
export class UserTeamEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "user_uuid" })
  userUUID!: string;

  @Column({ name: "team_uuid" })
  teamUUID!: string;

  @Column({ name: "created_at" })
  createdAt!: Date;
}