import { Router } from "express";
import { buildChangePasswordController, buildCreateTeamController, buildCreateUserController, buildGetUserTeamsController, buildLoginController } from "./../../container";
import { authMiddleware } from "./middleware/authMiddleware";

export const routes = Router();

routes.get('/api/health', (req, res) => {
    res.json({status: 'ok'});
});

/**
 * 
 * @author Wallysson Sousa
 * @description POST's 
 * 
 */

routes.post('/api/users', async (req, res) => {
    const controller = await buildCreateUserController();
    return controller.handle(req, res);
})

routes.post('/api/auth/login', async (req, res) => {
  const controller = await buildLoginController();
  return controller.handle(req, res);
});

routes.post('/api/auth/change-password', async (req, res) => {
  const controller = await buildChangePasswordController();
  return controller.handle(req, res);
});

routes.post("/api/teams",
  authMiddleware,
  async (req, res) => {
    const controller = await buildCreateTeamController();
    return controller.handle(req, res)
  }
);

/**
 * 
 * @author Wallysson Sousa
 * @description GET's 
 * 
 */

routes.get("/api/teams", 
  authMiddleware,
  async (req, res) => {
    const controller = await buildGetUserTeamsController();
    return controller.handle(req, res);
  }
)