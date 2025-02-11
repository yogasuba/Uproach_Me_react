import React, { useState } from "react";
import axios from "axios";

const GroupStep2 = ({ setStep, weekDays }) => {
  const [duration, setDuration] = useState("");
  const [firstSessionDate, setFirstSessionDate] = useState("");
  const [firstSessionTime, setFirstSessionTime] = useState("");
  const [totalSessions, setTotalSessions] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]); // Array of selected day indexes
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Toggle day selection (add or remove index)
  const toggleDaySelection = (index) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(index)
        ? prevSelectedDays.filter((day) => day !== index)
        : [...prevSelectedDays, index]
    );
  };

  // Helper to build the ISO startFrom date string
  const getStartFromISO = () => {
    // Combine the date and time from inputs (assumes they are valid and in local time)
    const combined = `${firstSessionDate}T${firstSessionTime}:00`;
    // Convert to Date and then ISO string. (You might need to adjust for timezone.)
    const dateObj = new Date(combined);
    return dateObj.toISOString();
  };

  const handleSubmit = async () => {
    const uid = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");
    const eventId = localStorage.getItem("eventId");

    // Validate required fields before sending the request
    if (!uid || !eventId || !duration || !firstSessionDate || !firstSessionTime || selectedDays.length === 0) {
      setError("Please fill out all required fields and select at least one day.");
      return;
    }
    setError("");
    setIsLoading(true);

    // Build the repeatsEvery array using the selectedDays indexes.
    // This assumes that weekDays contains strings like "MO Monday", so splitting returns the day code.
    const repeatsEvery = selectedDays
      .sort((a, b) => a - b)
      .map((index) => weekDays[index].split(" ")[0]);

    const payload = {
      uid,
      eventId,
      duration: Number(duration), // convert to number
      repeatsEvery,
      startFrom: getStartFromISO(),
      totalSessions: Number(totalSessions)
    };

    try {
      const response = await axios.put(
        "https://c4gp5r0vsj.execute-api.ap-south-1.amazonaws.com/events/availability/Group",
        payload,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
      );
      console.log("Response:", response.data);
      // Go to the next step on successful submission
      setStep(3);
    } catch (err) {
      console.error("Error submitting data:", err);
      setError("There was an error submitting your availability. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-[24px] font-semibold text-gray-800 mb-2 text-center">
        Set your availability
      </h1>
      <p className="text-[14px] text-gray-600 text-center mb-6">
        Set the length of your meetings, and define ranges of time when you’re available.
      </p>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="mb-6">
        <label className="block text-gray-700 text-[14px] font-medium mb-2">
          First session
        </label>
        <div className="flex space-x-2">
          <input
            type="date"
            value={firstSessionDate}
            onChange={(e) => setFirstSessionDate(e.target.value)}
            className="custom-inputfeild w-full text-[14px] text-[#80828D] p-[12px] border border-[#CCCDD6] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="time"
            value={firstSessionTime}
            onChange={(e) => setFirstSessionTime(e.target.value)}
            className="custom-inputfeild w-full text-[14px] text-[#80828D] p-[12px] border border-[#CCCDD6] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-[14px] font-medium mb-2">
          How long are you meeting for?
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="custom-inputfeild w-full text-[14px] text-[#80828D] p-[12px] border border-[#CCCDD6] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="" disabled>
            Duration
          </option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-[14px] font-medium mb-2">
          Total Sessions
        </label>
        <input
          type="number"
          value={totalSessions}
          onChange={(e) => setTotalSessions(e.target.value)}
          className="custom-inputfeild w-full text-[14px] text-[#80828D] p-[12px] border border-[#CCCDD6] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          min="0"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-[14px] font-medium mb-2">
          Repeats Every
        </label>
        <div className="flex space-x-2 mb-[10rem]">
          {weekDays.map((date, index) => (
            <button
              key={index}
              onClick={() => toggleDaySelection(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium transition-colors ${
                selectedDays.includes(index)
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {date.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(1)}
          className="w-[170px] px-6 py-2 text-black font-medium bg-gray-200 rounded-[32px]"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="w-[170px] px-6 py-2 text-white font-medium bg-[rgb(97,57,255)] rounded-[32px] hover:bg-customPurple"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default GroupStep2;
