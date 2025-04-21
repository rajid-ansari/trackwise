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
import { IndianRupee, TrendingUp, CreditCard, PieChart, Plus } from 'lucide-react';
import { Helmet } from "react-helmet"
import Navbar from '../components/Navbar';


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
  // const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const recentCategories = [...new Set(expenses.slice(0, 5).map(expense => expense.category))];

  const stats = [
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toFixed(2)}`,
      description: "Total amount spent",
      icon: IndianRupee,
    },
    // {
    //   title: "Average Expense",
    //   value: `$${averageExpense.toFixed(2)}`,
    //   description: "Average per expense",
    //   icon: TrendingUp,
    // },
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
    <>
      {/* seo--- */}
      <Helmet>
        <title>Dashboard | TrackWise</title>
        <meta name="description" content="View your expense overview and insights on TrackWise Dashboard." />

        {/* ✅ OG/Open Graph Tags */}
        <meta property="og:title" content="TrackWise - Your Smart Expense Dashboard" />
        <meta property="og:description" content="TrackWise helps you take control of your budget with a clean dashboard." />
        <meta property="og:image" content="https://ik.imagekit.io/vx7u9slhq/tr:w-1200,h-630/og-banner.png?updatedAt=1745226064855" />
        <meta name="twitter:image" content="https://ik.imagekit.io/vx7u9slhq/tr:w-1200,h-630/og-banner.png?updatedAt=1745226064855" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* dashboard content */}
      {/* <Navbar /> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 mt-2 sm:mt-3 space-y-4 sm:space-y-6 md:space-y-8 bg-gray-200 text-black"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Overview</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
              Track and manage your expenses efficiently
            </p>
          </div>
          <Button
            onClick={() => navigate('/expenses/new')}
            size="lg"
            className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/90 flex items-center justify-center rounded-lg py-2 text-white font-semibold"
          >
            <Plus className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
            Add Expense
          </Button>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
          <Card className="bg-card/50 backdrop-blur-sm border-none">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Recent Categories</CardTitle>
              <CardDescription className="text-sm">Categories from your latest expenses</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {recentCategories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-lg bg-primary/10 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-primary"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-none">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
              <CardDescription className="text-sm">Common tasks you might want to do</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 w-full sm:w-2/3 md:w-1/2 p-4 sm:p-6">
              <Button
                variant="ghost"
                className="w-full flex items-center py-2 sm:py-3 rounded-lg text-white font-semibold"
                onClick={() => navigate('/expenses')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                View All Expenses
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard; 