import React, { useState } from "react";

const OneOnOneStep2 = ({ setStep, weekDays, selectedDayIndex, setSelectedDayIndex }) => {
    const [duration, setDuration] = useState("");

  return (
    <div>
      <h1 className="text-[24px] font-semibold text-gray-800 mb-2 text-center">
        Set your availability
      </h1>
      <p className="text-[14px] text-gray-600 text-center mb-6">
        Set the length of your meetings, and define ranges of time when you’re available.
      </p>
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
                  Repeats Every
                </label>
                <div className="flex space-x-2 mb-[10rem]">
                  {weekDays.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDayIndex(index)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium transition-colors ${
                        selectedDayIndex === index
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
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setStep(3)}
                        className="w-[170px] px-6 py-2 text-white font-medium bg-[rgb(97,57,255)] rounded-[32px] hover:bg-customPurple"
                    >
                        Next
                    </button>
                </div>
    </div>
  );
};

export default OneOnOneStep2;
