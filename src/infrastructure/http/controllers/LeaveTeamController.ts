import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { LeaveTeamService } from "@/application/use-cases/LeaveTeamService";

export class LeaveTeamController {
    constructor(
        private readonly service: LeaveTeamService
    ) {}

    async handle(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userUUID = req.user!.uuid;
            const teamUUID = Array.isArray(req.params.teamUUID) 
                ? req.params.teamUUID[0] 
                : req.params.teamUUID;
            const { newAdminUUID } = req.body;

            await this.service.execute({
                teamUUID,
                userUUID,
                newAdminUUID
            });

            return res.json({
                message: "Saiu da team com sucesso"
            });

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return res.status(400).json({
                message
            });
        }
    }
}