import { CreateTeamUseCase, CreateTeamInput } from "@/domain/ports/input/CreateTeamUseCase";
import { TeamRepositoryPort } from "@/domain/ports/output/TeamRepositoryPort";
import { Team } from "@/domain/entities/Team";
import { v4 as uuidv4 } from "uuid";

export class CreateTeamService implements CreateTeamUseCase {
    constructor (
        private readonly teamRepository: TeamRepositoryPort
    ) {}

    async execute(input: CreateTeamInput): Promise<void> {
        const team = new Team({
            uuid: uuidv4(), 
            name: input.name,
            description: input.description || "",
            responsavel: input.userUUID
        });

        await this.teamRepository.save(team);

        await this.teamRepository.addUserToTeam(
            input.userUUID,
            team.getUUID()
        )
    }
}