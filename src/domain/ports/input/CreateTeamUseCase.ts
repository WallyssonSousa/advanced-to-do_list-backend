export interface CreateTeamInput {
    name: string;
    description?: string;
    userUUID: string;
}
export interface CreateTeamUseCase {
    execute(input: CreateTeamInput): Promise<void>;
}