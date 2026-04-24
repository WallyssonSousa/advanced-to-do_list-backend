import { Team } from "@/domain/entities/Team";

export interface TeamRepositoryPort{
    save(team: Team): Promise<void>;
    addUserToTeam(
        userUUID: string,
        teamUUID: string
    ): Promise<void>;
    findTeamsByUser(
        userUUID: string, 
        onlyResponsible?: boolean
    ): Promise<Team[]>;

    findByUUID(teamUUID: string): Promise<Team | null>;

    findUsersByTeam(teamUUID: string): Promise<string[]>;

    isUserInTeam(userUUID: string, teamUUID: string): Promise<boolean>;

    update(team: Team): Promise<void>;

    removeUserFromTeam(userUUID: string, teamUUID: string): Promise<void>;

    updateResponsavel(teamUUID: string, newResponsavel: string): Promise<void>;

    
}