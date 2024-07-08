import React from 'react';
import { Bar } from 'react-chartjs-2';

const EmotionFrequencyChart = ({ data }) => {
    if (!data || data.length === 0) {
        // Handle case where data is empty or undefined
        return <div>No data available for Emotion Frequency chart</div>;
    }
    const emotionCounts = data.reduce((acc, mood) => {
        mood.additionalVibes.forEach(vibe => {
        acc[vibe.emotion] = (acc[vibe.emotion] || 0) + 1;
        });
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(emotionCounts),
        datasets: [
        {
            label: 'Frequency',
            data: Object.values(emotionCounts),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        ],
    };

    return <Bar data={chartData} />;
};

export default EmotionFrequencyChart;
