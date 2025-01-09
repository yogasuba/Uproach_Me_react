import React, { useState } from "react";

const AnalyticsPage = () => {
  // Initial target value and dummy data
  const [target, setTarget] = useState(1000);
  const [stats, setStats] = useState("7 Days"); // Current stats period

  const dummyData = {
    statsPeriods: {
      "7 Days": {
        startDate: "Dec 1, 2024",
        endDate: "Dec 7, 2024",
        location: "Worldwide",
        stats: [
          { title: "Created events", count: 12 },
          { title: "Completed Events", count: 8 },
          { title: "Rescheduled events", count: 3 },
          { title: "Cancelled events", count: 1 },
        ],
        popularDays: [
          { day: "Mon", value: 28 },
          { day: "Tue", value: 15 },
          { day: "Wed", value: 10 },
          { day: "Thu", value: 30 },
          { day: "Fri", value: 20 },
          { day: "Sat", value: 25 },
          { day: "Sun", value: 18 },
        ],
      },
      "28 Days": {
        startDate: "Nov 1, 2024",
        endDate: "Nov 28, 2024",
        location: "Worldwide",
        stats: [
          { title: "Created events", count: 50 },
          { title: "Completed Events", count: 40 },
          { title: "Rescheduled events", count: 10 },
          { title: "Cancelled events", count: 5 },
        ],
        popularDays: [
          { day: "Mon", value: 35 },
          { day: "Tue", value: 25 },
          { day: "Wed", value: 15 },
          { day: "Thu", value: 40 },
          { day: "Fri", value: 30 },
          { day: "Sat", value: 45 },
          { day: "Sun", value: 20 },
        ],
      },
      "12 Months": {
        startDate: "Jan 1, 2024",
        endDate: "Dec 31, 2024",
        location: "Worldwide",
        stats: [
          { title: "Created events", count: 300 },
          { title: "Completed Events", count: 250 },
          { title: "Rescheduled events", count: 30 },
          { title: "Cancelled events", count: 20 },
        ],
        popularDays: [
          { day: "Mon", value: 50 },
          { day: "Tue", value: 40 },
          { day: "Wed", value: 30 },
          { day: "Thu", value: 60 },
          { day: "Fri", value: 55 },
          { day: "Sat", value: 65 },
          { day: "Sun", value: 35 },
        ],
      },
    },
    popularEvents: [
      { name: "15-minute demo", count: 839 },
      { name: "Client hand-off", count: 734 },
      { name: "Pricing plan chat", count: 564 },
      { name: "Q&A call", count: 124 },
    ],
    usersWithMostEvents: [
      { name: "John Wilson", count: 534 },
      { name: "Jennifer Reyes", count: 845 },
      { name: "Mateo Ruiz", count: 934 },
    ],
  };

  const currentStats = dummyData.statsPeriods[stats];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-800">Analytics</h1>
        <div className="flex space-x-4">
          {["7 Days", "28 Days", "12 Months"].map((button) => (
            <button
              key={button}
              onClick={() => setStats(button)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                stats === button
                  ? "text-white bg-purple-600"
                  : "text-gray-600 bg-gray-100"
              }`}
            >
              {button}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-200 mb-6 overflow-x-auto">
        {["Event", "Link in bio", "Sell products"].map((tab, index) => (
          <button
            key={index}
            className={`pb-2 text-sm font-medium ${
              index === 0
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500"
            } whitespace-nowrap`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Stats This Period */}
        <div className="col-span-1 lg:col-span-3 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800">Stats This Period</h2>
          <p className="text-sm text-gray-500 mb-6">
            {currentStats.startDate} - {currentStats.endDate} · {currentStats.location}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {currentStats.stats.map((stat) => (
              <div
                key={stat.title}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center"
              >
                <p className="text-2xl font-semibold text-gray-800">{stat.count}</p>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
{/* Popular Events */}
<div className="bg-white p-6 rounded-lg shadow">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
    <h2 className="text-lg font-semibold text-gray-800">Popular Events</h2>
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">Set Target</span>
      <input
        type="number"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        className="w-16 h-8 text-sm text-gray-600 border border-gray-300 rounded-lg text-center"
      />
    </div>
  </div>
  <div className="flex justify-between text-gray-500 text-sm font-medium mb-2">
    <span>Event name</span>
    <span>Event</span>
  </div>
  <div className="space-y-4">
    {dummyData.popularEvents.map((event) => (
      <div
        key={event.name}
        className="relative flex items-center justify-between bg-purple-50 px-4 py-2 rounded-md"
      >
        <div
          className="absolute top-0 left-0 h-full bg-purple-200 rounded-md"
          style={{
            width: `${
              target > 0 ? Math.min((event.count / target) * 100, 100) : 0
            }%`,
          }}
        ></div>
        <span className="relative z-10 text-sm font-medium text-gray-700">
          {event.name}
        </span>
        <span className="relative z-10 text-sm font-medium text-gray-700">
          {event.count}
        </span>
      </div>
    ))}
  </div>
  <button className="mt-4 text-sm text-purple-600">View All Content</button>
</div>

        {/* Popular Days of the Week */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Popular Days Of The Week
          </h2>
          <div className="relative h-64 w-full">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between -ml-4">
              {[60, 50, 40, 30, 20, 10, 0].map((value) => (
                <p key={value} className="text-sm text-gray-500">{value}</p>
              ))}
            </div>

            {/* Horizontal scrollable container */}
            <div className="overflow-x-auto h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              <div className="flex items-end justify-start h-full space-x-4 pr-4">
                {currentStats.popularDays.map((bar) => (
                  <div key={bar.day} className="text-center min-w-[50px]">
                    {/* Bar */}
                    <div
                      className="w-8 mx-auto bg-teal-600 rounded transition-all"
                      style={{ height: `${bar.value * 2}px` }} // Adjust bar height dynamically
                    ></div>
                    {/* Day */}
                    <p className="mt-2 text-sm text-gray-600">{bar.day}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Users With The Most Events */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Users With The Most Events
          </h2>
          <ul className="space-y-4">
            {dummyData.usersWithMostEvents.map((user) => (
              <li key={user.name} className="flex justify-between">
                <span className="text-sm text-gray-600">{user.name}</span>
                <span className="text-sm text-gray-600">{user.count}</span>
              </li>
            ))}
          </ul>
          <button className="mt-4 text-sm text-purple-600">View All Content</button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
