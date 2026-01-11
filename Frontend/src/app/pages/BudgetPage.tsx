import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Utensils, Bus, Film, ShoppingBag, FileText, MoreHorizontal, TrendingUp, Plus, Loader2, Trash2 } from 'lucide-react';
import { budgetService, type Budget } from '../services/budget.service';
import { toast } from 'sonner';

export function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formCategory, setFormCategory] = useState<string>('');

  const iconMap: Record<string, any> = {
    'Food': Utensils,
    'Transportation': Bus,
    'Entertainment': Film,
    'Shopping': ShoppingBag,
    'Bills': FileText,
    'Others': MoreHorizontal,
  };

  const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Others'];

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    try {
      const data = await budgetService.getBudgets();
      setBudgets(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load budgets');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBudget = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const newBudget = await budgetService.createBudget({
        category: formCategory,
        allocated: parseFloat(formData.get('allocated') as string),
      });
      
      setBudgets([...budgets, newBudget]);
      setIsDialogOpen(false);
      setFormCategory('');
      e.currentTarget.reset();
      toast.success('Budget added successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to add budget');
    }
  };

  const handleDeleteBudget = async (category: string) => {
    try {
      await budgetService.deleteBudget(category);
      setBudgets(budgets.filter(b => b.category !== category));
      toast.success('Budget deleted successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete budget');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const overallPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Budget</h1>
          <p className="text-muted-foreground">
            Track your spending against your budget goals
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Budget</DialogTitle>
              <DialogDescription>Set a budget for a category</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddBudget} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formCategory} onValueChange={setFormCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allocated">Budget Amount</Label>
                <Input
                  id="allocated"
                  name="allocated"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>

              <Button type="submit" className="w-full">Add Budget</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overall Budget Card */}
      <Card className="border-2 border-emerald-200 dark:border-emerald-800">
        <CardHeader>
          <CardTitle>Monthly Budget Overview</CardTitle>
          <CardDescription>Current period</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <h2 className="text-emerald-600">${totalSpent.toFixed(2)}</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <h2>${totalBudget.toFixed(2)}</h2>
            </div>
          </div>
          <Progress value={overallPercentage} className="h-3" />
          <p className="text-sm text-muted-foreground">
            {overallPercentage.toFixed(1)}% of your budget used • ${(totalBudget - totalSpent).toFixed(2)} remaining
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
      {budgets.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No budgets set. Add your first budget to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {budgets.map((budget) => {
            const Icon = iconMap[budget.category] || MoreHorizontal;
            const spent = budget.spent || 0;
            const percentage = budget.allocated > 0 ? (spent / budget.allocated) * 100 : 0;
            const remaining = budget.allocated - spent;
            const isOverBudget = percentage > 100;
            const isNearLimit = percentage > 80 && percentage <= 100;

            return (
              <Card key={budget._id} className={isOverBudget ? 'border-red-200 dark:border-red-800' : ''}>
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
                          ${spent.toFixed(2)} / ${budget.allocated.toFixed(2)}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className={`${
                        isOverBudget 
                          ? 'text-red-600' 
                          : isNearLimit 
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}>
                        {percentage.toFixed(0)}%
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBudget(budget.category)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
      )}
    </div>
  );
}
