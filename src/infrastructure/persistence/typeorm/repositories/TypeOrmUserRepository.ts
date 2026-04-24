import { Repository } from "typeorm";
import { UserRepositoryPort } from "../../../../domain/ports/output/UserRepositoryPort";
import { User } from "../../../../domain/entities/User";
import { UserEntity } from "../entities/UserEntity";

export class TypeOrmUserRepository implements UserRepositoryPort {

  constructor(
    private readonly repository: Repository<UserEntity>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { email } });

    if (!entity) return null;

    return new User({
      uuid: entity.uuid,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      isFirstLogin: entity.isFirstLogin,
      isTempPassword: entity.isTempPassword
    });
  }

  async findByUUID(uuid: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { uuid } });

    if (!entity) return null;

    return new User({
      uuid: entity.uuid,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      isFirstLogin: entity.isFirstLogin,
      isTempPassword: entity.isTempPassword
    });
  }

  async save(user: User): Promise<void> {
    const entity = this.repository.create({
      uuid: user.getUUID(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      isFirstLogin: user.getIsFirstLogin(),
      isTempPassword: user.getIsTempPassword()
    });

    await this.repository.save(entity);
  }

  async update(user: User): Promise<void> {
    await this.repository.update(
        { uuid: user.getUUID() },
        {
        password: user.getPassword(),
        isFirstLogin: user.getIsFirstLogin(),
        isTempPassword: user.getIsTempPassword()
        }
    );
  }
}