import { TeamRepositoryPort } from "@/domain/ports/output/TeamRepositoryPort";

interface LeaveTeamInput {
    teamUUID: string;
    userUUID: string;
    newAdminUUID?: string;
}

export class LeaveTeamService {
    constructor(
        private readonly repo: TeamRepositoryPort
    ) {}

    async execute(input: LeaveTeamInput): Promise<void> {
        const team = await this.repo.findByUUID(input.teamUUID);

        if(!team) {
            throw new Error("Time não encontrado");
        }

        const isAdmin = team.getResponsavel() === input.userUUID;

        if(isAdmin){
            if(!input.newAdminUUID){
                throw new Error("Um novo administrador deve ser designado para o time");
            }

            const isMember = await this.repo.isUserInTeam(
                input.newAdminUUID,
                input.teamUUID
            );

            if(!isMember){
                throw new Error("O novo administrador deve ser um membro do time");
            }

            await this.repo.updateResponsavel(
                input.teamUUID, 
                input.newAdminUUID
            );
        }

        await this.repo.removeUserFromTeam(
            input.userUUID,
            input.teamUUID
        );

    } 
}