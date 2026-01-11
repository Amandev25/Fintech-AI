import { Router } from "express";
import { getSummary } from "./dashboard.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", requireAuth, getSummary);


