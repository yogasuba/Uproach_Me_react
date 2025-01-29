import React, { useState } from "react";
import Select from "react-select";
import { ICONS } from '../constants';
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";



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
  const [selectedDates, setSelectedDates] = useState([]);

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-lg font-semibold mb-3">Select date(s) you are unavailable on</h2>

        <DatePicker
          multiple
          value={selectedDates}
          onChange={setSelectedDates}
          className="w-full"
        />

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
          <button onClick={() => onSave(selectedDates)} className="px-4 py-2 bg-black text-white rounded-md">Block dates</button>
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
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[18px] font-semibold">Default</h2>
            <button className="px-6 py-2 bg-purple-600 text-white text-[14px] rounded-full hover:bg-purple-700 lg:mr-[22px] mr-0">
              Save Changes
            </button>
          </div>

          {Object.keys(availability).map((day) => (
            <div key={day} className="mb-6">
              <div className="flex flex-wrap items-start space-x-3">
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

        <div className="w-full lg:w-[40%] h-[160px] border border-[#F2F2F2] p-4 rounded-lg mt-6 lg:mt-0">
          <h3 className="text-[16px] font-semibold mb-2">Block dates</h3>
          <p className="text-gray-500 text-[14px]">Add Dates When You Will Be Unavailable To Take Calls</p>
          <button onClick={() => setIsModalOpen(true)} className="text-[14px] w-full mt-3 px-4 py-2 bg-[#F4F4F6] rounded-full">
          Add unavailable dates
        </button>
        <UnavailableDatesPicker 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={(dates) => {
            setBlockedDates(dates);
            setIsModalOpen(false);
          }}
        />
        </div>
      </div>
    </div>
  );
};

export default Availability;
