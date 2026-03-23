export interface ChangePasswordInput {
  email: string;
  newPassword: string;
}

export interface ChangePasswordUseCase {
  execute(input: ChangePasswordInput): Promise<void>;
}