import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom"; // Using React Router for navigation
import { ProfileHeader } from '../components/ProfileHeader';
import { eventDetails } from "./EventDetailPage";


export default function ScheduledPage() {
  useEffect(() => {
    document.title = 'Scheduled'; // Set your desired page title here
  }, []);

  const { slug } = useParams();

  // Fetch event and stored information
  const event = eventDetails[slug];
  const [storedDateInfo, setStoredDateInfo] = useState(null);
  const [storedTimeRange, setStoredTimeRange] = useState(null);

  useEffect(() => {
    // Retrieve data from localStorage
    const dateInfo = JSON.parse(localStorage.getItem("selectedDateInfo"));
    const timeRange = localStorage.getItem("selectedTimeRange");

    setStoredDateInfo(dateInfo);
    setStoredTimeRange(timeRange);
  }, []);

  return (
    <div className="min-h-screen rounded-lg flex flex-col items-center justify-center xl:bg-gray-50 sm:bg-white">
      {/* Scheduled Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl xl:ml-0 sm:ml-[20px] font-semibold">You are scheduled</h1>
        <p className="xl:text-sm sm:text-xs xl:ml-0 sm:ml-[30px] text-gray-600">
          A calendar invitation has been sent to your email address
        </p>
      </div>

      {/* Profile Header Wrapper with reduced width */}
      <div className="xxl:w-[406px] sm:w-[297px] mb-6 rounded-lg">
        <ProfileHeader
          name={event.name}
          location={event.location}
          imageUrl={event.imageUrl}
          showShareButton={false}
          roundedClass="rounded-[70px]"
        />
      </div>

      {/* Event Info Card */}
      <div className="bg-white shadow-md rounded-lg p-6 xl:w-[547px] sm:w-[343px]">
        {/* Event Title */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{event.title}</h3>
        </div>

        {/* Event Details (Duration, Google Meet) */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center text-gray-600 font-bold space-x-2 text-sm">
            <img src="/icons/clock.svg" alt="Clock Icon" width={20} height={20} />
            <span>Duration 30 Min</span>
          </div>

          {/* Google Meet */}
          <div className="flex items-center text-gray-600 space-x-1">
            <img src="/icons/google-meet.svg" alt="Google Meet Icon" width={16} height={16} />
            <span className="text-sm">Google Meet</span>
          </div>
        </div>

        {/* Event Date and Time */}
        <div className="mt-6 bg-white rounded-md">
          {storedDateInfo && storedTimeRange && (
            <div className="flex items-center border-2 p-4 rounded-md space-x-4 justify-between">
              <div className="flex items-center space-x-4">
                {/* Date Block */}
                <div className="flex items-center justify-center w-12 h-12 border-2 border-yellow-400 bg-yellow-300 rounded-md">
                  <div className="text-center">
                    <div className="text-xs font-bold">{storedDateInfo.month}</div>
                    <div className="text-lg font-bold">{storedDateInfo.day}</div>
                  </div>
                </div>

                {/* Date and Time */}
                <div>
                  <p className="text-lg font-semibold">{storedDateInfo.fullDate}</p>
                  <p className="text-sm text-gray-600">{storedTimeRange} (GMT +05:30)</p>
                </div>
              </div>

              {/* Open Invitation Link */}
              <div>
                <a
                  href={`mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(
                    `You are invited to the event: ${event.title} on ${storedDateInfo.fullDate} from ${storedTimeRange}.`
                  )}`}
                  className="text-purple-600 hover:text-purple-800 text-sm font-semibold flex items-center space-x-1"
                >
                  <img src="/icons/noun-open-link-3560696 1.svg" alt="Open Link Icon" width={16} height={16} />
                  <span>Open Invitation</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
