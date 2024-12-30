import React from "react";

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Analytics</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md">
            7 Days
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md">
            28 Days
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md">
            12 Months
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md">
            Filter
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-200 mb-6">
        <button className="pb-2 text-sm font-medium text-purple-600 border-b-2 border-purple-600">
          Event
        </button>
        <button className="pb-2 text-sm font-medium text-gray-500">
          Link in bio
        </button>
        <button className="pb-2 text-sm font-medium text-gray-500">
          Sell products
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Section */}
        <div className="col-span-1 lg:col-span-3 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800">Stats This Period</h2>
          <p className="text-sm text-gray-500 mb-6">
            Nov 2, 2024 - Nov 29, 2024 · Worldwide
          </p>
          <div className="grid grid-cols-4 gap-4">
            {["Created events", "Completed Events", "Rescheduled events", "Cancelled events"].map(
              (stat) => (
                <div
                  key={stat}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center"
                >
                  <p className="text-2xl font-semibold text-gray-800">0</p>
                  <p className="text-sm text-gray-500">{stat}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Popular Events */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Popular Events</h2>
            <button className="text-sm text-purple-600">Set Target</button>
          </div>
          <ul className="space-y-4">
            {[
              { name: "15-minute demo", count: 839 },
              { name: "Client hand-off", count: 734 },
              { name: "Pricing plan chat", count: 564 },
              { name: "Q&A call", count: 124 },
            ].map((event) => (
              <li key={event.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{event.name}</span>
                <div className="relative flex-1 mx-4 h-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-2 bg-purple-500 rounded-full"
                    style={{ width: `${(event.count / 1000) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{event.count}</span>
              </li>
            ))}
          </ul>
          <button className="mt-4 text-sm text-purple-600">View All Content</button>
        </div>

        {/* Popular Days of the Week */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Days Of The Week</h2>
          <div className="h-40">
            {/* Bar Chart Mockup */}
            <div className="flex space-x-2 h-full items-end">
              {[
                { day: "Mon", value: 28 },
                { day: "Tue", value: 15 },
                { day: "Wed", value: 10 },
                { day: "Thu", value: 30 },
              ].map((bar) => (
                <div key={bar.day} className="text-center">
                  <div
                    className="w-8 bg-green-500 rounded"
                    style={{ height: `${bar.value * 4}px` }}
                  ></div>
                  <p className="mt-2 text-sm text-gray-600">{bar.day}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Users With The Most Events */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Users With The Most Events
          </h2>
          <ul className="space-y-4">
            {[
              { name: "John Wilson", count: 534 },
              { name: "Jennifer Reyes", count: 845 },
              { name: "Mateo Ruiz", count: 934 },
            ].map((user) => (
              <li key={user.name} className="flex items-center justify-between">
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
