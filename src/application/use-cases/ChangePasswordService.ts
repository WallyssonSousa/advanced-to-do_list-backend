import { ChangePasswordUseCase, ChangePasswordInput } from "../../domain/ports/input/ChangePasswordUseCase";
import { UserRepositoryPort } from "../../domain/ports/output/UserRepositoryPort";
import bcrypt from "bcrypt";

export class ChangePasswordService implements ChangePasswordUseCase {

  constructor(
    private readonly userRepository: UserRepositoryPort
  ) {}

  async execute(input: ChangePasswordInput): Promise<void> {

    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const hashedPassword = await bcrypt.hash(input.newPassword, 10);

    (user as any).password = hashedPassword;
    (user as any).isFirstLogin = false;
    (user as any).isTempPassword = false;

    await this.userRepository.update(user);
  }
}