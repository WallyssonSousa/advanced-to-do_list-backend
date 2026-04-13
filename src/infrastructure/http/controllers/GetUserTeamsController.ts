import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { GetUserTeamsUseCase } from "@/domain/ports/input/GetUserTeamsUseCase";

export class GetUserTeamsController {
    constructor(
        private readonly useCase: GetUserTeamsUseCase
    ){}

    async handle(req: AuthRequest, res: Response): Promise<Response> {
        const userUUID = req.user!.uuid;

        const onlyResponsible = req.query.onlyResponsible === "true";

        const result = await this.useCase.execute({
            userUUID,
            onlyResponsible
        });

        return res.json(result);
    }
}