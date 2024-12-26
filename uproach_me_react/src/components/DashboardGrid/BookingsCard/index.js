import React, { useState, useEffect } from "react";
import EventDetailsPopup from './Menus';
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import { ICONS } from "../../../constants";

const BookingsCard = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [needActionCount, setNeedActionCount] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const [menuOpenId, setMenuOpenId] = useState(null); // Track which menu is open
  const [cancelModalOpen, setCancelModalOpen] = useState(false); // Track modal visibility
  const [selectedBooking, setSelectedBooking] = useState(null); // Track the booking to be canceled
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false); // Example modal state
  const [currentStep, setCurrentStep] = useState(1); // Step state: 1 or 2
  const [selectedDate, setSelectedDate] = useState(null); // For date selection
  const [selectedTime, setSelectedTime] = useState(null); // For time selection
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data from the backend
    setTimeout(() => {
      const dummyData = [
        {
          id: 1,
          title: "Quick chat on design",
          date: "Tue, 24 Sep",
          price: "Free",
          needsAction: false, // Does not need action
          isMissed: true, // Booking is missed
        },
        {
          id: 2,
          title: "Follow-up session",
          date: "Fri, 27 Sep",
          price: "$20.00",
          needsAction: false, // Needs action
          isMissed: true, // Booking is missed
        },
        {
          id: 3,
          title: "Feedback session",
          date: "Mon, 30 Sep",
          price: "Free",
          needsAction: false, // Needs action
          isMissed: true, // Booking is missed
        },
        {
          id: 4,
          title: "Quick chat on design",
          date: "Mon, 30 Sep",
          price: "Free",
          needsAction: false, // Needs action
          isMissed: true, // Booking is missed
        },
        {
          id: 5,
          title: "Feedback session",
          date: "Mon, 30 Sep",
          price: "Free",
          needsAction: false, // Needs action
          isMissed: true, // Booking is missed
        },
        {
          id: 6,
          title: "Quick chat on design",
          date: "Tue, 24 Sep",
          price: "Free",
          needsAction: true, // Does not need action
          isMissed: true, // Booking is missed
        },
        
      ];

      setBookingsData(dummyData);

      // Count bookings needing action
      const actionCount = dummyData.filter((booking) => booking.needsAction)
        .length;
      setNeedActionCount(actionCount);
    }, 1000); // Simulating an API call delay
  }, []);

  const toggleMenu = (id) => {
    setMenuOpenId(menuOpenId === id ? null : id); // Open or close menu for the clicked booking
  };

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const handleMarkAsComplete = (id) => {
    setBookingsData((prevData) =>
      prevData.map((booking) =>
        booking.id === id ? { ...booking, needsAction: false } : booking
      )
    );
    setNeedActionCount((prevCount) => prevCount - 1);
  };
  
  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
    setSelectedBooking(null);
  };

  const handleCancelBooking = () => {
    alert(`Booking "${selectedBooking?.title}" canceled!`);
    closeCancelModal();
  };

  const openRescheduleModal = () => {
    setRescheduleModalOpen(true);
  };
  
  const closeRescheduleModal = () => setRescheduleModalOpen(false);



  const handleRescheduleConfirmation = () => {
    // Logic to handle final reschedule confirmation
    console.log('Reschedule confirmed!');
    closeRescheduleModal();
  };

  const handleViewAll = () => {
    navigate("/bookings", { state: { bookings: bookingsData } });
  };



  return (
    <div>
      <h3 className="text-[18px] font-bold">Bookings</h3>

      {bookingsData.length === 0 ? (
        <>
          <img
            src="/icons/work-work-from-home.svg"
            alt="No Bookings"
            className="xxxl:w-[180.65px] xxxl:h-[180.65px] xxl:w-[250px] xxl:h-[178px] mt-[78px] xxxl:ml-[65px] xxl:ml-[0px]"
          />
          <div className="bg-muted h-[250px] mt-4 rounded"></div>

        </>
      ) : (
        <>
          <div className="mt-4 flex border-b">
            <button
              className={`text-sm px-4 py-2 ${
                selectedTab === "Upcoming"
                  ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("Upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`text-sm px-4 py-2 relative ${
                selectedTab === "Need action"
                  ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedTab("Need action")}
            >
              Need action
              {needActionCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {needActionCount}
                </span>
              )}
            </button>
          </div>

          <div className="mt-4">
            {/* Upcoming Tab */}
            {selectedTab === "Upcoming" && (
              <>
                {bookingsData
                  .filter((booking) => !booking.needsAction)
                  .slice(0, 4) // Show only first 3 upcoming bookings
                  .map((booking, index) => (
                    <div key={booking.id} className="relative">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-gray-100 p-2 rounded w-[45px] h-[45px]">
                            <img
                              src={ICONS.BOOKING}
                              alt="Calendar Icon"
                              className="w-[24px] h-[24px] ml-[3px] mt-[2px]"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{booking.title}</p>
                            <p className="text-xs text-gray-500">
                              {booking.date} • {booking.price}
                            </p>
                          </div>
                        </div>
                        <button onClick={() => toggleMenu(booking.id)}>
                          <img
                            src="/icons/verticaldotted.svg"
                            alt="More Options"
                            className="w-[20px] h-[20px]"
                          />
                        </button>
                          {/* Dropdown Menu */}
                          {menuOpenId === booking.id && (
                          <div className="absolute right-0 mt-40 bg-white shadow-lg rounded-md text-sm z-10">
                            <ul>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={openModal}
                              >
                                Event details
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => openRescheduleModal(booking)}
                              >
                                Reschedule
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => openCancelModal(booking)}
                              >
                                Cancel
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Horizontal Line */}
                      {index < 3 && <hr className="border-t border-gray-300 mt-2 mb-5" />}
                    </div>
                  ))}
                {bookingsData.filter((booking) => !booking.needsAction).length > 4 && (
                  <button
                    className=" absolute bottom-4 left-4 text-indigo-600 text-sm font-medium hover:underline"
                    onClick={handleViewAll}
                  >
                    View All Content
                  </button>
                )}
              </>
            )}

            {/* Need action Tab */}
            {selectedTab === "Need action" &&
              bookingsData
                .filter((booking) => booking.needsAction)
                .map((booking, index, filteredBookings) => (
                  <div key={booking.id} className="relative">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col items-center gap-2">
                        {booking.isMissed && (
                          <p className="text-xs text-red-500 font-medium">Missed</p>
                        )}
                        <div className="flex items-center gap-4">
                          <div className="bg-[#FFF0F1] border border-[#FFD6D8] p-2 rounded-[10px] mt-[-47px] w-[45px] h-[45px]">
                          <img
                                src="/icons/red-calendar.svg" // Icon for actions needed
                                alt="Attention Icon"
                                className="w-[24px] h-[24px] ml-[3px] mt-[2px]"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{booking.title}</p>
                              <p className="text-xs text-gray-500">
                                {booking.date} • {booking.price}
                              </p>

                              <div className="mt-5 ml-[-61px]">
                              {/* Mark as Complete Button with Tick Icon */}
                              {booking.needsAction && (
                                <button
                                  className="flex items-center text-indigo-600 text-sm font-medium mt-1 text-left"
                                  onClick={() => handleMarkAsComplete(booking.id)}
                                >
                                  <img
                                    src="/icons/check-circle.svg" // Replace with your tick icon path
                                    alt="Tick Icon"
                                    className="w-[16px] h-[16px] mr-2"
                                  />
                                  Mark as complete
                                </button>
                              )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => toggleMenu(booking.id)}>
                          <img
                            src="/icons/verticaldotted.svg"
                            alt="More Options"
                            className="w-[20px] h-[20px]"
                          />
                        </button>

                        {/* Dropdown Menu */}
                        {menuOpenId === booking.id && (
                          <div className="absolute right-0 mt-40 bg-white shadow-lg rounded-md text-sm z-10">
                            <ul>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={openModal}
                              >
                                Event details
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => openRescheduleModal(booking)}
                              >
                                Reschedule
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => openCancelModal(booking)}
                              >
                                Cancel
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Horizontal Line */}
                      {index < filteredBookings.length - 1 && (
                        <hr className="border-t border-gray-300 mt-[21px] mb-[21px]" />
                      )}
                    </div>
                  ))}


            {selectedTab === "Need action" &&
              bookingsData.filter((booking) => booking.needsAction).length ===
                0 && (
                <p className="text-sm text-gray-500">No actions needed.</p>
              )}
          </div>
        </>
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
      currentStep >= 1 ? 'bg-indigo-600' : 'bg-gray-200'
    }`}
  ></div>
  {/* Second Progress Bar */}
  <div
    className={`h-[6px] w-1/2 rounded-full transition-all duration-300 ${
      currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'
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
              className="w-[32px] h-[32px]"
            />
          </div>
          <h2 className="xxxl:text-[22px] xxl:text-[20px] font-semibold mb-[-13px]">
            {currentStep === 1 ? "Reschedule Booking" : "Reschedule Booking"}
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
                  selectedDate === idx ? "bg-[#EFEBFF] border border-[#B29EFF] " : "text-gray-600"
                }`}
                onClick={() => setSelectedDate(idx)}
              >
                <span
                  className={`text-[12px] font-medium ${
                    selectedDate === idx ? "text-[#896BFF]" : "text-[#999]"
                  }`}
                >
                  {item.day}
                </span>
                <span
                  className={`text-[14px] w-[53px] ${
                    selectedDate === idx ? "text-[#6139FF]" : "text-black"
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
                    selectedTime === idx ? "bg-[#EFEBFF] border border-[#B29EFF] text-[#6139FF]" : "text-gray-600"
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
                  <p className="text-[16px] font-medium">Tue, 24 Sep</p>
                  <p className="text-[12px] text-gray-500">7:00 - 7:30 PM (GMT+5:30)</p>
                </div>
              </div>
              <button className="text-[14px] border border-gray-300 rounded-[55px] w-[82px] h-[36px]"
              onClick={() => setCurrentStep(1)}>Change</button>
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
  );
};

export default BookingsCard;
