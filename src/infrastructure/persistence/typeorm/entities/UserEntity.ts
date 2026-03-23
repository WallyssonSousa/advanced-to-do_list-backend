import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ name: "is_first_login", default: true })
  isFirstLogin!: boolean;

  @Column({ name: "is_temp_password", default: true })
  isTempPassword!: boolean;
}