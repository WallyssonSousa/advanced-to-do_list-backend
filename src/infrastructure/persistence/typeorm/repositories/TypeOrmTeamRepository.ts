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
            responsavel: team.getResponsavel(),
            createdAt: new Date()
        });

        await this.teamRepository.save(entity);
    }

    async addUserToTeam(userUUID: string, teamUUID: string): Promise<void> {
        const entity = this.userTeamRepository.create({
            userUUID,
            teamUUID,
            createdAt: new Date()
        });

        await this.userTeamRepository.save(entity);
    }

    async findTeamsByUser(userUUID: string, onlyResponsible?: boolean): Promise<Team[]> {
        const query = this.teamRepository
            .createQueryBuilder("team")
            .innerJoin(
                UserTeamEntity,
                "ut",
                "ut.teamUUID = team.uuid"
            )
            .where("ut.userUUID = :userUUID", { userUUID });
    
        if (onlyResponsible) {
            query.andWhere("team.responsavel = :userUUID", { userUUID });
        }

        const results = await query.getMany();

        return results.map(team => new Team({
            uuid: team.uuid,
            name: team.name,
            description: team.description || "",
            responsavel: team.responsavel
        }));
    }
}