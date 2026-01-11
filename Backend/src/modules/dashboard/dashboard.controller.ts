import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { Expense } from "../../models/expense.model";
import { Budget } from "../../models/budget.model";

export const getSummary = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const expenses = await Expense.find({ userId });
    const budgets = await Budget.find({ userId });

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    const totalBudgetAllocated = budgets.reduce(
      (sum, b) => sum + b.allocated,
      0
    );

    const budgetRemaining = totalBudgetAllocated - totalExpenses;

    const categoryMap: Record<
      string,
      { category: string; spent: number }
    > = {};
    for (const e of expenses) {
      if (!categoryMap[e.category]) {
        categoryMap[e.category] = { category: e.category, spent: 0 };
      }
      categoryMap[e.category].spent += e.amount;
    }

    const categoryBreakdown = Object.values(categoryMap);

    res.json({
      totalExpenses,
      budgetRemaining,
      monthlyTrends: [], // can be filled with more advanced aggregation later
      categoryBreakdown,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get dashboard summary" });
  }
};


