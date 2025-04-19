import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../hooks/useExpenses';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { DollarSign, TrendingUp, CreditCard, PieChart, Plus } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, description }) => (
  <Card className="bg-card/50 backdrop-blur-sm border-none">
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { expenses } = useExpenses();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const recentCategories = [...new Set(expenses.slice(0, 5).map(expense => expense.category))];

  const stats = [
    {
      title: "Total Expenses",
      value: `$${totalExpenses.toFixed(2)}`,
      description: "Total amount spent",
      icon: DollarSign,
    },
    {
      title: "Average Expense",
      value: `$${averageExpense.toFixed(2)}`,
      description: "Average per expense",
      icon: TrendingUp,
    },
    {
      title: "Transactions",
      value: expenses.length,
      description: "Number of expenses",
      icon: CreditCard,
    },
    {
      title: "Categories",
      value: recentCategories.length,
      description: "Different categories",
      icon: PieChart,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container max-w-6xl mx-auto py-8 px-4 space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your expenses efficiently
          </p>
        </div>
        <Button
          onClick={() => navigate('/expenses/new')}
          size="lg"
          className="bg-gradient-to-r from-primary to-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur-sm border-none">
          <CardHeader>
            <CardTitle>Recent Categories</CardTitle>
            <CardDescription>Categories from your latest expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recentCategories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {category}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-none">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-primary/10 hover:text-primary"
              onClick={() => navigate('/expenses')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              View All Expenses
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-primary/10 hover:text-primary"
              onClick={() => navigate('/categories')}
            >
              <PieChart className="mr-2 h-4 w-4" />
              Manage Categories
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Dashboard; 