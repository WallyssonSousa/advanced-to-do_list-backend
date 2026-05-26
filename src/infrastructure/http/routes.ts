import { Router } from "express";
import { buildChangePasswordController, buildCreateTeamController, buildCreateUserController, buildGetAllUsersController, buildGetTeamUsersController, buildGetUserTeamsController, buildLeaveTeamController, buildLoginController, buildUpdateTeamController, buildGetTeamTasksController, buildCreateTaskController, buildUpdateTaskController, buildDeleteTaskController, buildReorderTasksController } from "./../../container";
import { authMiddleware } from "./middleware/authMiddleware";

export const routes = Router();

routes.get('/api/health', (req, res) => {
    res.json({status: 'ok'});
});

/**
 *
 * @author Wallysson
 * @methodo POST
 * @useCase CreateUser
 *
 */
routes.post('/api/users', async (req, res) => {
    const controller = await buildCreateUserController();
    return controller.handle(req, res);
})

routes.get('/api/users', authMiddleware, async (req, res) => {
    const controller = await buildGetAllUsersController();
    return controller.handle(req, res);
})

/**
 *
 * @author Wallysson
 * @methodo POST
 * @useCase AuthenticateUser
 *
 */
routes.post('/api/auth/login', async (req, res) => {
  const controller = await buildLoginController();
  return controller.handle(req, res);
});

/**
 *
 * @author Wallysson
 * @methodo POST
 * @useCase ChangePassword
 *
 */
routes.post('/api/auth/change-password', async (req, res) => {
  const controller = await buildChangePasswordController();
  return controller.handle(req, res);
});

/**
 *
 * @author Wallysson
 * @methodo POST
 * @useCase CreateTeam
 *
 */
routes.post("/api/teams",
  authMiddleware,
  async (req, res) => {
    const controller = await buildCreateTeamController();
    return controller.handle(req, res)
  }
);

/**
 *
 * @author Wallysson
 * @methodo GET
 * @useCase GetUserTeams
 *
 */
routes.get("/api/teams", 
  authMiddleware,
  async (req, res) => {
    const controller = await buildGetUserTeamsController();
    return controller.handle(req, res);
  }
)

/**
 *
 * @author Wallysson
 * @methodo PUT
 * @useCase UpdateTeam
 *
 */

routes.put("/api/teams/:teamUUID", authMiddleware, async(req, res) => {
  const controller = await buildUpdateTeamController();
  return controller.handle(req, res);
});

/**
 *
 * @author Wallysson
 * @method GET
 * @useCase GetTeamUsers
 * 
 */

routes.get("/api/teams/:teamUUID/users", authMiddleware, async(req, res) => {
  const controller = await buildGetTeamUsersController();
  return controller.handle(req, res);
})


/**
 *
 * @author Wallysson
 * @method POST
 * @useCase LeaveTeam
 * 
 */

routes.post("/api/teams/:teamUUID/leave", authMiddleware, async(req, res) => {
  const controller = await buildLeaveTeamController();
  return controller.handle(req, res);
})

// Tasks
routes.get('/api/teams/:teamUUID/tasks', authMiddleware, async (req, res) => {
  const controller = await buildGetTeamTasksController();
  return controller.handle(req, res);
});

routes.post('/api/teams/:teamUUID/tasks', authMiddleware, async (req, res) => {
  const controller = await buildCreateTaskController();
  return controller.handle(req, res);
});

routes.put('/api/tasks/:uuid', authMiddleware, async (req, res) => {
  const controller = await buildUpdateTaskController();
  return controller.handle(req, res);
});

routes.delete('/api/tasks/:uuid', authMiddleware, async (req, res) => {
  const controller = await buildDeleteTaskController();
  return controller.handle(req, res);
});

routes.put('/api/teams/:teamUUID/tasks/reorder', authMiddleware, async (req, res) => {
  const controller = await buildReorderTasksController();
  return controller.handle(req, res);
});