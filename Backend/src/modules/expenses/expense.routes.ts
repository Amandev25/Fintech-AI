import { Router } from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "./expense.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

export const expenseRouter = Router();

expenseRouter.post("/", requireAuth, createExpense);
expenseRouter.get("/", requireAuth, getExpenses);
expenseRouter.put("/:id", requireAuth, updateExpense);
expenseRouter.delete("/:id", requireAuth, deleteExpense);


