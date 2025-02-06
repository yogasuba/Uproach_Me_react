import React, { useState } from "react";
import axios from "axios";
import {ICONS } from '../../constants';

const GroupStep3 = ({ setStep, meetingType, setMeetingType }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const mediaOptions = [
    { value: "google-meet", label: "G Meet", icon: ICONS.GOOGLE_MEET },
    { value: "zoom-meet", label: "Zoom", icon: ICONS.ZOOM_MEET },
    { value: "in-person", label: "In Person", icon: ICONS.INPERSON },
    { value: "phone-call", label: "Phone Call", icon: ICONS.CALL },
  ];

  const updateLocation = async () => {
    const uid = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");
    const eventId = localStorage.getItem("eventId");

    const apiUrl = "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/events/location";

    const requestBody = {
      uid,
      eventId,
      location: meetingType,
    };

    try {
      const response = await axios.put(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Location updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating location:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1 className="text-[24px] font-semibold text-gray-800 mb-2 text-center">
        Choose a location
      </h1>
      <p className="text-[14px] text-gray-600 text-center mb-6">
        Decide whether you would like to meet in person or a web conference.
      </p>
      
      <div className="relative mb-6">
        <label className="block text-gray-700 text-[14px] font-medium mb-2">
          How do you want to meet?
        </label>
        <div className="relative mb-[15rem]">
          <button 
            className="w-full text-[14px] text-[#80828D] p-[12px] border border-[#CCCDD6] rounded-lg bg-white flex items-center justify-between"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {mediaOptions.find(option => option.value === meetingType)?.label || "Select an option"}
            <img src={ICONS.DROPDOWN} alt="Dropdown arrow" className="w-4 h-4 ml-2" />
          </button>
          {showDropdown && (
            <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 z-10 shadow-md">
              {mediaOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer "
                  onClick={() => {
                    setMeetingType(option.value);
                    setShowDropdown(false);
                  }}
                >
                  <img src={option.icon} alt={option.label} className="w-[18px] h-[18px] mr-2" />
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(2)}
          className="w-[170px] px-6 py-2 text-black font-medium bg-gray-200 rounded-[32px]"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            updateLocation();
            setStep(4);
          }}
          className="w-[170px] px-6 py-2 text-white font-medium bg-[rgb(97,57,255)] rounded-[32px] hover:bg-customPurple"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GroupStep3;
