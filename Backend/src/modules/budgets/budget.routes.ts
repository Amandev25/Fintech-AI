import { Router } from "express";
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "./budget.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

export const budgetRouter = Router();

budgetRouter.get("/", requireAuth, getBudgets);
budgetRouter.post("/", requireAuth, createBudget);
budgetRouter.put("/:category", requireAuth, updateBudget);
budgetRouter.delete("/:category", requireAuth, deleteBudget);


