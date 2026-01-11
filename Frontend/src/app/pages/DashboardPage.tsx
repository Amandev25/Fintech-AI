import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { DollarSign, PiggyBank, CreditCard, Lightbulb, Loader2 } from 'lucide-react';
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { dashboardService } from '../services/dashboard.service';
import { toast } from 'sonner';

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const categoryExpenses = stats?.expensesByCategory?.map((cat: any) => ({
    name: cat.category,
    value: cat.total,
    color: getCategoryColor(cat.category),
  })) || [];

  const statCards = [
    {
      title: 'Total Expenses',
      value: `$${stats?.totalExpenses?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
    },
    {
      title: 'Budget Remaining',
      value: `$${stats?.budgetRemaining?.toFixed(2) || '0.00'}`,
      icon: CreditCard,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950',
    },
    {
      title: 'Total Budget',
      value: `$${stats?.totalBudget?.toFixed(2) || '0.00'}`,
      icon: PiggyBank,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your financial overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h2 className="mt-2">{stat.value}</h2>
                  </div>
                  <div className={`h-12 w-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentExpenses?.slice(0, 5).map((expense: any) => (
                <div key={expense._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.category}</p>
                  </div>
                  <p className="font-semibold">${expense.amount.toFixed(2)}</p>
                </div>
              ))}
              {(!stats?.recentExpenses || stats.recentExpenses.length === 0) && (
                <p className="text-muted-foreground text-center py-8">No expenses yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Category Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Distribution of expenses</CardDescription>
          </CardHeader>
          <CardContent>
            {categoryExpenses.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryExpenses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryExpenses.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-center py-8">No expense data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Insight Card */}
      <Card className="border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-emerald-900 dark:text-emerald-100">AI Financial Insight</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-emerald-900 dark:text-emerald-100">
            {stats?.budgetRemaining && stats.budgetRemaining > 0 
              ? `Great job! You have $${stats.budgetRemaining.toFixed(2)} remaining in your budget. Keep tracking your expenses to stay on target.`
              : 'Start by adding your expenses and setting up budgets to get personalized insights.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Food': '#10b981',
    'Transportation': '#3b82f6',
    'Entertainment': '#8b5cf6',
    'Shopping': '#f59e0b',
    'Bills': '#ef4444',
    'Others': '#6b7280',
  };
  return colors[category] || '#6b7280';
}
