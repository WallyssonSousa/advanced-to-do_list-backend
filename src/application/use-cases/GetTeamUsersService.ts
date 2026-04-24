import { TeamRepositoryPort } from "@/domain/ports/output/TeamRepositoryPort";
import { UserRepositoryPort } from "@/domain/ports/output/UserRepositoryPort";

export interface TeamUser {
  uuid: string;
  name: string;
  isAdmin: boolean;
}

export class GetTeamUsersService {
    constructor(
        private readonly teamRepo: TeamRepositoryPort,
        private readonly userRepo: UserRepositoryPort
    ) {}

    async execute(teamUUID: string, userUUID: string): Promise<TeamUser[]> {
        const isMember = await this.teamRepo.isUserInTeam(userUUID, teamUUID);

        if (!isMember) throw new Error("Acesso negado");

        const team = await this.teamRepo.findByUUID(teamUUID);
        if (!team) throw new Error("Time não encontrado");

        const userUUIDs = await this.teamRepo.findUsersByTeam(teamUUID);

        const users: TeamUser[] = [];

        for (const uuid of userUUIDs) {
            const user = await this.userRepo.findByUUID(uuid);
            if (user) {
                users.push({
                    uuid: user.getUUID(),
                    name: user.getName(),
                    isAdmin: team.getResponsavel() === uuid
                });
            }
        }

        return users;
    }
}