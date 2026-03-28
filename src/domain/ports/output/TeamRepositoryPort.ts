import { Team } from "@/domain/entities/Team";

export interface TeamRepositoryPort{
    save(team: Team): Promise<void>;
    addUserToTeam(
        userUUID: string,
        teamUUID: string
    ): Promise<void>;
    findTeamsByUser(
        userUUID: string, 
        onlyResponsavel?: boolean
    ): Promise<Team[]>;
}