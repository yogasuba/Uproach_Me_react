import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const uid = localStorage.getItem("userId");
        console.log("")
        const token = localStorage.getItem("authToken");

        if (!uid || !token) {
          console.error("Missing userId or authToken in localStorage");
          return;
        }

        const response = await axios.get(
          `https://c4gp5r0vsj.execute-api.ap-south-1.amazonaws.com/userEvents/${uid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEvents(response?.data?.data || []); // Safely handle response
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="w-full min-h-screen bg-purple-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Event List</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8 font-bold">
          {events?.length > 0 ? (
            events.map((event) => (
          <EventCard key={event.eventId} event={event} />

            ))
          ) : (
            <p className="text-gray-600">No events available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventList;
