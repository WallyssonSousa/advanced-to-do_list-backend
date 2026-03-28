export interface GetUserTeamsInput {
    userUUID: string;
    onlyResponsibile: boolean;
}

export interface GetUserTeamsOutput {
    uuid: string; 
    name: string;
    description?: string;
    responsavel: string;
}

export interface GetUserTeamsUseCase {
    execute(input: GetUserTeamsInput): Promise<GetUserTeamsOutput[]>;
}