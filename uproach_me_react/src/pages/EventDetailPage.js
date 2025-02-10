// src/pages/EventDetailPage.js
import React, { useState, useEffect,useMemo,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ProfileHeader } from '../components/ProfileHeader';
import axios from "axios";
import {ICONS } from '../constants';


const EventDetailPage = () => {
  useEffect(() => {
    document.title = 'Events'; // Set your desired page title here
  }, []);

  const location = useLocation();
  const eventId = location.state?.eventId; // Retrieve eventId from state
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());
  const [bookedSlots, setBookedSlots] = useState([]);


  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

    // Times for time selection
  const times = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'
  ];
  const timeZones = [
    { label: "(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi (IST)", value: "GMT+5:30" },
    { label: "(GMT+0:00) London", value: "GMT+0:00" },
    { label: "(GMT-5:00) New York", value: "GMT-5:00" },
    { label: "(GMT+8:00) Singapore", value: "GMT+8:00" },
    // Add more time zones as needed
  ];
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZones[0].value);

  const getNextSevenDays = (year, month) => {
    const daysArray = [];
    const firstDayOfMonth = new Date(year, month, 1);

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(firstDayOfMonth);
      nextDay.setDate(firstDayOfMonth.getDate() + i);

      daysArray.push({
        day: nextDay.toLocaleString("en-US", { weekday: "short" }),
        date: nextDay.toLocaleString("en-US", { day: "numeric", month: "short" }),
        fullDate: nextDay
      });
    }
    return daysArray;
  };

  const [days, setDays] = useState(getNextSevenDays(currentYear, selectedMonth));

  const formatSelectedDate = useCallback((selectedDay) => {
    if (selectedDay !== null && days[selectedDay]) {
      const { fullDate } = days[selectedDay];
      return {
        month: fullDate.toLocaleString("en-US", { month: "short" }),
        day: fullDate.toLocaleString("en-US", { day: "numeric" }),
        fullDate: fullDate.toLocaleString("en-US", { weekday: "long", day: "numeric", month: "short" })
      };
    }
    return {};
  }, [days]);
  

  const getTimeRange = (selectedTime) => {
    if (selectedTime !== null) {
      const startTime = times[selectedTime];
      const [time, modifier] = startTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      minutes += 30;
      if (minutes >= 60) {
        minutes -= 60;
        hours = (hours + 1) % 12;
      }
      if (hours === 0) hours = 12;

      return `${startTime} to ${hours}:${minutes < 10 ? "0" + minutes : minutes} ${modifier}`;
    }
    return "";
  };
  
  const selectedDateInfo = useMemo(() => {
    return selectedDate !== null ? formatSelectedDate(selectedDate) : {};
  }, [selectedDate, formatSelectedDate]);
  
  const selectedTimeRange = getTimeRange(selectedTime);
  

  useEffect(() => {
    if (!eventId) {
      setError("Event ID is missing!");
      setLoading(false);
      return;
    }

    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/event/${eventId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEventDetails(response.data.event);
      } catch (err) {
        setError("Failed to fetch event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchBookedSlots = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/getEventSlotsWithoutBookings",
          {
            eventId : eventId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookedSlots(response.data.bookedSlots || []);
      } catch (err) {
        console.error("Failed to fetch booked slots.", err);
      }
    };

    fetchEventDetails();
    fetchBookedSlots();
  }, [eventId]);

  const handleBooking = async () => {
    if (selectedDate !== null && selectedTime !== null) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.post(
          "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/createBooking",
          {
            eventId : eventId,
            date: selectedDate,
            time: times[selectedTime],
            timeZone: selectedTimeZone,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        navigate("/booking-confirmation");
      } catch (err) {
        console.error("Booking failed", err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;



  return (
    <div className="min-h-screen flex flex-col">
      <button className="flex items-center text-gray-800 font-bold p-2" onClick={() => navigate(-1)}>
        <img src="/icons/back-arrow.svg" alt="Back Arrow" width={16} height={16} />
        <span className="ml-2">Back</span>
      </button>
      <ProfileHeader />

      <div className="flex-1 w-full mx-auto grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-1 pt-1">
        <div className="bg-white p-6 shadow-md w-full sm:order-2 xl:order-1">
          <div className="flex items-center mb-4 cursor-pointer" onClick={toggleDropdown}>
            <h2 className="text-xl font-semibold">{months[selectedMonth]} {currentYear}</h2>
            <img src="/icons/arrow-down-icon.svg" alt="Arrow Down Icon" width={24} height={24} className="ml-2" />
          </div>

          {isDropdownOpen && (
            <div className="absolute left-0 ml-2 w-48 bg-white border border-gray-200 shadow-md rounded-lg z-10 max-h-48 overflow-y-auto">
              {months.map((month, index) => (
                <button
                  key={index}
                  onClick={() => { 
                    setSelectedMonth(index); 
                    setDays(getNextSevenDays(currentYear, index)); 
                    setIsDropdownOpen(false); 
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {month}
                </button>
              ))}
            </div>
          )}

          <div className="sm:overflow-x-auto sm:flex sm:space-x-4 xl:space-x-0 sm:w-full xl:grid xl:grid-cols-7 gap-2 text-center mb-6">
            {days.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(selectedDate === index ? null : index)}
                className={`flex flex-col items-center justify-center xl:py-4 sm:py-2 sm:pl-10 sm:pr-10 xl:pl-0 xl:pr-0 border rounded ${
                  selectedDate === index
                    ? "border-purple-500 bg-purple-100"
                    : "border-[1px solid rgba(0, 0, 0, 0.15)]"
                }`}
              >
                <div className="xl:text-sm sm:text-lg font-medium text-gray-400">{item.day}</div>
                <div className="xl:text-lg sm:text-[13px] xl:font-semibold sm:font-bold">{item.date}</div>
              </button>
            ))}
          </div>

          {selectedMonth === new Date().getMonth() ? (
            <>
              {/* Time Zone Selection */}
              <div className="mb-6">
              <div className="text-m font-semibold mb-1">Time Zone:</div>
              <div className="relative inline-block text-sm text-gray-500 mt-2">
                <select
                  className=" text-gray-500 rounded leading-tight focus:outline-none sm:w-[266px] xxxl:w-full"
                  onChange={(e) => setSelectedTimeZone(e.target.value)}
                  value={selectedTimeZone}
                >
                  {timeZones.map((zone, index) => (
                    <option key={index} value={zone.value}>
                      {zone.label}
                    </option>
                  ))}
                </select>

              </div>
            </div>


              {/* Time Selection */}
              <h3 className="text-m font-semibold mb-2">Select Time Of Day</h3>
              <div className="grid xl:grid-cols-6 sm:grid-cols-4 gap-2 mt-4">
                {times.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(selectedTime === index ? null : index)}
                    disabled={bookedSlots.includes(time)}
                    className={`border w-full xl:py-2 sm:py-2 rounded-md ${
                      selectedTime === index
                        ? "border-purple-500 bg-purple-100"
                        : "border-[1px solid rgba(0, 0, 0, 0.15)]"
                    }`+(bookedSlots.includes(time) ? "cursor-not-allowed opacity-50" : "")}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              {/* Fallback Image and Description */}
              <img
                className="xl:ml-60 sm:ml-10"
                src="https://tresmares.com/wp-content/uploads/2023/03/Searching-1.svg"
                alt="Seguros de caza en Cantabria"
                width={250}
                height={250}
              />
              <p className="text-lg text-gray-500">Description</p>
            </div>
          )}
          <div className="mt-10 text-sm text-gray-500 text-center">
            Powered by <a href="https://example.com" className="text-purple-600 font-bold hover:underline ml-1">Uproach.Me</a>
          </div>
        </div>

        <div className="bg-white p-6 shadow-md w-full sm:order-1 xl:order-2">
          <h1 className="text-xl font-bold text-gray-800">{eventDetails.title}</h1>
          {eventDetails.pricing.amount && eventDetails?.pricing.amount !== "free" && (
            <div className="text-2xl font-bold text-gray-800 mt-4">
              ₹ {eventDetails.pricing.amount} <span className="text-gray-800 text-sm ml-1">Price</span>
            </div>
          )}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center text-gray-600 font-bold space-x-2 text-sm">
              <img src="/icons/clock.svg" alt="Clock Icon" width={20} height={20} />
              <span>Duration {eventDetails.duration}min</span>
            </div>
            <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center text-gray-600 font-bold space-x-2 text-sm">
                {eventDetails.location === "google-meet" && (
                  <>
                    <img src={ICONS.GOOGLE_MEET} alt="Google Meet Icon" width={20} height={20} />
                    <span>Google Meet</span>
                  </>
                )}
                {eventDetails.location === "zoom-meet" && (
                  <>
                    <img src={ICONS.ZOOM_MEET} alt="Zoom Icon" width={20} height={20} />
                    <span>Zoom Meet</span>
                  </>
                )}
                {eventDetails.location === "in-person" && (
                  <>
                    <img src={ICONS.INPERSON} alt="Microsoft Teams Icon" width={20} height={20} />
                    <span>In-Person</span>
                  </>
                )}
                {eventDetails.location === "phone-call" && (
                  <>
                    <img src={ICONS.CALL} alt="In-Person Location Icon" width={20} height={20} />
                    <span>Phone Call</span>
                  </>
                )}
              </div>
              </div>

          <h3 className="text-lg font-semibold mt-6">Description</h3>
          <p className="text-gray-600 mt-2 leading-relaxed">{eventDetails.description}</p>
          <div className="mt-6">
            {selectedDate !== null && selectedTime !== null && (
              <div className="flex items-center border-2 border-gray-200 p-4 rounded-md space-x-4">
                <div className="flex items-center justify-center w-12 h-12 border-2 border-yellow-400 bg-yellow-300 rounded-md">
                  <div className="text-center">
                    <div className="text-xs font-bold">{selectedDateInfo.month}</div>
                    <div className="text-lg font-bold">{selectedDateInfo.day}</div>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">{selectedDateInfo.fullDate}</p>
                  <p className="text-sm text-gray-600">{selectedTimeRange} ({selectedTimeZone})</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 sm:fixed sm:bottom-0 sm:left-0 sm:right-0 sm:bg-white sm:p-4 sm:w-full sm:border-t sm:border-gray-200 sm:z-50 xl:relative xl:mt-8">
            <button
              className={`px-6 py-3 text-lg font-semibold w-full rounded-md ${
                selectedDate !== null && selectedTime !== null
                  ? "bg-purple-600 hover:bg-purple-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleBooking}
              disabled={selectedDate === null || selectedTime === null}
            >
              Confirm Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventDetailPage;
