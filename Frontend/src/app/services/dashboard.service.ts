import { apiClient } from './api';

export interface DashboardStats {
  totalExpenses: number;
  totalBudget?: number;
  budgetRemaining: number;
  expensesByCategory?: Array<{
    category: string;
    total: number;
  }>;
  categoryBreakdown?: Array<{
    category: string;
    spent: number;
  }>;
  recentExpenses?: Array<{
    _id: string;
    amount: number;
    category: string;
    date: string;
    description: string;
  }>;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const summary = await apiClient.get<any>('/dashboard/summary');
    const expenses = await apiClient.get<any[]>('/expenses');
    const budgets = await apiClient.get<any[]>('/budgets');
    
    // Calculate total budget
    const totalBudget = budgets.reduce((sum, b) => sum + b.allocated, 0);
    
    // Get recent expenses (last 10)
    const recentExpenses = expenses
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
    
    // Map category breakdown to expensesByCategory
    const expensesByCategory = summary.categoryBreakdown?.map((cat: any) => ({
      category: cat.category,
      total: cat.spent,
    })) || [];
    
    return {
      totalExpenses: summary.totalExpenses,
      totalBudget,
      budgetRemaining: summary.budgetRemaining,
      expensesByCategory,
      recentExpenses,
    };
  },
};
