import { User } from "../../entities/User";

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  findByUUID(uuid: string): Promise<User | null>;
  findAll(email?: string): Promise<User[]>;
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
}