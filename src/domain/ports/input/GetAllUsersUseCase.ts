export interface UserSummary {
  name: string;
  email: string;
}

export interface GetAllUsersInput {
  email?: string;
}

export interface GetAllUsersUseCase {
  execute(input: GetAllUsersInput): Promise<UserSummary[]>;
}
