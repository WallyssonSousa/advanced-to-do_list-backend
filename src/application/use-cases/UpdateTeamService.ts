import { TeamRepositoryPort } from "@/domain/ports/output/TeamRepositoryPort";
import { Team } from '../../domain/entities/Team';

interface UpdateTeamInput {
    teamUUID: string;
    userUUID: string;
    name?: string; 
    description?: string;
    usersToAdd?: string[];
}


export class UpdateTeamService {
    constructor(
        private readonly repo: TeamRepositoryPort
    ) {}

    async execute(input: UpdateTeamInput): Promise<void> {
        const team = await this.repo.findByUUID(input.teamUUID);

        if(!team) {
            throw new Error("Team not found")
        }

        if(team.getResponsavel() !== input.userUUID) {
            throw new Error("Apenas administradores podem atualizar")
        }

        const updatedTeam = new Team({
            uuid: team.getUUID(),
            name: input.name ?? team.getName() ?? '',
            description: input.description ?? team.getDescription() ?? '',
            responsavel: team.getResponsavel()
        });

        await this.repo.update(updatedTeam);

        if(input.usersToAdd){
            for(const userId of input.usersToAdd) {
                const alreadyInTeam = await this.repo.isUserInTeam(userId, input.teamUUID);
                if(!alreadyInTeam){
                    await this.repo.addUserToTeam(userId, input.teamUUID);
                }
            }
        }
    }
}