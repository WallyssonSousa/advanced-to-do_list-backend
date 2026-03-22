import { Router } from "express";

export const routes = Router();

routes.get('/api/health', (req, res) => {
    res.json({status: 'ok'});
});

