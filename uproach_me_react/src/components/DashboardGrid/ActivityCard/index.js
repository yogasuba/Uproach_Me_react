import React, { useState, useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler, // Important for wavy filled graphs
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler, // Register the Filler plugin
  Title,
  Tooltip
);

const ActivityCard = () => {
  const [views, setViews] = useState([]);
  const [clicks, setClicks] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('1 Week');

  const chartRef = useRef(null); // To access the chart instance for gradients

  useEffect(() => {
    // Initialize with 1 Week data by default
    updateData('1 Week');
  }, []);

  const updateData = (period) => {
    if (period === '1 Week') {
      const today = new Date();
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // Format as "Nov 13"
      }).reverse();
      setLabels(last7Days);
      setViews(last7Days.map(() => Math.floor(Math.random() * 10))); // Mock data for testing
      setClicks(last7Days.map(() => Math.floor(Math.random() * 10))); // Mock data for testing
    } else if (period === '30 Days') {
      // Get the last Sunday from today
      const today = new Date();
      const lastSunday = new Date(today);
      lastSunday.setDate(today.getDate() - today.getDay()); // Adjust to the most recent Sunday
  
      // Generate Sundays for the past 30 days
      const sundays = [];
      for (let i = 0; i < 30; i += 7) {
        const sunday = new Date(lastSunday);
        sunday.setDate(lastSunday.getDate() - i);
        sundays.unshift(sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })); // Format as "Oct 27"
      }
  
      setLabels(sundays); // Only Sundays are displayed
      setViews(sundays.map(() => Math.floor(Math.random() * 100))); // Mock data
      setClicks(sundays.map(() => Math.floor(Math.random() * 100))); // Mock data
    }
  };

  const handlePeriodChange = (event) => {
    const period = event.target.value;
    setSelectedPeriod(period);
    updateData(period);
  };

  const getGradient = (ctx, color1, color2) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Views',
        data: views,
        tension: 0.4, // Smooth curves
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx; // Access canvas context
          return getGradient(ctx, 'rgba(0, 153, 255, 0.5)', 'rgba(0, 153, 255, 0)'); // Blue gradient
        },
        borderColor: '#007bff', // Line color
        pointBackgroundColor: '#007bff', // Point color
        borderWidth: 1,
      },
      {
        label: 'Clicks',
        data: clicks,
        tension: 0.4, // Smooth curves
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx; // Access canvas context
          return getGradient(ctx, 'rgba(97, 57, 255, 0.5)', 'rgba(97, 57, 255, 0)'); // Purple gradient
        },
        borderColor: '#9966ff', // Line color
        pointBackgroundColor: '#9966ff', // Point color
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e5e5', // Horizontal grid lines color
          drawBorder: false, // Removes the left vertical line
        },
        ticks: {
          stepSize: 25, // Adjusts spacing between horizontal grid lines
          color: '#9ca3af', // Tick label color
          font: {
            size: 12, // Tick font size
          },
        },
      },
      x: {
        grid: {
          display: false, // Removes vertical grid lines
        },
        ticks: {
          color: '#9ca3af', // Tick label color
          font: {
            size: 12, // Tick font size
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Disable legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
    elements: {
      line: {
        borderWidth: 2, // Line thickness
      },
      point: {
        radius: 2, // Point size
      },
    },
  };

  return (
    <div>
      {/* Header: Title and Dropdown */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Activity</h3>
        <div className="relative">
          <select
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="appearance-none border border-gray-300 rounded-[70px] px-4 py-2 text-sm pr-8 bg-white focus:outline-none"
          >
            <option value="1 Week">1 Week</option>
            <option value="30 Days">30 Days</option>
          </select>
          <img
            src="/icons/chevron-down.svg" // Update this path to your arrow image
            alt="Dropdown Arrow"
            className="w-[20px] h-[20px] absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 flex items-start justify-start space-x-8">
        <div className="text-left">
          <p className="text-gray-500 text-sm">Overall Views</p>
          <span className="font-bold text-blue-500 text-3xl">{views.reduce((a, b) => a + b, 0)}</span>
        </div>
        <div className="text-left">
          <p className="text-gray-500 text-sm">Overall Clicks</p>
          <span className="font-bold text-purple-500 text-3xl">{clicks.reduce((a, b) => a + b, 0)}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-muted mt-4 rounded h-[250px]">
        <Line ref={chartRef} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ActivityCard;
