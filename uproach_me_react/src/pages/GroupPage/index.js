import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupStep1 from "./GroupStep1";
import GroupStep2 from "./GroupStep2";
import GroupStep3 from "./GroupStep3";
import GroupStep4 from "./GroupStep4";

const GroupPage = () => {
  const [step, setStep] = useState(1);
  const [weekDays, setWeekDays] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
      days.push(`${dayName} ${dayNumber}`);
    }

    setWeekDays(days);
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GroupStep1 setStep={setStep} />;
      case 2:
        return (
          <GroupStep2
            setStep={setStep}
            weekDays={weekDays}
            selectedDayIndex={selectedDayIndex}
            setSelectedDayIndex={setSelectedDayIndex}
          />
        );
      case 3:
        return <GroupStep3 setStep={setStep} />;
      case 4:
        return <GroupStep4 setStep={setStep} navigate={navigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/3 bg-white p-8 overflow-y-scroll scrollbar-hide">
        {/* Progress Bar */}
        <div className="flex flex-col items-center justify-center">

        <div className="flex items-center mb-6">
          {[1, 2, 3, 4].map((stepNumber, index) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-[24px] h-[24px] flex items-center justify-center rounded-full text-white font-semibold ${
                  stepNumber <= step ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {stepNumber}
              </div>
              {index < 3 && (
                <div
                  className={`w-[28px] h-[1px] ${
                    stepNumber < step ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        </div>
        {/* Render Current Step */}
        {renderStep()}
      </div>

      {/* Right Section */}
      {/* Right Section (Fixed) */}
      <div className="hidden md:flex w-full md:w-2/3 bg-blue-50 items-center justify-center">
        <div className="border rounded-lg p-5 bg-white" style={{ width: "254px", height: "210.803px" }}>
          <div className="flex items-center mb-6">
            <img
              src="https://via.placeholder.com/50"
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h3 className="text-[12px] font-semibold text-gray-800">
                Book Session
              </h3>
              <p className="text-[10px] text-gray-500">Select Date & Time</p>
            </div>
          </div>

          <div className="flex overflow-x-auto scrollbar-hide space-x-3 items-center mb-6">
            {weekDays.map((date, index) => {
              const [day, dayNumber, month] = date.split(" ");
              const isSelected = selectedDayIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDayIndex(index)}
                  className={`flex-shrink-0 text-center pt-[7px] w-[51px] h-[38.014px] rounded-lg cursor-pointer ${
                    isSelected
                      ? "bg-blue-100 text-blue-700 border border-blue-500"
                      : "bg-gray-100 text-gray-700 border border-gray-300"
                  }`}
                >
                  <p className="text-[7px] font-medium">{day}</p>
                  <p className={`text-[9px] font-semibold ${isSelected ? "text-blue-700" : "text-gray-900"}`}>
                    {month} <span className="text-[9px] font-semibold">{dayNumber}</span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="w-[248px] ml-[-17px] border-t border-gray-300 mb-3"></div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-gray-500">Next Available</p>
              <p className="text-[12px] font-semibold text-gray-800">
                07:00pm, Tue 24th
              </p>
            </div>
            <button className="w-[80.347px] h-[31.102px] text-white text-[12px] font-medium bg-[rgb(97,57,255)] rounded-lg hover:bg-customPurple">
              Book
            </button>
          </div>
        </div>
      </div>
      </div>
  );
};

export default GroupPage;
