import React from 'react';
import { Line } from 'react-chartjs-2';

const HappinessChart = ({ data }) => {
    if (!data || data.length === 0) {
        // Handle case where data is empty or undefined
        return <div>No data available for Happiness chart</div>;
    }
    const chartData = {
        labels: data.map(mood => new Date(mood.date).toLocaleDateString()),
        datasets: [
        {
            label: 'Happiness',
            data: data.map(mood => mood.mood),
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
        },
        ],
    };

    return <Line data={chartData} />;
};

export default HappinessChart;
