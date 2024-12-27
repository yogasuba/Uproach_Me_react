// src/pages/EventDetailPage.js
import React, { useState, useEffect,useMemo,useCallback} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileHeader } from '../components/ProfileHeader';

export const eventDetails = {
    'quick-chat-on-design': {
      title: 'Quick Chat On Design',
      duration: '10 Min',
      price: '',
      type: 'Video Meeting',
      description:
        'This quick chat is perfect for brainstorming ideas, discussing a design challenge, or getting quick feedback on your current project.',
    },
    'career-guidance': {
      title: 'Career Guidance',
      duration: '10 Min',
      price: '₹500',
      type: 'Video Meeting',
      description:
        'Get personalized career advice from industry experts to help you navigate your professional journey.',
    },
    '1-1-mentorship': {
      title: '1:1 Mentorship',
      duration: '10 Min',
      price: '₹500',
      type: 'Video Meeting',
      description:
        'One-on-one mentorship to help you grow your career and get professional guidance tailored to your goals.',
    },
    'designer-s-resume-review': {
      title: 'Designer’s Resume Review',
      duration: '10 Min',
      price: '₹500',
      type: 'Video Meeting',
      description:
        'Get feedback on your resume from design professionals to enhance your chances of landing a job.',
    },
    'design-portfolio-review': {
      title: 'Design Portfolio Review',
      duration: '10 Min',
      price: '₹500',
      type: 'Video Meeting',
      description:
        'Receive constructive feedback on your design portfolio to help improve your work.',
    },
    'ui-design-kickstarter': {
      title: 'UI Design Kickstarter',
      duration: '10 Min',
      price: '₹500',
      type: 'Video Meeting',
      description:
        'Kickstart your UI design project with expert guidance and insights.',
    },
  };
  

export default function EventDetailPage() {
  useEffect(() => {
    document.title = 'Events'; // Set your desired page title here
  }, []);

  const navigate = useNavigate();
  const { slug } = useParams();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());

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
    localStorage.setItem("selectedDateInfo", JSON.stringify(selectedDateInfo));
    localStorage.setItem("selectedTimeRange", selectedTimeRange);
  }, [selectedDateInfo, selectedTimeRange]);

  const event = eventDetails[slug];

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-600">Event Not Found</h1>
        <button
          className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/home")}
        >
          Go Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="xxl:min-h-screen sm:h-[1158px] flex flex-col sm:mt-[77px] xxl:mt-0">
      <button className="flex items-center text-gray-800 font-bold p-2" onClick={() => navigate(-1)}>
        <img src="/icons/back-arrow.svg" alt="Back Arrow" width={16} height={16} />
        <span className="ml-2">Back</span>
      </button>
      <ProfileHeader />

      <div className="flex-1 w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-1 pt-1">
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
                {/* Time Zone and Time Selection */}
                <div className="mb-4">
                <strong className="text-m font-semibold mb-3">Time Zone:</strong>
                <div className="text-sm text-gray-500 mt-2 mb-6 flex items-center">
                    (GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi (IST)
                    <img src="/icons/chevron-down.svg" alt="Arrow Down Icon" width={24} height={24} className="ml-2" />
                </div>
                </div>

                <h3 className="text-m font-semibold mb-2">Select Time Of Day</h3>
                <div className="grid xl:grid-cols-6 sm:grid-cols-4 gap-2 mt-4">
                {times.map((time, index) => (
                    <button
                    key={index}
                    onClick={() => setSelectedTime(selectedTime === index ? null : index)}
                    className={`border w-full xl:py-2 sm:py-2 rounded-md ${
                        selectedTime === index
                        ? "border-purple-500 bg-purple-100"
                        : "border-[1px solid rgba(0, 0, 0, 0.15)]"
                    }`}
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
          <h1 className="text-xl font-bold text-gray-800">{event.title}</h1>
          {event.price && event.price !== "free" && (
            <div className="text-2xl font-bold text-gray-800 mt-4">
              {event.price} <span className="text-gray-800 text-sm ml-2">Price</span>
            </div>
          )}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center text-gray-600 font-bold space-x-2 text-sm">
              <img src="/icons/clock.svg" alt="Clock Icon" width={20} height={20} />
              <span>Duration 30 Min</span>
            </div>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center text-gray-600 font-bold space-x-2 text-sm">
              <img src="/icons/google-meet.svg" alt="Google Meet Icon" width={20} height={20} />
              <span>Google Meet</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6">Description</h3>
          <p className="text-gray-600 mt-2 leading-relaxed">{event.description}</p>
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
                  <p className="text-sm text-gray-600">{selectedTimeRange} (GMT +05:30)</p>
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
              onClick={() => {
                if (selectedDate !== null && selectedTime !== null) {
                  navigate(`/booking/${slug}`);
                }
              }}
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
