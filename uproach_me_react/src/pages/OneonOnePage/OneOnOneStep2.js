import React, { useState } from "react";
import axios from "axios";
import { ICONS } from '../../constants';


const OneOnOneStep2 = ({ setStep, weekDays, selectedDays, setSelectedDays }) => {
  const [duration, setDuration] = useState("60");
  const [dateRange, setDateRange] = useState("60"); // Default: Calendar days
  const [customDays, setCustomDays] = useState("60"); // Number input for days
  const [availability, setAvailability] = useState({
    SU: [],
    MO: [{ start: "09:00 AM", end: "04:00 PM" }],
    TU: [{ start: "09:00 AM", end: "04:00 PM" }],
    WE: [{ start: "09:00 AM", end: "04:00 PM" }],
    TH: [{ start: "09:00 AM", end: "04:00 PM" }],
    FR: [{ start: "09:00 AM", end: "04:00 PM" }],
    SA: [],
  });

  const weekDayNames = ["S", "M", "T", "W", "T", "F", "S"];
  const weekDayKeys = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  const addTimeSlot = (day) => {
    setAvailability({
      ...availability,
      [day]: [...availability[day], { start: "09:00 AM", end: "04:00 PM" }],
    });
  };

  const removeTimeSlot = (day, index) => {
    const updatedSlots = availability[day].filter((_, i) => i !== index);
    setAvailability({ ...availability, [day]: updatedSlots });
  };

  const weekDayCodes = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  const updateTimeSlot = (day, index, field, value) => {
    const updatedSlots = availability[day].map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setAvailability({ ...availability, [day]: updatedSlots });
  };

  const handleNext = async () => {
    const token = localStorage.getItem("authToken");
    const uid = localStorage.getItem("userId");
    const eventId = localStorage.getItem("eventId");

    if (!uid || !eventId) {
      alert("User ID or Event ID not found in local storage.");
      return;
    }

    if (selectedDays.length === 0) {
      alert("Please select at least one day.");
      return;
    }

    const selectedDayCodes = selectedDays.map((index) => weekDayCodes[index]);

    const requestBody = {
      uid,
      eventId,
      duration,
      repeatsEvery: selectedDayCodes,
      dateRange: dateRange === "60" ? customDays : dateRange, 
    };

    try {
      const response = await axios.put(
        "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/events/availability/roundrobin",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      setStep(3);
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Failed to update availability. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
        Set your availability
      </h1>
      <p className="text-sm text-gray-600 text-center mb-6">
        Set the length of your meetings, and define when you’re available.
      </p>

      {/* Meeting Duration */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          How long are you meeting for?
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg  w-full relative">
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="text-gray-600 text-sm bg-transparent border-none focus:outline-none px-3 py-3 appearance-none w-full"
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>          
        </select>
        <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="16"
            height="16"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
      </div>
      </div>
      {/* Date Range Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Date range
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Invites can schedule into the future
        </p>

        {/* Calendar Days Selection */}
        <div
          className={`flex items-center space-x-3 cursor-pointer ${
            dateRange === "60" ? "text-gray-900" : "text-gray-500"
          }`}
          onClick={() => setDateRange("60")}
        >
          {/* Radio Button */}
          <div
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
              dateRange === "60" ? "border-orange-500" : "border-gray-400"
            }`}
          >
            {dateRange === "60" && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
          </div>

          {/* Input Box + Dropdown */}
          <div className="flex items-center space-x-2 border border-gray-300 rounded-lg px-2 py-2 w-[58px]">
            <input
              type="number"
              value={customDays}
              onChange={(e) => setCustomDays(e.target.value)}
              className="w-12 text-center text-gray-700 bg-transparent outline-none border-none"
            />
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg  w-[268px] relative">
          <select
            value="calendar-days"
            className="text-gray-600 text-sm bg-transparent border-none focus:outline-none appearance-none w-full px-3 py-3"
          >
            <option value="calendar-days">Calendar days</option>
          </select>
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="16"
            height="16"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        </div>

        {/* Within a Date Range Option */}
        <div
          className={`flex items-center mt-3 cursor-pointer ${
            dateRange === "within" ? "text-gray-900" : "text-gray-500"
          }`}
          onClick={() => setDateRange("within")}
        >
          {/* Radio Button */}
          <div
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
              dateRange === "within" ? "border-orange-500" : "border-gray-400"
            }`}
          >
            {dateRange === "within" && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
          </div>
          <span className="text-sm">Within a date range</span>
        </div>

        {/* Indefinitely into the Future Option */}
        <div
          className={`flex items-center mt-3 cursor-pointer ${
            dateRange === "future" ? "text-gray-900" : "text-gray-500"
          }`}
          onClick={() => setDateRange("future")}
        >
          {/* Radio Button */}
          <div
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
              dateRange === "future" ? "border-orange-500" : "border-gray-400"
            }`}
          >
            {dateRange === "future" && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
          </div>
          <span className="text-sm">Indefinitely into the future</span>
        </div>
      </div>
        {/* Horizontal Line */}
        <hr className="my-3 border-muted" />

      <div className="mb-6">
      <h2 className="text-gray-700 text-sm font-medium mb-3 flex items-center ml-2">
      <img src={ICONS.AVAILABILITY}  alt="calender" className="mr-4"/>Availability
      </h2>
      {weekDayKeys.map((day, index) => (
        <div key={day} className="mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center text-white font-semibold rounded-full bg-blue-900">
              {weekDayNames[index]}
            </div>

            {availability[day].length === 0 ? (
              <span className="text-gray-500 text-sm">Unavailable</span>
            ) : (
              <div className="flex items-center space-x-2 text-[14px]">
                <input
                  type="text"
                  value={availability[day][0]?.start || ""}
                  placeholder="Start"
                  onChange={(e) =>
                    updateTimeSlot(day, 0, "start", e.target.value)
                  }
                  className="bg-[#F5F5F6] px-3 py-1 rounded-md w-[86px] h-[34px] text-center text-gray-700"
                />
                <span>—</span>
                <input
                  type="text"
                  value={availability[day][0]?.end || ""}
                  placeholder="End"
                  onChange={(e) =>
                    updateTimeSlot(day, 0, "end", e.target.value)
                  }
                  className="bg-[#F5F5F6] px-3 py-1 rounded-md w-[86px] h-[34px] text-center text-gray-700"
                />
                <button
                  onClick={() => removeTimeSlot(day, 0)}
                  className="w-5 h-5"
                >
                  <img src={ICONS.X_SYMBOL}  alt="Remove" />
                </button>
              </div>
            )}

            <button onClick={() => addTimeSlot(day)} className="w-5 h-5">
              <img src={ICONS.PLUS_CIRCLE} alt="Add" />
            </button>
          </div>

          {availability[day].slice(1).map((slot, slotIndex) => (
            <div
              key={slotIndex + 1}
              className="flex items-center space-x-2 text-[14px] mt-2 ml-[44px]"
            >
              <input
                type="text"
                value={slot.start}
                placeholder="Start"
                onChange={(e) =>
                  updateTimeSlot(day, slotIndex + 1, "start", e.target.value)
                }
                className="bg-[#F5F5F6] px-3 py-1 rounded-md w-[86px] h-[34px] text-center text-gray-700"
              />
              <span>—</span>
              <input
                type="text"
                value={slot.end}
                placeholder="End"
                onChange={(e) =>
                  updateTimeSlot(day, slotIndex + 1, "end", e.target.value)
                }
                className="bg-[#F5F5F6] px-3 py-1 rounded-md w-[86px] h-[34px] text-center text-gray-700"
              />
              <button
                onClick={() => removeTimeSlot(day, slotIndex + 1)}
                className="w-5 h-5"
              >
                <img src={ICONS.X_SYMBOL} alt="Remove" />
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
    {/* Horizontal Line */}
    <hr className="my-3 border-muted" />
    <div className="mt-6 flex items-center space-x-4">
        <div>
          <h2 className="text-gray-700 text-sm font-medium mb-1">
            Buffer time between calls
          </h2>
          <p className="text-gray-500 text-[12px]">
            Add time between your events to stay zen
          </p>
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg  w-[123px] relative">
        <select
          className="text-gray-600 text-sm bg-transparent border-none focus:outline-none px-3 py-3 appearance-none w-[123px] "
        >
          <option value="0">0 Mins</option>
          <option value="5">5 Mins</option>
          <option value="10">10 Mins</option>
          <option value="15">15 Mins</option>
        </select>
        <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="16"
            height="16"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
      </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6 ">
        <button
          onClick={() => setStep(1)}
          className="w-[170px] px-6 py-2 text-black font-medium bg-gray-200 rounded-[32px]"
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          className="w-[170px] px-6 py-2 text-white font-medium bg-[rgb(97,57,255)] rounded-[32px] hover:bg-customPurple"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OneOnOneStep2;
