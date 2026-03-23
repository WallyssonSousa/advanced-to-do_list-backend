import { Router } from "express";
import { buildChangePasswordController, buildCreateUserController, buildLoginController } from "@/container";

export const routes = Router();

routes.get('/api/health', (req, res) => {
    res.json({status: 'ok'});
});

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