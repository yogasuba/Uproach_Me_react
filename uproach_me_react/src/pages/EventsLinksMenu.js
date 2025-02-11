import React, { useState, useEffect } from "react";
import axios from "axios";
import { ICONS, IMAGES } from "../constants";

const PagesMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCallType, setActiveCallType] = useState("on_profile"); // For call type selection
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");

    axios
      .get(
        `https://c4gp5r0vsj.execute-api.ap-south-1.amazonaws.com/userEvents/${uid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const events = response.data.data;
        const bookingsFromApi = events.map((event) => ({
          id: event._id,
          title: event.title,
          url: "Vignesh-0.uproachme.com",
          status: "active",
        }));
        setBookings(bookingsFromApi);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const toggleStatus = (id) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id
          ? { ...booking, status: booking.status === "active" ? "inactive" : "active" }
          : booking
      )
    );
    setMenuOpenId(null);
  };



  const filteredBookings = bookings.filter((booking) =>
    booking.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <button
            className={`text-[14px] px-[14px] py-[8px] rounded-[70px] ${
              activeCallType === "on_profile"
                ? "bg-[#6139FF] hover:bg-customPurple text-white"
                : "bg-white text-[#686A74] border border-[#E0E0E0]"
            }`}
            onClick={() => setActiveCallType("on_profile")}
          >
            On Profile
          </button>
          <button
            className={`text-[14px] px-[14px] py-[8px] rounded-[70px] ${
              activeCallType === "separate_link"
                ? "bg-[#6139FF] hover:bg-customPurple text-white"
                : "bg-white text-[#686A74] border border-[#E0E0E0]"
            }`}
            onClick={() => setActiveCallType("separate_link")}
          >
            Separate Link
          </button>
        </div>
               {/* Right-side Controls */}
               <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img src={ICONS.SEARCH} alt="Search Icon" className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search Here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-[#E0E0E0] rounded-[70px] w-[359px] h-[41px] pl-10 pr-[14px] py-[8px] focus:outline-none focus:ring-1 focus:ring-[#E0E0E0]"
            />
          </div>

          {/* Filter */}
          <button className="flex items-center gap-2 text-[14px] bg-white border border-[#E0E0E0] px-[14px] py-[8px] rounded-[70px] text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#E0E0E0]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V17a1 1 0 01-.553.894l-4 2A1 1 0 019 19v-5.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            Filter
          </button>
        </div>
      </div>
      
      {/* Booking List */}
      <div className="bg-white rounded-md shadow p-4">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between p-4 mb-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative border border-grey bg-[#F7F7F7] w-[45px] h-[45px] rounded-full flex items-center justify-center">
                <img src={ICONS.BOOKING} alt="calendar" className="w-[24px] h-[24px]" />
                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${booking.status === "active" ? "bg-green-500" : "bg-red-500"}`}></span>
              </div>
              <div>
                <p className="text-gray-800 font-medium text-[14px]">{booking.title}</p>
                <p className="text-gray-600 text-[12px]">{booking.url}</p>
              </div>
            </div>
            <div className="relative">
              <button onClick={() => toggleMenu(booking.id)} className="relative focus:outline-none">
                <img src={ICONS.HORIZONTAL_DOTS} alt="More Options" className="w-[24px] h-[24px]" />
              </button>
              {menuOpenId === booking.id && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48">
                  <button
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left text-sm text-gray-700 w-full"
                  >
                    <img src={ICONS.EVENT_DETAILS} alt="Event Details" className="w-5 h-5" />
                    Event details
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left text-sm text-gray-700 w-full">
                    <img src={ICONS.SHARE_ICON} alt="Share" className="w-5 h-5" />
                    Share
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left text-sm text-gray-700 w-full">
                    <img src={ICONS.BOOKING} alt="View Bookings" className="w-5 h-5" />
                    View bookings
                  </button>
                  <button
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left text-sm text-gray-700 w-full"
                    onClick={() => toggleStatus(booking.id)}
                  >
                    <img
                      src={booking.status === "active" ? IMAGES.EYE_OFF : IMAGES.EYE}
                      alt={booking.status === "active" ? "Set Offline" : "Set Online"}
                      className="w-5 h-5"
                    />
                    {booking.status === "active" ? "Set Offline" : "Set Online"}
                  </button>
                  <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left text-sm text-red-500 w-full">
                    <img src={ICONS.TRASH} alt="Delete" className="w-5 h-5" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <p className="text-gray-600 text-center mt-4">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PagesMenu;
