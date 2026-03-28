import {
    GetUserTeamsUseCase,
    GetUserTeamsInput,
    GetUserTeamsOutput
} from "@/domain/ports/input/GetUserTeamsUseCase";
import { TeamRepositoryPort } from "@/domain/ports/output/TeamRepositoryPort";

export class GetUserTeamsService implements GetUserTeamsUseCase{
    constructor(
        private readonly teamRepository: TeamRepositoryPort
    ) {}

    async execute(input: GetUserTeamsInput): Promise<GetUserTeamsOutput[]> {
        const teams = await this.teamRepository.findTeamsByUser(
            input.userUUID,
            input.onlyResponsibile
        );

        return teams.map(team => ({
            uuid: team.getUUID(), 
            name: team.getName(),
            description: team.getDescription(),
            responsavel: team.getResponsavel()
        }))
    }
}