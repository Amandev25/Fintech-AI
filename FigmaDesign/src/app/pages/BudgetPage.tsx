import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Utensils, Bus, Film, ShoppingBag, FileText, MoreHorizontal, Lightbulb, TrendingUp } from 'lucide-react';
import { budgets } from '../data/mockData';

export function BudgetPage() {
  const iconMap: Record<string, any> = {
    'utensils': Utensils,
    'bus': Bus,
    'film': Film,
    'shopping-bag': ShoppingBag,
    'file-text': FileText,
    'more-horizontal': MoreHorizontal,
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const overallPercentage = (totalSpent / totalBudget) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1>Budget</h1>
        <p className="text-muted-foreground">
          Track your spending against your budget goals
        </p>
      </div>

      {/* Overall Budget Card */}
      <Card className="border-2 border-emerald-200 dark:border-emerald-800">
        <CardHeader>
          <CardTitle>Monthly Budget Overview</CardTitle>
          <CardDescription>January 2026</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <h2 className="text-emerald-600">${totalSpent}</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <h2>${totalBudget}</h2>
            </div>
          </div>
          <Progress value={overallPercentage} className="h-3" />
          <p className="text-sm text-muted-foreground">
            {overallPercentage.toFixed(1)}% of your budget used • ${totalBudget - totalSpent} remaining
          </p>
        </CardContent>
      </Card>

      {/* AI Suggested Budget */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-blue-900 dark:text-blue-100">AI Budget Recommendation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-blue-900 dark:text-blue-100 mb-4">
            Based on your spending patterns, here's an optimized budget allocation:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Essentials</p>
              <p className="text-blue-600">50%</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Savings</p>
              <p className="text-emerald-600">20%</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Personal</p>
              <p className="text-purple-600">30%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Budgets */}
      <div className="grid gap-4 md:grid-cols-2">
        {budgets.map((budget) => {
          const Icon = iconMap[budget.icon] || MoreHorizontal;
          const percentage = (budget.spent / budget.allocated) * 100;
          const remaining = budget.allocated - budget.spent;
          const isOverBudget = percentage > 100;
          const isNearLimit = percentage > 80 && percentage <= 100;

          return (
            <Card key={budget.category} className={isOverBudget ? 'border-red-200 dark:border-red-800' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      isOverBudget 
                        ? 'bg-red-100 dark:bg-red-950' 
                        : isNearLimit 
                        ? 'bg-amber-100 dark:bg-amber-950'
                        : 'bg-emerald-100 dark:bg-emerald-950'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        isOverBudget 
                          ? 'text-red-600' 
                          : isNearLimit 
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`} />
                    </div>
                    <div>
                      <CardTitle>{budget.category}</CardTitle>
                      <CardDescription>
                        ${budget.spent} / ${budget.allocated}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`${
                      isOverBudget 
                        ? 'text-red-600' 
                        : isNearLimit 
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}>
                      {percentage.toFixed(0)}%
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className={`h-2 ${isOverBudget ? '[&>div]:bg-red-600' : isNearLimit ? '[&>div]:bg-amber-600' : ''}`}
                />
                <div className="flex items-center justify-between text-sm">
                  {isOverBudget ? (
                    <p className="text-red-600">Over budget by ${Math.abs(remaining).toFixed(2)}</p>
                  ) : (
                    <p className="text-muted-foreground">${remaining.toFixed(2)} remaining</p>
                  )}
                  {isNearLimit && !isOverBudget && (
                    <p className="text-amber-600">Near limit!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
