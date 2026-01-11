import { apiClient } from './api';

export interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  userId: string;
}

export interface CreateExpenseRequest {
  amount: number;
  category: string;
  date: string;
  description: string;
}

export const expenseService = {
  async getExpenses(): Promise<Expense[]> {
    return apiClient.get<Expense[]>('/expenses');
  },

  async createExpense(data: CreateExpenseRequest): Promise<Expense> {
    return apiClient.post<Expense>('/expenses', data);
  },

  async updateExpense(id: string, data: Partial<CreateExpenseRequest>): Promise<Expense> {
    return apiClient.put<Expense>(`/expenses/${id}`, data);
  },

  async deleteExpense(id: string): Promise<void> {
    return apiClient.delete<void>(`/expenses/${id}`);
  },
};
