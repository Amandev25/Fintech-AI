// Mock data for the finance dashboard

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface Budget {
  category: string;
  allocated: number;
  spent: number;
  icon: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export const expenses: Expense[] = [
  {
    id: '1',
    amount: 45.50,
    category: 'Food',
    date: '2026-01-02',
    description: 'Grocery shopping'
  },
  {
    id: '2',
    amount: 120.00,
    category: 'Transportation',
    date: '2026-01-01',
    description: 'Monthly bus pass'
  },
  {
    id: '3',
    amount: 25.99,
    category: 'Entertainment',
    date: '2025-12-30',
    description: 'Movie tickets'
  },
  {
    id: '4',
    amount: 89.99,
    category: 'Shopping',
    date: '2025-12-28',
    description: 'New shoes'
  },
  {
    id: '5',
    amount: 15.50,
    category: 'Food',
    date: '2025-12-27',
    description: 'Lunch with friends'
  },
  {
    id: '6',
    amount: 200.00,
    category: 'Bills',
    date: '2025-12-25',
    description: 'Internet and utilities'
  },
];

export const budgets: Budget[] = [
  {
    category: 'Food',
    allocated: 400,
    spent: 285,
    icon: 'utensils'
  },
  {
    category: 'Transportation',
    allocated: 200,
    spent: 120,
    icon: 'bus'
  },
  {
    category: 'Entertainment',
    allocated: 150,
    spent: 85,
    icon: 'film'
  },
  {
    category: 'Shopping',
    allocated: 300,
    spent: 210,
    icon: 'shopping-bag'
  },
  {
    category: 'Bills',
    allocated: 500,
    spent: 450,
    icon: 'file-text'
  },
  {
    category: 'Others',
    allocated: 150,
    spent: 60,
    icon: 'more-horizontal'
  },
];

export const monthlyExpenses = [
  { month: 'Jul', amount: 1450 },
  { month: 'Aug', amount: 1680 },
  { month: 'Sep', amount: 1520 },
  { month: 'Oct', amount: 1890 },
  { month: 'Nov', amount: 1420 },
  { month: 'Dec', amount: 1650 },
];

export const categoryExpenses = [
  { name: 'Food', value: 285, color: '#10b981' },
  { name: 'Transportation', value: 120, color: '#3b82f6' },
  { name: 'Entertainment', value: 85, color: '#8b5cf6' },
  { name: 'Shopping', value: 210, color: '#f59e0b' },
  { name: 'Bills', value: 450, color: '#ef4444' },
  { name: 'Others', value: 60, color: '#6b7280' },
];

export const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hi! I\'m your AI finance assistant. How can I help you manage your finances today?',
    sender: 'ai',
    timestamp: new Date().toISOString()
  }
];

export const aiResponses: Record<string, string> = {
  'budget': 'Based on your spending patterns, I recommend allocating 30% to essentials, 20% to savings, and 50% to discretionary spending. Would you like me to create a detailed budget plan?',
  'save': 'Great question! To boost your savings, try the 50/30/20 rule: 50% needs, 30% wants, 20% savings. You\'re currently saving about $250/month. Increasing that by just $50 could add $600 to your annual savings!',
  'spending': 'Your top spending categories this month are: Bills ($450), Food ($285), and Shopping ($210). Bills are the highest, representing 37% of your total expenses. Would you like tips on reducing any category?',
  'food': 'You\'ve spent $285 on food this month, which is within your $400 budget. That\'s great! Meal planning and cooking at home can help you save even more.',
  'default': 'I can help you with budgeting, expense tracking, savings goals, and financial advice. Try asking me about your spending, how to save more, or creating a budget!'
};
