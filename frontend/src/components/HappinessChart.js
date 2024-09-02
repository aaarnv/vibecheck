import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const HappinessChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = chartRef.current?.chartInstance;
        if (chartInstance) {
            chartInstance.destroy();
        }
    }, [data]);

    if (!data || data.length === 0) {
        return <div>No data available for Happiness chart</div>;
    }
    // Convert date strings to Date objects and format them
    const labels = data.map(mood => {
        const date = new Date(mood.createdAt);
        return date.toLocaleDateString(); // Adjust formatting as needed
    });
    
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Happiness',
                data: data.map(mood => mood.mood),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                pointBackgroundColor: 'rgb(75, 192, 192)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(75, 192, 192)'
            },
        ],
    };

    return <Line ref={chartRef} data={chartData} />;
};

export default HappinessChart;
