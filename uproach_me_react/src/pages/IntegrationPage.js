import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICONS } from "../constants";

const IntegrationPage = () => {
  // Track connection status for each integration
  const [connectionStatus, setConnectionStatus] = useState({
    "Google Calendar": false,
    Outlook: false,
    "I Cloud": false,
    Slack: false,
  });

  // On mount, check if there is a flag in localStorage for Google Calendar connection
  useEffect(() => {
    const googleConnected = localStorage.getItem("googleConnected");
    if (googleConnected === "true") {
      setConnectionStatus((prev) => ({
        ...prev,
        "Google Calendar": true,
      }));
    }
    // If you have similar logic for other integrations, check and update here.
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
        // Request the auth URL from your backend API.
        const response = await axios.get(
          "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/oauth/authUrl"
        );
        // Open the OAuth flow in a new tab
        window.open(response.data.authUrl, "_blank");

        // Note: The OAuth flow should eventually redirect the user back to your integration page.
        // One way to handle this is to have the redirect URL include query parameters or store a token.
        // For demonstration purposes, we assume the user has completed the flow and we set a flag in localStorage.
      } catch (error) {
        console.error("Error fetching auth URL:", error);
      }
    } else {
      // You may later implement modal functionality here for other integrations.
      console.log("Other calendar clicked");
    }
  };

  // This effect simulates that the OAuth flow was successful.
  // In a real app, you might parse URL query parameters (e.g., ?integration=google&success=true)
  // or check for a token to update the connection status.
  useEffect(() => {
    // Example: if the URL includes a query parameter (you might use a library like query-string)
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("integration") === "google" && queryParams.get("success") === "true") {
      // Update the state and persist it (if desired)
      setConnectionStatus((prev) => ({
        ...prev,
        "Google Calendar": true,
      }));
      localStorage.setItem("googleConnected", "true");

      // Optionally, you might want to clear the query params from the URL.
      window.history.replaceState({}, document.title, window.location.pathname);
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
                disabled={connectionStatus[integration.name]} // Disable if already connected
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
