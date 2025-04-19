import React from 'react'
import ExpenseChart from '../atoms/ExpenseChart'

const ExpenseAnalytics = () => {
  // Example data - replace with your actual expense data
  const barChartData = {
    labels: ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping'],
    datasets: [
      {
        label: 'Expenses by Category',
        data: [300, 150, 200, 400, 250],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const pieChartData = {
    labels: ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping'],
    datasets: [
      {
        data: [300, 150, 200, 400, 250],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="h-80">
        <ExpenseChart
          type="bar"
          data={barChartData}
          options={{
            plugins: {
              title: {
                text: 'Monthly Expenses by Category',
              },
            },
          }}
        />
      </div>
      <div className="h-80">
        <ExpenseChart
          type="pie"
          data={pieChartData}
          options={{
            plugins: {
              title: {
                text: 'Expense Distribution',
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default ExpenseAnalytics 