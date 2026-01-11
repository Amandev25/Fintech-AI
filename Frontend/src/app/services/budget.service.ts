import { apiClient } from './api';

export interface Budget {
  _id: string;
  category: string;
  allocated: number;
  spent?: number; // Calculated on frontend
  userId: string;
}

export interface CreateBudgetRequest {
  category: string;
  allocated: number;
}

export const budgetService = {
  async getBudgets(): Promise<Budget[]> {
    const budgets = await apiClient.get<Budget[]>('/budgets');
    // Get expenses to calculate spent amounts
    const expenses = await apiClient.get<any[]>('/expenses');
    
    // Calculate spent for each budget
    return budgets.map(budget => {
      const spent = expenses
        .filter(exp => exp.category === budget.category)
        .reduce((sum, exp) => sum + exp.amount, 0);
      return { ...budget, spent };
    });
  },

  async createBudget(data: CreateBudgetRequest): Promise<Budget> {
    const budget = await apiClient.post<Budget>('/budgets', data);
    return { ...budget, spent: 0 };
  },

  async updateBudget(category: string, data: Partial<CreateBudgetRequest>): Promise<Budget> {
    const budget = await apiClient.put<Budget>(`/budgets/${category}`, data);
    // Get expenses to calculate spent
    const expenses = await apiClient.get<any[]>('/expenses');
    const spent = expenses
      .filter(exp => exp.category === category)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return { ...budget, spent };
  },

  async deleteBudget(category: string): Promise<void> {
    await apiClient.delete<void>(`/budgets/${category}`);
  },
};
