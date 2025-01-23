import React from "react";

const AvailabilityPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Bookings"
          value="120"
          comparison="Compared To Previous 7 Days"
          icon="📅"
        />
        <StatCard
          title="Reschedules"
          value="120"
          comparison="Compared To Previous 7 Days"
          icon="🔁"
        />
        <StatCard
          title="Cancellation"
          value="120"
          comparison="Compared To Previous 7 Days"
          icon="❌"
        />
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <CalendarHeader />
        <CalendarGrid />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, comparison, icon }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
      <div className="text-4xl">{icon}</div>
      <div>
        <h3 className="text-gray-700 font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-gray-500 text-sm">{comparison}</p>
      </div>
    </div>
  );
};

const CalendarHeader = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-gray-700 font-bold text-xl">Availability</div>
      <button className="bg-gray-100 text-gray-600 rounded px-3 py-1 text-sm">
        Week
      </button>
    </div>
  );
};

const CalendarGrid = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div>
      {/* Weekdays Header */}
      <div className="grid grid-cols-8 text-center text-sm text-gray-600 font-medium">
        <div className="col-span-1"></div>
        {days.map((day, index) => (
          <div key={index} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-8 border-t">
        {/* Time Column */}
        <div className="col-span-1 border-r">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="py-4 text-sm text-gray-500 text-center">
              {9 + index}:00 AM
            </div>
          ))}
        </div>

        {/* Event Columns */}
        <div className="col-span-7 grid grid-cols-7 gap-4">
          {/* Events */}
          <div className="relative">
            <div className="absolute top-[20%] left-0 bg-blue-100 border-l-4 border-blue-500 text-blue-600 text-sm px-2 py-1 rounded">
              Resume Review
              <span className="block text-xs text-gray-500">8:00 - 16:00</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-[30%] left-0 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-600 text-sm px-2 py-1 rounded">
              Full day
              <span className="block text-xs text-gray-500">8:00 - 16:00</span>
            </div>
          </div>
          {/* Add Empty Days */}
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage;
