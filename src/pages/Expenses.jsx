import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useExpenses } from '../hooks/useExpenses';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ExpensesPage = () => {
  const { expenses, loading, error } = useExpenses();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredExpenses = expenses.filter(expense =>
    expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return format(date, 'MMM dd, yyyy');
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: 'bg-green-100 text-green-800',
      transport: 'bg-blue-100 text-blue-800',
      entertainment: 'bg-purple-100 text-purple-800',
      bills: 'bg-red-100 text-red-800',
      shopping: 'bg-yellow-100 text-yellow-800',
      health: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.other;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto py-4 sm:py-8 px-2 sm:px-4 bg-gray-700 mt-3 rounded-lg"
    >
      <Card className="mb-4 sm:mb-8">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold">Your Expenses</CardTitle>
          <CardDescription>
            Track and manage all your expenses in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <Input
              type="search"
              placeholder="Search expenses..."
              className="w-full sm:max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
            onClick={() => navigate("/expenses/new")}
            className="w-full sm:w-auto py-2 rounded-lg flex items-center justify-center gap-2">
              <Plus /> Add New Expense
            </Button>
          </div>

          <div className="rounded-lg border bg-card overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Date</TableHead>
                  <TableHead className="whitespace-nowrap">Description</TableHead>
                  <TableHead className="whitespace-nowrap">Category</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(expense.createdAt)}</TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{expense.description}</TableCell>
                    <TableCell>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      ${expense.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExpensesPage; 