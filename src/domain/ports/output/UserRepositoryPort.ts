import { User } from "../../entities/User";

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  findByUUID(uuid: string): Promise<User | null>;
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
}