import React, { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueCard = () => {
  const [revenue, setRevenue] = useState(0);
  const [selectedView, setSelectedView] = useState("Month"); // Default to "Month"
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call delay

        if (selectedView === "Day") {
          // Generate data for the current month (e.g., 30 days for simplicity)
          const dayWiseData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
          setChartData(dayWiseData);
          setRevenue(dayWiseData.reduce((sum, val) => sum + val, 0)); // Total revenue for "Day" view
        } else if (selectedView === "Month") {
          // Generate data for the entire year (12 months)
          const monthWiseData = [27, 25, 26, 29, 28, 27, 30, 29, 28, 31, 30, 32];
          setChartData(monthWiseData);
          setRevenue(monthWiseData.reduce((sum, val) => sum + val, 0)); // Total revenue for "Month" view
        }

        setError(null);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedView]);

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };

  const labels = {
    Day: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), // Labels for "Day" view
    Month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Labels for "Month" view
  };

  const barChartData = {
    labels: labels[selectedView],
    datasets: [
      {
        label: "Revenue",
        data: chartData,
        backgroundColor: "#1B7B72",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
        },
        ticks: {
          padding: 10, // Add padding between x-axis labels and the chart
        },
      },
      y: {
        grid: {
          drawBorder: false, // Remove border line
          color: "#e2e8f0", // Light gray horizontal lines
          lineWidth: 1,
        },
        ticks: {
          stepSize: 10, // Adjust this based on your data range
          padding: 15, // Increase padding between horizontal lines
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
    barThickness: 27, // Shorten the bar width
  };

  return (
    <div className="relative">
      <h3 className="text-lg font-semibold">Revenue</h3>

      {/* Dropdown for Day/Month */}
      <div className="absolute top-4 right-4">
        <select
          value={selectedView}
          onChange={handleViewChange}
          className="appearance-none border border-gray-300 rounded-[70px] px-4 py-2 text-sm pr-8 bg-white focus:outline-none"
        >
          <option value="Day">Day</option>
          <option value="Month">Month</option>
        </select>
        <img
          src="/icons/chevron-down.svg"
          alt="Dropdown Arrow"
          className="w-[20px] h-[20px] absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
        />
      </div>

      <p className="text-2xl font-bold">${revenue.toFixed(2)}</p>

      {/* Chart Section */}
      <div
        className="bg-muted mt-4 rounded h-[330px] w-full overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-gray-200"
      >
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : chartData && chartData.length ? (
          <div className="min-w-[1200px] h-[265px] mt-[20px]">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No data available</p>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-rounded {
          scrollbar-color: #94a3b8 #e2e8f0;
        }
        ::-webkit-scrollbar {
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background-color: #e2e8f0;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #94a3b8;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default RevenueCard;
