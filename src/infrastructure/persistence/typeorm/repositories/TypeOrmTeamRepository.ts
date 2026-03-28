import { Repository } from "typeorm";
import { TeamRepositoryPort } from "@/domain/ports/output/TeamRepositoryPort";
import { Team } from "@/domain/entities/Team";
import { TeamEntity } from "../entities/TeamEntity";
import { UserTeamEntity } from "../entities/UserTeamEntity";

export class TypeOrmTeamRepository implements TeamRepositoryPort {
    constructor(
        private readonly teamRepository: Repository<TeamEntity>,
        private readonly userTeamRepository: Repository<UserTeamEntity>
    ) {}

    async save(team: Team): Promise<void> {
        const entity = this.teamRepository.create({
            uuid: team.getUUID(), 
            name: team.getName(),
            description: team.getDescription(),
            responsavel: team.getResponsavel()
        });

        await this.teamRepository.save(entity);
    }

    async addUserToTeam(userUUID: string, teamUUID: string): Promise<void> {
        const entity = this.userTeamRepository.create({
            userUUID,
            teamUUID
        });

        await this.userTeamRepository.save(entity);
    }

    async findTeamsByUser(userUUID: string, onlyResponsibile?: boolean): Promise<Team[]> {
        const query = this.teamRepository.createQueryBuilder("team")
        .innerJoin(
        UserTeamEntity,
        "ut",
        "ut.teamUUID = team.uuid"
        )
        .where("ut.userUUID = :userUUID", { userUUID });

        if(onlyResponsibile){
            query.andWhere("team.responsavel = :userUUID", { userUUID });
        }

        const results = await query.getRawMany();
        console.log(results);

        return results.map(team => new Team({
            uuid: team.uuid,
            name: team.name,
            description: team.description || "",
            responsavel: team.responsavel
        }));
    }
}