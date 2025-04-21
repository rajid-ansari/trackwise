import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ExpenseForm from '../components/molecules/ExpenseForm';
import { useExpenses } from '../hooks/useExpenses';

const NewExpense = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpenses();

  const handleSubmit = async (expenseData) => {
    try {
      await addExpense(expenseData);
      navigate('/dashboard');
    } catch (error) {
      throw new Error('Failed to add expense: ' + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container max-w-2xl mx-auto py-8 px-4 bg-gray-700 mt-7 rounded-lg"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Add New Expense</h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to add a new expense
        </p>
      </div>

      <ExpenseForm onSubmit={handleSubmit} />
    </motion.div>
  );
};

export default NewExpense; 