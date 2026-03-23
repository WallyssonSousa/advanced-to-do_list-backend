import { CreateUserUseCase, CreateUserInput } from "../../domain/ports/input/CreateUserUseCase";
import { UserRepositoryPort } from "../../domain/ports/output/UserRepositoryPort";
import { CredentialsApiPort } from "../../domain/ports/output/CredentialsApiPort";
import { User } from "../../domain/entities/User";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { env } from "../../config/env";

export class CreateUserService implements CreateUserUseCase {

  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly credentialsApi: CredentialsApiPort
  ) {}

  async execute(input: CreateUserInput): Promise<void> {

    const userExists = await this.userRepository.findByEmail(input.email);

    if (userExists) {
      throw new Error("Usuário já existe");
    }

    const tempPassword = uuidv4().slice(0, 8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = new User({
      uuid: uuidv4(),
      name: input.name,
      email: input.email,
      password: hashedPassword,
      isFirstLogin: true,
      isTempPassword: true
    });

    await this.userRepository.save(user);

    await this.credentialsApi.sendCredentials({
      name: input.name,
      email: input.email,
      projectId: env.projectId, 
      tempPassword: tempPassword
    });
  }
}