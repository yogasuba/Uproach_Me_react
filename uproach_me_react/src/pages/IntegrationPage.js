import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICONS } from "../constants";

const IntegrationPage = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    "Google Calendar": false,
    Outlook: false,
    "I Cloud": false,
    Slack: false,
  });

  // Check localStorage on component mount
  useEffect(() => {
    const googleConnected = localStorage.getItem("googleConnected") === "true";
    setConnectionStatus((prev) => ({
      ...prev,
      "Google Calendar": googleConnected,
    }));
  }, []);

  const integrations = [
    {
      name: "Google Calendar",
      description: "Copy booking page links, suggest times.",
      img: ICONS.GOOGLE_CALENDAR,
    },
    {
      name: "Outlook",
      description:
        "Avoid the spam filters by sending your confirmations via Outlook mail.",
      img: ICONS.MICROSOFT_OFFICE_OUTLOOK,
    },
    {
      name: "I Cloud",
      description:
        "Avoid the spam filters by sending your confirmations via Outlook mail.",
      img: ICONS.APPLE_ICLOUD,
    },
    {
      name: "Slack",
      description:
        "Avoid the spam filters by sending your confirmations via Outlook mail.",
      img: ICONS.SLACK,
    },
  ];

  const handleConnectClick = async (calendarName) => {
    if (calendarName === "Google Calendar") {
      try {
        const response = await axios.get(
          "https://c4gp5r0vsj.execute-api.ap-south-1.amazonaws.com/oauth/authUrl"
        );

        // Open OAuth flow in the same tab
        window.location.href = response.data.authUrl;
      } catch (error) {
        console.error("Error fetching auth URL:", error);
      }
    } else {
      console.log("Other calendar clicked");
    }
  };

  // Handle OAuth callback and store tokens
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("integration") === "google" && queryParams.get("success") === "true") {
      const accessToken = queryParams.get("accessToken");
      const refreshToken = queryParams.get("refreshToken");

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("googleConnected", "true");

        setConnectionStatus((prev) => ({
          ...prev,
          "Google Calendar": true,
        }));

        // Remove query params from the URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const handleSaveChanges = () => {
    alert("Profile changes saved!");
  };

  return (
    <div className="xxl:min-h-screen sm:h-[1136px] bg-gray-50 p-6">
      <div className="flex justify-between items-center xxl:mb-2 sm:mb-4">
        <h1 className="text-[22px] font-semibold text-gray-800">Integration</h1>
        <button
          onClick={handleSaveChanges}
          className="bg-[#6139FF] text-white px-6 py-2 rounded-full shadow-md hover:bg-customPurple"
        >
          Save Changes
        </button>
      </div>

      <hr className="border-t border-gray-300 mb-6" />

      <h1 className="text-2xl font-bold mb-4 xxl:ml-[143px] sm:ml-0 xxl:mt-[62px] sm:mt-0">
        Calendars
      </h1>
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
                  <p className="text-gray-500 text-sm">
                    {integration.description}
                  </p>
                </div>
              </div>
              <button
                className="mt-4 md:mt-0 px-2 py-1 border border-[#EAEAF] bg-[#F6F6F9] text-[#686A74] text-sm rounded-[36px]"
                onClick={() => handleConnectClick(integration.name)}
                disabled={connectionStatus[integration.name]}
              >
                {connectionStatus[integration.name] ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationPage;
