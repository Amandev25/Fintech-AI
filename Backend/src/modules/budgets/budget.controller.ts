import { Response } from "express";
import { Budget } from "../../models/budget.model";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const getBudgets = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const budgets = await Budget.find({ userId });
    res.json(budgets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch budgets" });
  }
};

export const createBudget = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { category, allocated } = req.body;
    const budget = await Budget.create({ userId, category, allocated });

    res.status(201).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create budget" });
  }
};

export const updateBudget = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { category } = req.params;
    const { allocated } = req.body;

    const budget = await Budget.findOneAndUpdate(
      { userId, category },
      { allocated },
      { new: true, upsert: true }
    );

    res.json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update budget" });
  }
};

export const deleteBudget = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { category } = req.params;

    await Budget.findOneAndDelete({ userId, category });

    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete budget" });
  }
};


