import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { GetTeamUsersService } from "@/application/use-cases/GetTeamUsersService";

export class GetTeamUsersController {
    constructor(
        private readonly service: GetTeamUsersService
    ) {}

    async handle(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userUUID = req.user!.uuid;
            const teamUUID = Array.isArray(req.params.teamUUID) 
                ? req.params.teamUUID[0] 
                : req.params.teamUUID;

            const users = await this.service.execute(
                teamUUID,
                userUUID
            );

            return res.json({
                users
            });

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return res.status(403).json({
                message
            });
        }
    }
}