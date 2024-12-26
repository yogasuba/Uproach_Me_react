import React from 'react';
import EventCard from './EventCard';

const eventData = [
  { title: "Quick Chat On Design", duration: "10 Min", price: "Book", type: "Video Meeting" },
  { title: "Career Guidance", duration: "10 Min", price: "₹500", type: "Video Meeting" },
  { title: "1:1 Mentorship", duration: "10 Min", price: "₹500", type: "Video Meeting" },
  { title: "Designer’s Resume Review", duration: "10 Min", price: "₹500", type: "Video Meeting" },
  { title: "Design Portfolio Review", duration: "10 Min", price: "₹500", type: "Video Meeting" },
  { title: "UI Design Kickstarter", duration: "10 Min", price: "₹500", type: "Video Meeting" }
];

const EventList = () => (
  <div className="p-4 bg-purple-100">
    <h2 className="text-lg font-bold text-gray-800 mb-6">Event List</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8 font-bold">
      {eventData.map((event, index) => (
        <EventCard 
          key={index}
          title={event.title}
          duration={event.duration}
          price={event.price}
          type={event.type}
        />
      ))}
    </div>
  </div>
);

export default EventList;

