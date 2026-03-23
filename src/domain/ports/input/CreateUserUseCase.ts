export interface CreateUserInput {
  name: string;
  email: string;
}

export interface CreateUserUseCase {
  execute(input: CreateUserInput): Promise<void>;
}