import React, { useState } from "react";
import { ICONS, IMAGES } from "../constants";
import EventDetailsPopup from "../components/DashboardGrid/BookingsCard/Menus";

const PagesMenu = () => {
  const [activeTab, setActiveTab] = useState("event");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab] = useState("Upcoming");
  const [activeCallType, setActiveCallType] = useState("on_profile"); // New state for call type
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bookings = [
    {
      id: 1,
      date: "Resume review",
      url:"Vignesh-0.uproachme.com",
      title: "Quick chat on design",
      callType: "On Profile",
      status: "active" ,

    },
    {
        id: 2,
        date: "Resume review",
        title: "Quick chat on design",
        url:"Vignesh-0.uproachme.com",
        callType: "Separate link",
        status: "inactive",

      },
      
    {
      id: 3,
      date: "Resume review",
      title: "Project review meeting",
      url:"Vignesh-0.uproachme.com",
      callType: "Separate link",
      status: "inactive",

    },
    {
      id: 4,
      date: "Resume review",
      title: "Design brainstorming",
      url:"Vignesh-0.uproachme.com",
      callType: "On Profile",
      status: "inactive",

    },
    {
      id: 5,
      date: "Resume review",
      title: "Client feedback session",
      url:"Vignesh-0.uproachme.com",
      callType: "Separate link",
      status: "active" , 

    },
  ];
  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id); // Open or close menu for the clicked booking
  };
  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // Filtered bookings based on active tab and search
  const filteredBookings = bookings.filter((booking) => {
    const matchesTab =
      activeTab === "event" ? !booking.completed : booking.completed;
    const matchesSearch = booking.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Pages</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200  mb-8 overflow-x-auto">
        <button
          className={`pb-2 px-4 font-medium  ${
            activeTab === "event"
                ? "text-[rgb(97,57,255)] border-b-2 border-[rgb(97,57,255)]"
                : "text-gray-500 hover:text-[rgb(97,57,255)]"
          }`}
          onClick={() => setActiveTab("event")}
        >
          Event
        </button>
        <button
          className={`pb-2 ml-[22px] ${
            activeTab === "link_in_bio"
                ? "text-[rgb(97,57,255)] border-b-2 border-[rgb(97,57,255)]"
                : "text-gray-500 hover:text-[rgb(97,57,255)]"
          }`}
          onClick={() => setActiveTab("link in bio")}
        >
          Link in bio
        </button>
        <button
          className={`pb-2 ml-[22px] ${
            activeTab === "sell_product"
                ? "text-[rgb(97,57,255)] border-b-2 border-[rgb(97,57,255)]"
                : "text-gray-500 hover:text-[rgb(97,57,255)]"
          }`}
          onClick={() => setActiveTab("Sell Product")}
        >
          Sell product
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        {/* Call Type Buttons */}
        <div className="flex gap-4">
          <button
            className={`text-[14px] px-[14px] py-[8px] rounded-[70px]  ${
              activeCallType === "on_profile"
                ? "bg-[#6139FF] hover:bg-customPurple text-white"
                : "bg-white text-[#686A74] border border-[#E0E0E0]"
            }`}
            onClick={() => setActiveCallType("on_profile")}
          >
            On Profile
          </button>
          <button
            className={`text-[14px] px-[14px] py-[8px] rounded-[70px]  ${
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
            {/* Replace this with your custom search icon */}
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
            {/* Add your filter icon here */}
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
          {/* Export */}
          <button className=" text-[14px] bg-[#6139FF] px-[14px] py-[8px] rounded-[70px] text-white hover:bg-customPurple">
            Export
          </button>
        </div>
      </div>

      {/* Booking List */}
      <div className="bg-white rounded-md shadow p-4">
        <h3 className="text-lg font-semibold mb-4 capitalize border-b pb-2">
          {activeTab}
        </h3>
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between p-4 mb-4  rounded-lg shadow-sm border border-gray-200"
          >
      {/* Booking Info */}
      <div className="flex items-center gap-4">
        {/* Calendar Icon with Status Dot */}
        <div className="relative border border-grey bg-[#F7F7F7] w-[45px] h-[45px] rounded-[22px] flex items-center justify-center">
          {/* Calendar Icon */}
          <img
            src={ICONS.BOOKING}
            alt="calendar"
            className="w-[24px] h-[24px]"
          />

          {/* Status Dot */}
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
              booking.status === "active" ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
        </div>

        {/* Booking Details */}
        <div>
          <p className="text-gray-800 font-semibold text-[14px]">
            {booking.date}
          </p>
          <p className="text-gray-600 text-[12px]">{booking.url}</p>
        </div>
            </div>
            <div className="relative">
            <button
              className="relative focus:outline-none mr-3"
            >
              <img
                src={ICONS.SHARE}
                alt="More Options"
                className="w-6 h-6"
              />
            </button>
              
            <button
              className="relative focus:outline-none mr-2"
            >
              <img
                src={ICONS.COPY_LINK}
                alt="More Options"
                className="w-6 h-6"
              />
            </button>
            {/* Dots Button */}
            <button
              onClick={() => toggleMenu(booking.id)}
              className="relative focus:outline-none"
            >
              <img
                src={ICONS.HORIZONTAL_DOTS}
                alt="More Options"
                className="w-6 h-6"
              />
            </button>

            {/* Dropdown Menu */}
            {menuOpenId === booking.id && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48">
                <button
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-gray-700"
                  onClick={openModal}
                >
                  <img
                    src={ICONS.EVENT_DETAILS}
                    alt="Event Details"
                    className="w-5 h-5"
                  />
                  Event details
                </button>
                <button
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-gray-700"
                >
                  <img
                    src={ICONS.SHARE_ICON}
                    alt="Share"
                    className="w-5 h-5"
                  />
                  Share
                </button>
                <button
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-gray-700"
                >
                  <img
                    src={ICONS.BOOKING}
                    alt="View Bookings"
                    className="w-5 h-5"
                  />
                  View bookings
                </button>
                <button
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-gray-700"
                >
                  <img
                    src={IMAGES.EYE_OFF}
                    alt="Set Offline"
                    className="w-5 h-5"
                  />
                  Set offline
                </button>
                <button
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm text-red-500"
                >
                  <img
                    src={ICONS.TRASH}
                    alt="Delete"
                    className="w-5 h-5"
                  />
                  Delete
                </button>
              </div>
            )}
          </div>

          </div>
        ))}
        {isModalOpen && (
        <EventDetailsPopup
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedTab={selectedTab}
        />
      )}
        {filteredBookings.length === 0 && (
          <p className="text-gray-600 text-center mt-4">
            No {activeTab} bookings found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PagesMenu;
