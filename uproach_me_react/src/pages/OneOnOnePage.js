import React, { useState, useEffect,useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "@emoji-mart/react";



const OneOnOnePage = () => {
  const [duration, setDuration] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [weekDays, setWeekDays] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [step, setStep] = useState(1);
  const [meetingType, setMeetingType] = useState("");
  const [sellSessionRecording, setSellSessionRecording] = useState(false);
  const [increaseConversation, setIncreaseConversation] = useState(false);
  const [text, setText] = useState(""); // State to store textarea value
  const textareaRef = useRef(null); // Ref to manipulate the textarea
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
      days.push(`${dayName} ${dayNumber}`);
    }

    setWeekDays(days);
  }, []);


  // Function to insert emojis
  const insertEmoji = (emoji) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(start);

    setText(beforeText + emoji.native + afterText);

    // Reset cursor position after emoji insertion
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + emoji.native.length;
      textarea.focus();
    }, 0);
    setShowEmojiPicker(false);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Section (Scrollable) */}
      <div className="w-full md:w-1/3 bg-white p-8 overflow-y-scroll scrollbar-hide">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center mb-6">
            {[1, 2, 3, 4].map((stepNumber, index) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-[24px] h-[24px] flex items-center justify-center rounded-full text-white font-semibold ${
                    stepNumber <= step ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {stepNumber}
                </div>
                {index < 3 && (
                  <div
                    className={`w-[28px] h-[1px] ${
                      stepNumber < step ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <h1 className="text-[24px] font-semibold text-gray-800 mb-2 text-center">
                Create event page
              </h1>
              <p className="text-[14px] text-gray-600 text-center mb-6">
                Enter your booking page title and description to let people know who
                they’re booking with.
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-[24px] font-semibold text-gray-800 mb-2 text-center">
                Set your availability
              </h1>
              <p className="text-[14px] text-gray-600 text-center mb-6">
                Set the length of your meetings, and define ranges of time when you’re available.
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-[24px] font-semibold text-gray-800 mb-2 text-center">
                Choose a location
              </h1>
              <p className="text-[14px] text-gray-600 text-center mb-6">
                Decide whether you would like to meet in person or a web conference.
              </p>
            </>
          )}
        </div>

        {/* Bottom Section */}
        <div>
          {step === 1 && (
            <>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Title"
                  className="custom-inputfeild w-full text-[14px] p-[10px] border border-[#CCCDD6] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>

              <div className="mb-6">
                {/* Toolbar */}
                <div className="flex items-center justify-between p-2 border border-[#CCCDD6] rounded-t-lg bg-gray-100">
                    <div className="flex space-x-2 text-gray-600">
                    <button
                        type="button"
                        className="p-1 hover:text-black"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        <BsEmojiSmile />
                    </button>
                    </div>
                </div>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <div className="absolute z-10 p-2 border border-gray-300 bg-white rounded-lg">
                    <Picker
                        onEmojiSelect={insertEmoji}
                        theme="light" // Change to "dark" if needed
                    />
                    </div>
                )}

                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Description..."
                    rows={4}
                    className="w-full text-[14px] p-[10px] border border-[#CCCDD6] rounded-b-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                ></textarea>
                </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-[14px] font-medium mb-2">
                  How long are you meeting for?
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="custom-inputfeild w-full text-[14px] text-[#80828D] p-[12px] border border-[#CCCDD6] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="" disabled>
                    Duration
                  </option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
              <div className="flex items-center mb-[10rem]">
                <input
                  type="checkbox"
                  id="hideService"
                  className="hidden"
                  checked={isHidden}
                  onChange={() => setIsHidden(!isHidden)}
                />
                <label
                  htmlFor="hideService"
                  className={`relative w-8 h-4 flex items-center rounded-full cursor-pointer transition-colors ${
                    isHidden ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${
                      isHidden ? "translate-x-4" : "translate-x-0"
                    }`}
                  ></div>
                </label>
                <span className="ml-3 text-sm text-gray-700 ">
                  Hide this service on your profile
                </span>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 text-[14px] font-medium mb-2">
                  How long are you meeting for?
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="custom-inputfeild w-full text-[14px] text-[#80828D] p-[12px] border border-[#CCCDD6] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="" disabled>
                    Duration
                  </option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-[14px] font-medium mb-2">
                  Repeats Every
                </label>
                <div className="flex space-x-2 mb-[10rem]">
                  {weekDays.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDayIndex(index)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium transition-colors ${
                        selectedDayIndex === index
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {date.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 text-[14px] font-medium mb-2">
                  How do you want to meet?
                </label>
                <select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  className="custom-inputfeild w-full mb-[10rem] text-[14px] text-[#80828D] p-[12px] border border-[#CCCDD6] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="" disabled>
                    Choose how you'll meet
                  </option>
                  <option value="in-person">In Person</option>
                  <option value="web-conference">Web Conference</option>
                </select>
              </div>
            </>
          )}
            {step === 4 && (
                <>
                <h1 className="text-[24px] font-semibold text-gray-800 mb-2 text-center">
                    Pricing
                </h1>
                <p className="text-[14px] text-gray-600 text-center mb-6">
                    Lorem ipsum dolor sit amet condt sifd evn nakjdcn hbncin jniunl
                </p>

                {/* Amount Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-[14px] font-medium mb-2">
                    Amount
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                    <div className="bg-gray-100 px-4 py-2 flex items-center justify-center">
                        <span className="text-gray-500">₹</span>
                    </div>
                    <div className="border-l border-gray-300 h-full"></div>
                    <input
                        type="number"
                        placeholder="0"
                        className="w-full text-[14px] px-4 py-2 focus:outline-none"
                    />
                    </div>
                </div>

                {/* Toggle for "Sell session recording" */}
                <div className="flex items-center mb-6">
                    <input
                    type="checkbox"
                    id="sellRecording"
                    className="hidden"
                    checked={sellSessionRecording}
                    onChange={() => setSellSessionRecording(!sellSessionRecording)}
                    />
                    <label
                    htmlFor="sellRecording"
                    className={`relative w-8 h-4 flex items-center rounded-full cursor-pointer transition-colors ${
                        sellSessionRecording ? "bg-black" : "bg-gray-300"
                    }`}
                    >
                    <div
                        className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${
                        sellSessionRecording ? "translate-x-4" : "translate-x-0"
                        }`}
                    ></div>
                    </label>
                    <span className="ml-3 text-sm text-gray-700">
                    Sell session recording
                    </span>
                </div>

                {/* Toggle for "Increase conversation by slash pricing" */}
                <div className="flex items-center mb-6">
                    <input
                    type="checkbox"
                    id="slashPricing"
                    className="hidden"
                    checked={increaseConversation}
                    onChange={() => setIncreaseConversation(!increaseConversation)}
                    />
                    <label
                    htmlFor="slashPricing"
                    className={`relative w-8 h-4 flex items-center rounded-full cursor-pointer transition-colors ${
                        increaseConversation ? "bg-black" : "bg-gray-300"
                    }`}
                    >
                    <div
                        className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${
                        increaseConversation ? "translate-x-4" : "translate-x-0"
                        }`}
                    ></div>
                    </label>
                    <span className="ml-3 text-sm text-gray-700">
                    Increase conversation by slash pricing
                    </span>
                </div>

                <div className="border border-[#CCCDD6] rounded-lg p-4 mb-[147px]">
                    <div className="flex space-x-4">
                        {/* Actual Amount */}
                        <div className="flex-1">
                        <label className="block text-gray-700 text-[14px] font-medium mb-2">
                            Actual Amount
                        </label>
                        <div className="flex items-center border border-[#CCCDD6] rounded-lg">
                            <span className="p-[10px] text-gray-500 ">₹</span>
                            <input
                            type="number"
                            placeholder="0"
                            className="w-full text-[14px] p-[10px] focus:outline-none"
                            />
                        </div>
                        </div>

                        {/* Slashed Amount */}
                        <div className="flex-1">
                        <label className="block text-gray-700 text-[14px] font-medium mb-2">
                            Slashed Amount
                        </label>
                        <div className="flex items-center border border-[#CCCDD6] rounded-lg">
                            <span className="p-[10px] text-gray-500 ">₹</span>
                            <input
                            type="number"
                            placeholder="0"
                            className="w-full text-[14px] p-[10px] focus:outline-none"
                            />
                        </div>
                        </div>
                    </div>
                    </div>


                {/* Create Link Button */}
                <div className="mt-8 flex justify-center">
                    <button
                    onClick={() => alert("Link Created!")} // Replace with your final step logic
                    className="w-[407px] px-6 py-3 text-white font-medium bg-[rgb(97,57,255)] rounded-[32px] hover:bg-customPurple"
                    >
                    Create Link
                    </button>
                </div>
                </>
            )}

        {step < 4 && (
        <div className="flex justify-between mt-6">
            <button
            onClick={() => setStep(step - 1)} // Go to previous step
            className="w-[170px] px-6 py-2 text-black font-medium bg-gray-200 rounded-[32px]"
            >
            Cancel
            </button>
            <button
            onClick={() => setStep(step + 1)} // Go to next step
            className="w-[170px] px-6 py-2 text-white font-medium bg-[rgb(97,57,255)] rounded-[32px] hover:bg-customPurple"
            >
            Next
            </button>
        </div>
        )}
        </div>
      </div>

      {/* Right Section (Fixed) */}
      <div className="hidden md:flex w-full md:w-2/3 bg-blue-50 items-center justify-center">
        <div className="border rounded-lg p-5 bg-white" style={{ width: "254px", height: "210.803px" }}>
          <div className="flex items-center mb-6">
            <img
              src="https://via.placeholder.com/50"
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h3 className="text-[12px] font-semibold text-gray-800">
                Book Session
              </h3>
              <p className="text-[10px] text-gray-500">Select Date & Time</p>
            </div>
          </div>

          <div className="flex overflow-x-auto scrollbar-hide space-x-3 items-center mb-6">
            {weekDays.map((date, index) => {
              const [day, dayNumber, month] = date.split(" ");
              const isSelected = selectedDayIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDayIndex(index)}
                  className={`flex-shrink-0 text-center pt-[7px] w-[51px] h-[38.014px] rounded-lg cursor-pointer ${
                    isSelected
                      ? "bg-blue-100 text-blue-700 border border-blue-500"
                      : "bg-gray-100 text-gray-700 border border-gray-300"
                  }`}
                >
                  <p className="text-[7px] font-medium">{day}</p>
                  <p className={`text-[9px] font-semibold ${isSelected ? "text-blue-700" : "text-gray-900"}`}>
                    {month} <span className="text-[9px] font-semibold">{dayNumber}</span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="w-[248px] ml-[-17px] border-t border-gray-300 mb-3"></div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-gray-500">Next Available</p>
              <p className="text-[12px] font-semibold text-gray-800">
                07:00pm, Tue 24th
              </p>
            </div>
            <button className="w-[80.347px] h-[31.102px] text-white text-[12px] font-medium bg-[rgb(97,57,255)] rounded-lg hover:bg-customPurple">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneOnOnePage;
