import React, { useState } from "react";
import Select from "react-select";
import { ICONS } from '../constants';
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import DateObject from "react-date-object";
import "../styles.css"
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";



const generateTimeSlots = (start, end, interval) => {
  const times = [];
  let current = start;

  while (current <= end) {
    const hours = Math.floor(current / 60);
    const minutes = current % 60;
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    times.push({
      value: `${formattedHours}:${formattedMinutes} ${ampm}`,
      label: `${formattedHours}:${formattedMinutes} ${ampm}`,
    });
    current += interval;
  }

  return times;
};

const timeOptions = generateTimeSlots(7 * 60 + 45, 22 * 60, 15);

dayjs.extend(isSameOrBefore);

const generateDateRange = (start, end) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const dates = [];

  let currentDate = startDate;
  while (currentDate.isSameOrBefore(endDate)) {
    dates.push(currentDate.format("DD MMMM YYYY"));
    currentDate = currentDate.add(1, "day");
  }

  return dates;
};

const TimeDropdown = ({ selectedTime, onChange, placeholder }) => (
  <Select
    options={timeOptions}
    value={timeOptions.find((option) => option.value === selectedTime) || ""}
    onChange={onChange}
    className="w-full sm:w-40"
    placeholder={placeholder}
  />
);
const UnavailableDatesPicker = ({ isOpen, onClose, onSave }) => {
  const [values, setValues] = useState([new DateObject()]);

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[305px] shadow-lg">
        <h2 className="text-lg font-semibold mb-3">Select date(s) you are unavailable on</h2>
        <div>
        <Calendar 
          value={values} 
          onChange={setValues} 
          range 
          rangeHover 
          className="custom-calendar-container"
        />
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-10 py-2 border text-[14px] rounded-full bg-[#F3F4F6]">Cancel</button>
          <button onClick={() => onSave(values)} className="px-7 py-2 bg-black text-white text-[14px] rounded-full">Block dates</button>
        </div>
      </div>
    </div>
  ) : null;
};
const Availability = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockedDates, setBlockedDates] = useState([]);

  const [availability, setAvailability] = useState({
    Monday: { enabled: true, slots: [{ start: "", end: "" }] },
    Tuesday: { enabled: false, slots: [] },
    Wednesday: { enabled: false, slots: [] },
    Thursday: { enabled: false, slots: [] },
    Friday: { enabled: false, slots: [] },
    Saturday: { enabled: false, slots: [] },
    Sunday: { enabled: false, slots: [] },
  });

  const toggleDay = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        slots: prev[day].enabled ? [] : [{ start: "", end: "" }],
      },
    }));
  };

  const handleTimeChange = (day, index, field, value) => {
    const updatedSlots = [...availability[day].slots];
    updatedSlots[index][field] = value;
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], slots: updatedSlots },
    }));
  };

  const addSlot = (day) => {
    setAvailability((prev) => {
      const newSlots = [...prev[day].slots, { start: "", end: "" }];
      return {
        ...prev,
        [day]: { ...prev[day], slots: newSlots },
      };
    });
  };

  const removeSlot = (day, index) => {
    setAvailability((prev) => {
      const updatedSlots = prev[day].slots.filter((_, i) => i !== index);
      return {
        ...prev,
        [day]: { ...prev[day], slots: updatedSlots },
      };
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 class="text-2xl font-bold mb-6">Availability</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[18px] font-semibold">Default</h2>
            <button className="px-6 py-2 bg-[rgb(97,57,255)] text-white text-[14px] rounded-full hover:bg-customPurple lg:mr-[26px] mr-0">
              Save Changes
            </button>
          </div>

          {Object.keys(availability).map((day) => (
            <div key={day} className="mb-6">
              <div className="flex flex-wrap items-start space-x-2">
                <input
                  type="checkbox"
                  checked={availability[day].enabled}
                  onChange={() => toggleDay(day)}
                  className="form-checkbox h-5 w-5 text-blue-600 mt-1"
                />
                <span className="text-[14px] font-medium w-24">{day}</span>
                {availability[day].enabled ? (
                  <div className="flex flex-col space-y-2 w-full sm:w-auto ">
                    {availability[day].slots.map((slot, index) => (
                      <div key={index} className="flex flex-wrap items-center space-x-2 text-[14px] ">
                        <TimeDropdown
                          selectedTime={slot.start}
                          onChange={(option) => handleTimeChange(day, index, "start", option.value)}
                          placeholder="From"
                        />
                        <span>-</span>
                        <TimeDropdown
                          selectedTime={slot.end}
                          onChange={(option) => handleTimeChange(day, index, "end", option.value)}
                          placeholder="To"
                        />
                        {index === 0 ? (
                          <button onClick={() => addSlot(day)} className="p-2 rounded-full">
                            <img src={ICONS.PLUS_CIRCLE} alt="Add slot" className="w-5 h-5" />
                          </button>
                        ) : (
                          <button onClick={() => removeSlot(day, index)} className="p-2 rounded-full">
                            <img src={ICONS.X} alt="Delete slot" className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 text-[14px]">Unavailable</span>
                )}
              </div>
              <hr className="my-4 border-gray-300 lg:w-[509px] w-full" />
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[47%] border border-[#F2F2F2] p-4 rounded-lg mt-6 lg:mt-0" style={{ minHeight: '183px', maxHeight: blockedDates.length > 0 ? `${160 + blockedDates.length * 40}px` : '160px', overflow: 'hidden' }}>
        <h2 className="text-[16px] font-semibold mb-2">Set Availability</h2>
        <p className="text-gray-500 text-[14px] mb-4">Add Dates When You Will Be Unavailable To Take Calls</p>
        <button onClick={() => setIsModalOpen(true)} className="text-[14px] w-full mt-3 px-4 py-2 bg-[#F4F4F6] rounded-full">
          Add unavailable dates
        </button>

        <UnavailableDatesPicker
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={(selectedDates) => {
              const [start, end] = selectedDates;
              const newDates = generateDateRange(start, end);
              setBlockedDates((prevDates) => [...prevDates, ...newDates]);
              setIsModalOpen(false);
            }}
          />

        <div className="mt-4">
            {blockedDates.length > 0 ? (
              <ul>
                {blockedDates.map((date, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b text-[14px]">
                    <span>{date}</span>
                    <span className="text-gray-500">Unavailable</span>
                    <button onClick={() => setBlockedDates(blockedDates.filter((_, i) => i !== index))}>
                      <img src={ICONS.TRASH} alt="Delete" className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-[14px]">No blocked dates added</p>
            )}
        </div>
    </div>


      </div>
    </div>
  );
};

export default Availability;
