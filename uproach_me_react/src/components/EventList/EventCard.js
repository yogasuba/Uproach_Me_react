import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../constants";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (event?.eventId ) {
      navigate("/events", { state: { eventId: event.eventId } }); // Pass the event ID
    } else {
      console.error("Event ID is missing!");
    }
  };

  return (
    <div
      className="p-4 bg-white rounded-3xl shadow-md border border-gray-200 w-full max-w-full h-[164px] flex flex-col justify-between cursor-pointer"
      onClick={handleCardClick}
    >
      <h3 className="text-lg font-bold">
        {event?.title || "Untitled Event"}
      </h3>
      <div className="flex justify-between items-center p-2 border border-gray-50 rounded-lg mt-4 bg-gray-50">
        <div className="flex items-center space-x-2">
          <img src="/calendar.svg" alt="Calendar Icon" width={20} height={20} />
          <div>
            <p className="text-gray-600 text-sm">
              {event?.duration ? `${event.duration} minutes` : "Duration not set"}
            </p>
            <p className="text-gray-500 text-xs">{event?.type || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 border border-gray-300 px-3 py-1 rounded-full">
          <span className="text-gray-700 font-medium">
            {event?.pricing?.amount ? `₹${event.pricing.amount}` : "Free"}
          </span>
          <img src={IMAGES.ARROW_RIGHT} alt="Arrow Icon" width={16} height={16} />
        </div>
      </div>
    </div>
  );
};


export default EventCard;
