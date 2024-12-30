import React, { useState } from "react";
import { ICONS } from "../constants";
import EventDetailsPopup from "../components/DashboardGrid/BookingsCard/Menus";

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab] = useState("Upcoming");
  const [activeCallType, setActiveCallType] = useState("1:1"); // New state for call type
  const [menuOpenId, setMenuOpenId] = useState(null); // Track which menu is open
  const [cancelModalOpen, setCancelModalOpen] = useState(false); // Track modal visibility
  const [selectedBooking, setSelectedBooking] = useState(null); // Track the booking to be canceled
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false); // Example modal state
  const [currentStep, setCurrentStep] = useState(1); // Step state: 1 or 2
  const [selectedDate, setSelectedDate] = useState(null); // For date selection
  const [selectedTime, setSelectedTime] = useState(null); // For time selection
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bookings = [
    {
      id: 1,
      date: "Fri, 8 Nov 2024",
      time: "9:00 AM",
      duration: "1/2 Hr",
      title: "Quick chat on design",
      participant: "1 Participant",
      status: "Paid",
      completed: false,
      callType: "1:1", // New field for call type

    },
    {
        id: 2,
        date: "Fri, 8 Nov 2024",
        time: "9:00 AM",
        duration: "1/2 Hr",
        title: "Quick chat on design",
        participant: "1 Participant",
        status: "Paid",
        completed: false,
        callType: "Group", // New field for call type

      },
      
    {
      id: 3,
      date: "Thu, 7 Nov 2024",
      time: "10:00 AM",
      duration: "1 Hr",
      title: "Project review meeting",
      participant: "3 Participants",
      status: "Paid",
      completed: false,
      callType: "Group", // New field for call type

    },
    {
      id: 4,
      date: "Wed, 6 Nov 2024",
      time: "2:00 PM",
      duration: "45 Min",
      title: "Design brainstorming",
      participant: "2 Participants",
      status: "Paid",
      completed: false,
      callType: "1:1", // New field for call type

    },
    {
      id: 5,
      date: "Tue, 5 Nov 2024",
      time: "4:00 PM",
      duration: "1/2 Hr",
      title: "Client feedback session",
      participant: "1 Participant",
      status: "Paid",
      completed: true,
      callType: "Group", // New field for call type

    },
  ];
  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id); // Open or close menu for the clicked booking
  };
  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
    setSelectedBooking(null);
  };

  const openRescheduleModal = () => {
    setRescheduleModalOpen(true);
  };

  const closeRescheduleModal = () => setRescheduleModalOpen(false);
  const handleCancelBooking = () => {
    alert(`Booking "${selectedBooking?.title}" canceled!`);
    closeCancelModal();
  };
  const handleRescheduleConfirmation = () => {
    // Logic to handle final reschedule confirmation
    console.log("Reschedule confirmed!");
    closeRescheduleModal();
  };
  // Filtered bookings based on active tab and search
  const filteredBookings = bookings.filter((booking) => {
    const matchesTab =
      activeTab === "upcoming" ? !booking.completed : booking.completed;
    const matchesSearch = booking.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 font-sans bg-gray-100 h-screenmin-">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Booking</h1>

      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`pb-2  ${
            activeTab === "upcoming"
              ? "text-[#6139FF] border-b-2 border-[#6139FF] font-semibold"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`pb-2 ml-[22px] ${
            activeTab === "completed"
              ? "text-[#6139FF] border-b-2 border-[#6139FF] font-semibold"
              : "text-gray-600 "
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        {/* Call Type Buttons */}
        <div className="flex gap-4">
          <button
            className={`text-[14px] px-[14px] py-[8px] rounded-[70px]  ${
              activeCallType === "1:1"
                ? "bg-[#6139FF] hover:bg-customPurple text-white"
                : "bg-white text-[#686A74] border border-[#E0E0E0]"
            }`}
            onClick={() => setActiveCallType("1:1")}
          >
            1:1 Call
          </button>
          <button
            className={`text-[14px] px-[14px] py-[8px] rounded-[70px]  ${
              activeCallType === "Group"
                ? "bg-[#6139FF] hover:bg-customPurple text-white"
                : "bg-white text-[#686A74] border border-[#E0E0E0]"
            }`}
            onClick={() => setActiveCallType("Group")}
          >
            Group Call
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
                <div className="border border-grey bg-[#F7F7F7] w-[45px] h-[45px] rounded-[10px] flex items-center">
              <img src={ICONS.BOOKING} alt="calendar" className="w-[24px] h-[24px] ml-[9px]" /></div>
              <div className="flex items-center gap-4 border-r pr-4 border-gray-300">
                <div>
                  <p className="text-gray-800 font-semibold text-[14px]">
                    {booking.date}
                  </p>
                  <p className="text-gray-600 text-[12px]">
                    {booking.time} • {booking.duration}
                  </p>
                </div>
              </div>
            </div>
            {/* Booking Title */}
            <p className="text-gray-800 font-medium flex-1 text-start ml-[29px]">
              {booking.title}
            </p>
            {/* Status */}
            <div className="text-gray-600 flex gap-4 items-center text-[14px]">
              <span>{booking.participant}</span>
              <span className="  bg-[#EDFBF4] rounded-[8px] text-[14px] px-[8px] py-[3px] text-[#1D874C] font-semibold">
                {booking.status}
              </span>
            </div>
            <button onClick={() => toggleMenu(booking.id)}>
              <img
                src="/icons/verticaldotted.svg"
                alt="More Options"
                className="w-[20px] h-[20px] ml-[25px]"
              />
            </button>
            {/* Dropdown Menu */}
            {menuOpenId === booking.id && (
              <div className="absolute right-[114px]  bg-white shadow-lg rounded-md text-sm z-10">
                <ul>
                  <button
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
                  onClick={openModal}
                  >
                  <img
                    src={ICONS.EVENT_DETAILS}
                    alt="Delete"
                    className="w-5 h-5"
                  />
                    Event details
                  </button>
                  <button
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
                  onClick={() => openRescheduleModal(booking)}
                  >
                  <img
                    src={ICONS.RESCHEDULE}
                    alt="Delete"
                    className="w-5 h-5"
                  />
                    Reschedule
                  </button>
                  <button
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
                  onClick={() => openCancelModal(booking)}
                  >
                  <img
                    src={ICONS.CANCEL}
                    alt="Delete"
                    className="w-5 h-5"
                  />
                    Cancel
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
                </ul>
              </div>
            )}
            {cancelModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg xxl:w-[400px] sm:w-[313px] p-6 relative">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Are you sure?</h2>
                    <button
                      onClick={closeCancelModal}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕ {/* Close symbol */}
                    </button>
                  </div>

                  {/* Modal Content */}
                  <textarea
                    placeholder="Please specify a reason for cancellation"
                    className="xxl:w-[351px] sm:w-[262px] h-[133px] bg-[#F6F6F9] border rounded p-2 mb-4 text-sm"
                  ></textarea>
                  <button
                    onClick={handleCancelBooking}
                    className="w-full text-white py-2  mb-2 rounded-full bg-[#6139FF] py-3 px-2 text-sm font-medium text-white shadow-sm hover:bg-customPurple"
                  >
                    Cancel Booking
                  </button>
                  <p className="text-xs text-center text-black">
                    You can alternatively choose to reschedule
                  </p>
                </div>
              </div>
            )}

            {rescheduleModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg xxl:w-[456px] sm:w-[335px] p-6 relative">
                  {/* Progress Bar */}
                  <div className="flex gap-1 mb-4">
                    {/* First Progress Bar */}
                    <div
                      className={`h-[6px] w-1/2 rounded-full transition-all duration-300 ${
                        currentStep >= 1 ? "bg-indigo-600" : "bg-gray-200"
                      }`}
                    ></div>
                    {/* Second Progress Bar */}
                    <div
                      className={`h-[6px] w-1/2 rounded-full transition-all duration-300 ${
                        currentStep >= 2 ? "bg-indigo-600" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>

                  {/* Modal Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col items-start gap-2">
                      <div>
                        <img
                          src="/icons/calendar.svg" // Replace with your calendar icon
                          alt="Calendar Icon"
                          className="w-[32px] h-[32px] "
                        />
                      </div>
                      <h2 className="xxxl:text-[22px] xxl:text-[20px] font-semibold mb-[-13px]">
                        {currentStep === 1
                          ? "Reschedule Booking"
                          : "Reschedule Booking"}
                      </h2>
                    </div>
                    <button
                      onClick={closeRescheduleModal}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Content for Step 1 */}
                  {currentStep === 1 && (
                    <>
                      {/* Booking Details */}
                      <p className="xxxl:text-[14px] xxl:text-[12px] text-gray-600 mb-4">
                        Gayathri, Sat, 19 Oct. 09:00 - 09:15 AM (GMT+5:30)
                      </p>

                      {/* Date Selection */}
                      <div className="flex gap-2 mb-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                        {[
                          { day: "Mon", date: "23 Sep" },
                          { day: "Tue", date: "24 Sep" },
                          { day: "Wed", date: "25 Sep" },
                          { day: "Thu", date: "26 Sep" },
                          { day: "Fri", date: "27 Sep" },
                          { day: "Sat", date: "28 Sep" },
                          { day: "Sun", date: "29 Sep" },
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            className={`w-[103px] h-[53px] flex flex-col items-center pr-[40px] pl-[40px] pt-[10px] pb-[46px] rounded border ${
                              selectedDate === idx
                                ? "bg-[#EFEBFF] border border-[#B29EFF] "
                                : "text-gray-600"
                            }`}
                            onClick={() => setSelectedDate(idx)}
                          >
                            <span
                              className={`text-[12px] font-medium ${
                                selectedDate === idx
                                  ? "text-[#896BFF]"
                                  : "text-[#999]"
                              }`}
                            >
                              {item.day}
                            </span>
                            <span
                              className={`text-[14px] w-[53px] ${
                                selectedDate === idx
                                  ? "text-[#6139FF]"
                                  : "text-black"
                              }`}
                            >
                              {item.date}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Time Slot Selection */}
                      <div className="grid grid-cols-5 gap-[8px] mb-4">
                        {[
                          "10:00 AM",
                          "10:30 AM",
                          "11:00 PM",
                          "11:30 PM",
                          "12:00 PM",
                          "12.30 PM",
                          "1.00 PM",
                          "1.30 PM",
                          "2.00 PM",
                          "2.30 PM",
                          "3.00 PM",
                          "3.30 PM",
                          "4.00 PM",
                          "4.30 PM",
                          "5.00 PM",
                          "5.30 PM",
                          "6.00 PM",
                          "6.30 PM",
                          "7.00 PM",
                          "7.30 PM",
                          "8.00 PM",
                          "8.30 PM",
                          "9.00 PM",
                          "9.30 PM",
                        ].map((slot, idx) => {
                          const [mainText, smallText] = slot.split(" (");
                          return (
                            <button
                              key={idx}
                              className={`custom-timeing flex flex-col items-center justify-center py-2 px-3 xxl:w-[76px]  xxl:h-[34px] sm:w-[54px] sm:h-[24px] rounded border xxl:text-[12px] sm:text-[7px] font-medium ${
                                selectedTime === idx
                                  ? "bg-[#EFEBFF] border border-[#B29EFF] text-[#6139FF]"
                                  : "text-gray-600"
                              }`}
                              onClick={() => setSelectedTime(idx)}
                              disabled={slot.includes("(full)")}
                            >
                              <span>{mainText}</span>
                              {smallText && (
                                <span className="text-[10px] text-[#FA8F21]">
                                  ({smallText.slice(0, -1)})
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="w-full text-white py-2 mb-2 rounded-full bg-[#6139FF] py-3 px-2 text-sm font-medium text-white shadow-sm hover:bg-customPurple"
                      >
                        Next
                      </button>
                    </>
                  )}

                  {/* Content for Step 2 */}
                  {currentStep === 2 && (
                    <>
                      <p className="xxxl:text-[14px] xxl:text-[12px] text-gray-600 mb-4">
                        Gayathri, Sat, 19 Oct. 09:00 - 09:15 AM (GMT+5:30)
                      </p>

                      {/* Reschedule Date Section */}
                      <div className="flex items-center justify-between border border-gray-300 rounded-[14px] p-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#FFE143] text-black font-bold text-center p-2 rounded-[8px] w-[58px] h-[58px]">
                            <p className="text-[10px]">Sep</p>
                            <p className="text-[22px]">24</p>
                          </div>
                          <div>
                            <p className="text-[16px] font-medium">
                              Tue, 24 Sep
                            </p>
                            <p className="text-[12px] text-gray-500">
                              7:00 - 7:30 PM (GMT+5:30)
                            </p>
                          </div>
                        </div>
                        <button
                          className="text-[14px] border border-gray-300 rounded-[55px] w-[82px] h-[36px]"
                          onClick={() => setCurrentStep(1)}
                        >
                          Change
                        </button>
                      </div>

                      {/* Reschedule Reason */}
                      <textarea
                        placeholder="Reschedule reason (optional)"
                        className="xxl:w-[412px] h-[132px] sm:w-[284px] bg-[#F6F6F9] border rounded-md p-3 text-[14px] mb-[12px] text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      ></textarea>

                      {/* Confirm Button */}
                      <button
                        onClick={handleRescheduleConfirmation}
                        className="w-full text-white py-2 mb-2 rounded-full bg-[#6139FF] py-3 px-2 text-sm font-medium text-white shadow-sm hover:bg-customPurple"
                      >
                        Confirm Reschedule
                      </button>
                    </>
                  )}

                  {/* Footer */}
                  <p className="text-[14px] text-center text-black">
                    A reschedule link will be sent to Gayathri
                  </p>
                </div>
              </div>
            )}
        {isModalOpen && (
        <EventDetailsPopup
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedTab={selectedTab}
        />
      )}
          </div>
        ))}
        {filteredBookings.length === 0 && (
          <p className="text-gray-600 text-center mt-4">
            No {activeTab} bookings found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
