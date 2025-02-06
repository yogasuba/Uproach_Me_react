import React, { useState } from "react";
import axios from "axios";
import { ICONS } from "../../constants";

const OneOnOneStep2 = ({ setStep, response }) => {
  // States for buffer time, date range, custom days, and meeting duration.
  const [bufferTime, setBufferTime] = useState(0);
  const [dateRange, setDateRange] = useState("60");
  const [customDays, setCustomDays] = useState("60");
  const [duration, setDuration] = useState(60);

  // IMPORTANT: Define defaultAvailability with keys in the same order as weekDayKeys.
  // This order represents: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.
  const defaultAvailability = {
    SU: [],
    MO: [],
    TU: [],
    WE: [],
    TH: [],
    FR: [],
    SA: [],
  };

  // Weekday labels and keys (ordered to match defaultAvailability)
  const weekDayNames = ["S", "M", "T", "W", "T", "F", "S"];
  const weekDayKeys = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  // Format API response into availability structure
  const formatAPIAvailability = (availabilityResponse) => {
    let availabilityMap = { ...defaultAvailability };
    availabilityResponse?.availability?.forEach(({ day, timeSlots }) => {
      // If the API returns days in any order, assign them appropriately.
      availabilityMap[day] = timeSlots.map((slot) => ({
        start: slot.startTime,
        end: slot.endTime,
      }));
    });
    return availabilityMap;
  };

  // Initialize availability state from API.
  const [availability, setAvailability] = useState(
    formatAPIAvailability(response)
  );

  // Derive the initially selected days from the API response.
  // (Any day with at least one timeslot is considered selected.)
  const initialSelectedDays =
    response?.availability?.map((item) => item.day) || [];
  const [selectedDays, setSelectedDays] = useState(initialSelectedDays);

  // Helper: Convert a time string (e.g., "09:00 AM") to 24-hour format ("09:00").
  const convertTo24Hour = (time) => {
    const match = time.match(/(\d+):(\d+)\s?(AM|PM)/);
    if (!match) return time; // If already in 24-hour format
    const [ hour, minute, period] = match;
    let hours = parseInt(hour, 10);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${minute}`;
  };

  // Update a timeslot for a given day and index.
  const updateTimeSlot = (day, index, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      ),
    }));
  };

  // Add a new timeslot for the given day.
  // Also ensure the day is marked as selected.
  const addTimeSlot = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: [...prev[day], { start: "", end: "" }],
    }));
    if (!selectedDays.includes(day)) {
      setSelectedDays((prev) => [...prev, day]);
    }
  };

  // Remove a timeslot for the given day and index.
  // If no timeslots remain after removal, remove the day from selectedDays.
  const removeTimeSlot = (day, index) => {
    setAvailability((prev) => {
      const newSlots = prev[day].filter((_, i) => i !== index);
      return {
        ...prev,
        [day]: newSlots,
      };
    });
    // Use a timeout to allow the state update to complete before checking.
    setTimeout(() => {
      setSelectedDays((prev) => {
        if (availability[day].length <= 1) {
          // (Because the state update in availability is asynchronous,
          // you may need to double-check using a callback or effect.)
          return prev.filter((d) => d !== day);
        }
        return prev;
      });
    }, 0);
  };

  // Build and send the request when the user clicks "Next".
  const handleNext = async () => {
    const token = localStorage.getItem("authToken");
    const uid = localStorage.getItem("userId");
    const eventId = localStorage.getItem("eventId");

    if (!uid || !eventId) {
      alert("User ID or Event ID not found in local storage.");
      return;
    }

    // Build the availability array using only the selected days.
    const formattedAvail = selectedDays.map((day) => ({
      day,
      timeSlots: availability[day].map(({ start, end }) => ({
        startTime: convertTo24Hour(start),
        endTime: convertTo24Hour(end),
      })),
    }));

    // Unavailable days: all day keys not in selectedDays.
    const apiUnavailableDays = weekDayKeys.filter(
      (day) => !selectedDays.includes(day)
    );

    const requestBody = {
      uid,
      eventId,
      duration: Number(duration),
      availability: formattedAvail,
      unavailableDays: apiUnavailableDays,
      unavailableDates: [],
      numberOfDays: Number(dateRange === "60" ? customDays : dateRange),
      startFrom: new Date().toISOString(),
      bufferTime: Number(bufferTime),
    };

    console.log("Request Body:", requestBody);

    try {
      const res = await axios.put(
        "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/events/availability/OneOnOne",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", res.data);
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
        <div className="flex items-center border border-gray-300 rounded-lg w-full relative">
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
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
        <div
          className={`flex items-center space-x-3 cursor-pointer ${
            dateRange === "60" ? "text-gray-900" : "text-gray-500"
          }`}
          onClick={() => setDateRange("60")}
        >
          <div
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
              dateRange === "60" ? "border-orange-500" : "border-gray-400"
            }`}
          >
            {dateRange === "60" && (
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
            )}
          </div>
          <div className="flex items-center space-x-2 border border-gray-300 rounded-lg px-2 py-2 w-[58px]">
            <input
              type="number"
              value={customDays}
              onChange={(e) => setCustomDays(e.target.value)}
              className="w-12 text-center text-gray-700 bg-transparent outline-none border-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg w-[268px] relative">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <div
          className={`flex items-center mt-3 cursor-pointer ${
            dateRange === "within" ? "text-gray-900" : "text-gray-500"
          }`}
          onClick={() => setDateRange("within")}
        >
          <div
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
              dateRange === "within" ? "border-orange-500" : "border-gray-400"
            }`}
          >
            {dateRange === "within" && (
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
            )}
          </div>
          <span className="text-sm">Within a date range</span>
        </div>
        <div
          className={`flex items-center mt-3 cursor-pointer ${
            dateRange === "future" ? "text-gray-900" : "text-gray-500"
          }`}
          onClick={() => setDateRange("future")}
        >
          <div
            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
              dateRange === "future" ? "border-orange-500" : "border-gray-400"
            }`}
          >
            {dateRange === "future" && (
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
            )}
          </div>
          <span className="text-sm">Indefinitely into the future</span>
        </div>
      </div>

      <hr className="my-3 border-muted" />

      {/* Availability Section */}
      <div className="mb-6">
        <h2 className="text-gray-700 text-sm font-medium mb-3 flex items-center ml-2">
          <img
            src={ICONS.AVAILABILITY}
            alt="calendar"
            className="mr-4"
          />
          Availability
        </h2>
        {Object.keys(defaultAvailability).map((day, index) => (
          <div key={day} className="mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center text-white font-semibold rounded-full bg-blue-900">
                {weekDayNames[index]}
              </div>
              {/* If the day is not selected, show "Unavailable"; otherwise, show its timeslots */}
              {!selectedDays.includes(day) ? (
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
                    <img src={ICONS.X_SYMBOL} alt="Remove" />
                  </button>
                </div>
              )}
              {/* Add button to add a timeslot (and mark day as selected) */}
              <button
                onClick={() => addTimeSlot(day)}
                className="w-5 h-5"
              >
                <img src={ICONS.PLUS_CIRCLE} alt="Add" />
              </button>
            </div>
            {/* Render additional timeslots for the day */}
            {selectedDays.includes(day) &&
              availability[day]?.slice(1).map((slot, slotIndex) => (
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

      <hr className="my-3 border-muted" />

      {/* Buffer Time Section */}
      <div className="mt-6 flex items-center space-x-4">
        <div>
          <h2 className="text-gray-700 text-sm font-medium mb-1">
            Buffer time between calls
          </h2>
          <p className="text-gray-500 text-[12px]">
            Add time between your events to stay zen
          </p>
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg w-[123px] relative">
          <select
            className="text-gray-600 text-sm bg-transparent border-none focus:outline-none px-3 py-3 appearance-none w-[123px]"
            value={bufferTime}
            onChange={(e) => setBufferTime(e.target.value)}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
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
