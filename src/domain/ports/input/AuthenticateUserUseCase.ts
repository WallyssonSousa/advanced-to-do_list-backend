export interface AuthenticateUserInput {
  email: string;
  password: string;
}

export interface AuthenticateUserUseCase {
  execute(input: AuthenticateUserInput): Promise<any>;
}