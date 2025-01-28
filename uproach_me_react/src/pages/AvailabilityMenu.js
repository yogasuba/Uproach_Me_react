import React from "react";
import Calendar from "../components/Availability/Calendar";
import { IMAGES} from '../constants';
const AvailabilityPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">Availability</h1>
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Bookings"
          value="120"
          comparison="Compared To Previous 7 Days"
          src={IMAGES.CALENDAR_TICK}
        />
        <StatCard
          title="Reschedules"
          value="120"
          comparison="Compared To Previous 7 Days"
          src={IMAGES.RE_30}
        />
        <StatCard
          title="Cancellation"
          value="120"
          comparison="Compared To Previous 7 Days"
          src={IMAGES.CANCEL_SYMBOL}
        />
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <Calendar/>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, comparison, src, alt }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
      <div>
        <h3 className="text-gray-700 font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-gray-500 text-sm">{comparison}</p>
      </div>
      <img src={src} alt={alt} className="w-12 h-12 object-contain" />
    </div>
  );
};


export default AvailabilityPage;
