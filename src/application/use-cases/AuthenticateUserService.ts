import { AuthenticateUserUseCase, AuthenticateUserInput } from "../../domain/ports/input/AuthenticateUserUseCase";
import { UserRepositoryPort } from "../../domain/ports/output/UserRepositoryPort";
import { TokenProviderPort } from "../../domain/ports/output/TokenProviderPort";
import bcrypt from "bcrypt";

export class AuthenticateUserService implements AuthenticateUserUseCase {

  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly tokenProvider: TokenProviderPort
  ) {}

  async execute(input: AuthenticateUserInput): Promise<any> {

    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const passwordMatch = await bcrypt.compare(input.password, user.getPassword());

    if (!passwordMatch) {
      throw new Error("Credenciais inválidas");
    }

    if (user.getIsFirstLogin()) {
      return {
        firstLogin: true,
        message: "Primeiro acesso - troca de senha obrigatória"
      };
    }

    const token = this.tokenProvider.generate({
      userId: user.getUUID(),
      email: user.getEmail()
    });

    return {
      token,
      uuid: user.getUUID(),
      name: user.getName(),
      email: user.getEmail()
    };
  }
}