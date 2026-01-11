import { Router } from "express";
import { chatWithAi, getAiInsights } from "./ai.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

export const aiRouter = Router();

aiRouter.post("/chat", requireAuth, chatWithAi);
aiRouter.get("/insights", requireAuth, getAiInsights);


