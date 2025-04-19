import React from 'react'
import Button from '../atoms/Button'

const ExpenseItem = ({ expense, onDelete }) => {
  const handleDelete = () => {
    onDelete(expense.id)
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{expense.description}</h3>
        <p className="text-sm text-gray-500 capitalize">{expense.category}</p>
      </div>
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-gray-900">
          ${parseFloat(expense.amount).toFixed(2)}
        </span>
        <Button
          variant="danger"
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform hover:scale-105"
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default ExpenseItem 