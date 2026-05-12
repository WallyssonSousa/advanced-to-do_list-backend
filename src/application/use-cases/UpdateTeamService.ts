import { TeamRepositoryPort } from "@/domain/ports/output/TeamRepositoryPort";
import { UserRepositoryPort } from "@/domain/ports/output/UserRepositoryPort";
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
        private readonly teamRepo: TeamRepositoryPort,
        private readonly userRepo: UserRepositoryPort
    ) {}

    async execute(input: UpdateTeamInput): Promise<void> {
        const team = await this.teamRepo.findByUUID(input.teamUUID);

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

        await this.teamRepo.update(updatedTeam);

        if(input.usersToAdd){
            for(const userEmail of input.usersToAdd) {
                const user = await this.userRepo.findByEmail(userEmail);

                if(!user) {
                    throw new Error(`Usuário com email ${userEmail} não encontrado`);
                }

                const alreadyInTeam = await this.teamRepo.isUserInTeam(user.getUUID(), input.teamUUID);
                if(!alreadyInTeam){
                    await this.teamRepo.addUserToTeam(user.getUUID(), input.teamUUID);
                }
            }
        }
    }
}