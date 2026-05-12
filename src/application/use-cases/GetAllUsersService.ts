import { UserRepositoryPort } from "@/domain/ports/output/UserRepositoryPort";
import { GetAllUsersInput, GetAllUsersUseCase, UserSummary } from "@/domain/ports/input/GetAllUsersUseCase";

export class GetAllUsersService implements GetAllUsersUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort
  ) {}

  async execute(input: GetAllUsersInput): Promise<UserSummary[]> {
    const users = await this.userRepository.findAll(input.email);

    return users.map((user) => ({
      name: user.getName(),
      email: user.getEmail()
    }));
  }
}
