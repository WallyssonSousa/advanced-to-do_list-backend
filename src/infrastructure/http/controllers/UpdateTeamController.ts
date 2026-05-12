import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { UpdateTeamService } from "@/application/use-cases/UpdateTeamService";

export class UpdateTeamController {
    constructor(
        private readonly service: UpdateTeamService
    ) {}

    async handle(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userUUID = req.user!.uuid;
            const teamUUID = req.params.teamUUID as string;
            const { name, description, usersToAdd } = req.body;
            await this.service.execute({
                teamUUID,
                userUUID,
                name,
                description,
                usersToAdd
            });

            return res.json({
                message: "Team atualizada com sucesso"
            });

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return res.status(400).json({
                message
            });
        }
    }
}