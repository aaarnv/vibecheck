import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmotionFrequencyChart = ({ data }) => {
    if (!data || data.length === 0) {
        // Handle case where data is empty or undefined
        return <div>No data available for Emotion Frequency chart</div>;
    }

    // Count the frequency of each additional vibe
    const emotionCounts = data.reduce((acc, mood) => {
        mood.additionalVibes.forEach(vibe => {
            acc[vibe.emotion] = (acc[vibe.emotion] || 0) + 1; // Increment count for each emotion
        });
        return acc;
    }, {});

    // Prepare the chart data
    const chartData = {
        labels: Object.keys(emotionCounts), // Emotion labels
        datasets: [
            {
                label: 'Frequency',
                data: Object.values(emotionCounts), // Corresponding counts
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options to handle the appearance and functionality
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw}`, // Customize tooltip label
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Emotion', // Label for x-axis
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 90, // Rotate x-axis labels if needed
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Frequency', // Label for y-axis
                },
                beginAtZero: true, // Start y-axis from zero
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '400px' }}> {/* Adjust size as needed */}
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default EmotionFrequencyChart;
