import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale
} from 'chart.js'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale)

const categoryColors = {
  food: 'rgba(255, 99, 132, 0.6)',
  transport: 'rgba(54, 162, 235, 0.6)',
  entertainment: 'rgba(255, 206, 86, 0.6)',
  bills: 'rgba(75, 192, 192, 0.6)',
  other: 'rgba(153, 102, 255, 0.6)'
}

const categoryBorders = {
  food: 'rgba(255, 99, 132, 1)',
  transport: 'rgba(54, 162, 235, 1)',
  entertainment: 'rgba(255, 206, 86, 1)',
  bills: 'rgba(75, 192, 192, 1)',
  other: 'rgba(153, 102, 255, 1)'
}

const ExpenseChart = ({ expenses }) => {
  // Calculate total amount for each category
  const categoryTotals = expenses.reduce((acc, expense) => {
    const amount = parseFloat(expense.amount)
    acc[expense.category] = (acc[expense.category] || 0) + amount
    return acc
  }, {})

  // Prepare chart data
  const chartData = {
    labels: Object.keys(categoryTotals).map(category => 
      category.charAt(0).toUpperCase() + category.slice(1)
    ),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: Object.keys(categoryTotals).map(
          category => categoryColors[category]
        ),
        borderColor: Object.keys(categoryTotals).map(
          category => categoryBorders[category]
        ),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.raw || 0
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: $${value.toFixed(2)} (${percentage}%)`
          }
        }
      }
    }
  }

  return (
    <div className="h-80">
      <Pie data={chartData} options={options} />
    </div>
  )
}

export default ExpenseChart 