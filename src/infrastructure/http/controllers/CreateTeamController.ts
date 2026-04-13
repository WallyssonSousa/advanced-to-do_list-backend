import { Request, Response } from "express";
import { CreateTeamUseCase } from "@/domain/ports/input/CreateTeamUseCase";

export class CreateTeamController {  
    constructor(
        private readonly createTeamUseCase: CreateTeamUseCase
    ){}

    async handle(req: Request, res: Response): Promise<Response>{
        const { name, description } = req.body;
        
        const userUUID =  req.body.userUUID;

        await this.createTeamUseCase.execute({
            name, 
            description,
            userUUID
        });

        return res.status(201).json({
            message: "Team criado com sucesso"
        })
    }
}