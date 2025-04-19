import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const ExpenseChart = ({ type = "bar", data, options }) => {
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Expense Overview",
            },
        },
        ...options,
    };

    const renderChart = () => {
        switch (type) {
            case "bar":
                return <Bar data={data} options={chartOptions} />;
            case "pie":
                return <Pie data={data} options={chartOptions} />;
            case "line":
                return <Line data={data} options={chartOptions} />;
            default:
                return <Bar data={data} options={chartOptions} />;
        }
    };

    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow">
            {renderChart()}
        </div>
    );
};

export default ExpenseChart;
