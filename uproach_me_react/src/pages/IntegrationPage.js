import React, { useState } from "react";
import {ICONS,IMAGES} from "../constants"

const IntegrationPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState("");
  const [connectedCalendars, setConnectedCalendars] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const integrations = [
    {
      name: "Google Calendar",
      description: "Copy booking page links, suggest times.",
      img:ICONS.GOOGLE_CALENDAR
    },
    {
      name: "Outlook",
      description: "Avoid the spam filters by sending your confirmations via Outlook mail.",
      img:ICONS.MICROSOFT_OFFICE_OUTLOOK
    },
    {
      name: "I Cloud",
      description: "Avoid the spam filters by sending your confirmations via Outlook mail.",
      img:ICONS.APPLE_ICLOUD
    },
    {
      name: "Slack",
      description: "Avoid the spam filters by sending your confirmations via Outlook mail.",
      img:ICONS.SLACK
    },
  ];

  const handleConnectClick = (calendarName) => {
    setSelectedCalendar(calendarName);
    setShowModal(true);
  };


  const handleConnectAccount = () => {
    setConnectedCalendars((prev) => ({ ...prev, [selectedCalendar]: true }));
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    alert("Profile changes saved!");
  };

  return (
        <div className="xxl:min-h-screen sm:h-[1136px] bg-gray-50 p-6 sm:mt-[77px] xxl:mt-0">
        <div className="flex justify-between items-center xxl:mb-2 sm:mb-4">
            <h1 className="text-[22px] font-semibold text-gray-800">Integration</h1>
            <button
            onClick={handleSaveChanges}
            className="bg-[#6139FF] text-white px-6 py-2 rounded-full shadow-md hover:bg-customPurple"
            >
            Save Changes
            </button>
        </div>
        
        {/* Horizontal Line */}
        <hr className="border-t border-gray-300 mb-6" />

        <h1 className="text-2xl font-bold mb-4 xxl:ml-[143px] sm:ml-0 xxl:mt-[62px] sm:mt-0">Calendars</h1>
        <p className="text-gray-600 mb-6 xxl:ml-[145px] sm:ml-0">
            Existing events on your calendar will block your Uproachme availability.
        </p>

        <div className="xxl:w-[677px] xxl:h-[441px] sm:w-[312px] sm:h-[632px] mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
            {integrations.map((integration, index) => (
                <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center justify-between border border-[#EAEAF1] p-3 rounded-lg"
                >
                <div className="flex items-center space-x-4">
                    <img
                    src={integration.img}
                    alt={integration.name}
                    className="w-[32px] h-[32px] object-contain"
                    />
                    <div>
                    <h2 className="text-[16px] font-medium">{integration.name}</h2>
                    <p className="text-gray-500 text-sm">{integration.description}</p>
                    </div>
                </div>
                {connectedCalendars[integration.name] ? (
                    <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-4 h-4 text-green-600"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        </div>
                        <span className="text-gray-700 font-medium text-[14px]">Connected</span>
                    </div>
                    <button className="w-[24px] h-[24px] bg-[#F6F6F9] border border-[#EAEAF] rounded-[6px] flex items-center justify-center hover:bg-gray-200 ml-[14px]">
                        <img
                        src={IMAGES.VERTICAL_DOTS}
                        alt="Three Dots"
                        className="w-[16px] h-[16px] text-gray-500"
                        />
                    </button>
                    </div>
                ) : (
                    <button
                    className="mt-4 md:mt-0 px-2 py-1 border border=[#EAEAF] bg-[#F6F6F9] text-[#686A74] text-sm rounded-[36px]"
                    onClick={() => handleConnectClick(integration.name)}
                    >
                    Connect
                    </button>
                )}
                </div>
            ))}
        </div>
        </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 xxl:max-w-md xxl:w-full sm:w-[304px]">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="xxl:text-xl sm:text[18px] font-semibold">Add {selectedCalendar} Account</h2>
                <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
                >
                &times;
                </button>
            </div>

            {/* Info with Image */}
            <div className="flex items-start mb-4 bg-[#F6F6F9] rounded-[8px] px-[14px] py-[16px]">
                <img
                src={ICONS.INFO}
                alt="Info"
                className="w-5 h-5 mr-2"
                />
                <p className="text-gray-600 text-sm">
                <strong>{selectedCalendar}</strong> requires you to set up an app-specific password to connect
                with 3rd party apps like Uproach Me. To set that up, follow the step
                <a href="#" className="text-[#1E1F24] font-semibold"> on this page</a>. Then come back here to finish connecting.
                </p>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
                {/* Email Input */}
                <input
                type="email"
                placeholder="Email"
                className="w-full text-[14px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Password Input with Eye Toggle */}
                <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="App-Specific Password"
                    className="w-full text-[14px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {/* Conditionally render eye icon */}
                    {showPassword ? (
                    <img
                        src={IMAGES.EYE_OFF}
                        alt="Hide Password"
                        className="w-5 h-5"
                    />
                    ) : (
                    <img
                        src={IMAGES.EYE}
                        alt="Show Password"
                        className="w-5 h-5"
                    />
                    )}
                </button>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between items-center mt-6">
                <button
                className="text-[#6139FF] xxl:ml-[210px] sm:ml-[69px] text-[14px]"
                onClick={() => setShowModal(false)}
                >
                Back
                </button>
                <button
                className="px-4 py-2 bg-[#6139FF] text-white rounded-[70px] text-[14px]"
                onClick={handleConnectAccount}
                >
                Connect Account
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default IntegrationPage;
