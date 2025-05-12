import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import axiosInstance from '../axiosConfig';

// Register necessary components for Bar Chart
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Trends = () => {
  const [spendingData, setSpendingData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSpendingData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axiosInstance.get(`/api/${userId}/expense/trends`);
        const monthlySpending = response.data;

        if (monthlySpending && monthlySpending.length > 0) {
          const labels = monthlySpending.map((entry) => `Month ${entry.month}`);
          const categories = Object.keys(monthlySpending[0].categorySpending);

          const brightColors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
            '#00C49F', '#FF6F91', '#845EC2', '#2C73D2', '#0081CF', '#FFC75F',
          ];

          const datasets = categories.map((category, index) => ({
            label: `${category} Spending ($)`,
            data: monthlySpending.map((entry) => entry.categorySpending[category]),
            backgroundColor: brightColors[index % brightColors.length],
            borderRadius: 5,
          }));

          setSpendingData({
            labels,
            datasets,
          });

          generateSuggestions(monthlySpending);
        }
      } catch (error) {
        console.error('Error fetching spending data:', error);
      }
    };

    fetchSpendingData();
  }, []);

  const generateSuggestions = (spendingData) => {
    const newSuggestions = [];

    spendingData.forEach((monthData, index) => {
      if (index > 0) {
        const previousMonthData = spendingData[index - 1];
        const currentMonth = `Month ${monthData.month}`;

        Object.keys(monthData.categorySpending).forEach((category) => {
          const currentSpent = monthData.categorySpending[category];
          const previousSpent = previousMonthData.categorySpending[category] || 0;

          if (currentSpent > previousSpent) {
            newSuggestions.push(
              `You spent more on ${category} in ${currentMonth} compared to Month ${previousMonthData.month}. Consider cutting down in this category.`
            );
          }
        });
      }
    });

    setSuggestions(newSuggestions);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Trends</h2>

      {/* Spending Comparison Chart */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Monthly Spending Comparison by Category</h3>
        {spendingData ? (
          <Bar data={spendingData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }} />
        ) : (
          <p>Loading data...</p>
        )}
      </div>

      {/* Cost Reduction Suggestions */}
      <div>
        <h3>Cost Reduction Suggestions</h3>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p>No significant suggestions at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Trends;
