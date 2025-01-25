import React, { useState,useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import { useNavigate } from "react-router-dom";



const GroupStep1 = ({ setStep }) => {
    const [duration, setDuration] = useState("");
    const [isHidden, setIsHidden] = useState(false);
    const [text, setText] = useState(""); // State to store textarea value
    const textareaRef = useRef(null); // Ref to manipulate the textarea
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [step] = useState(1);
    const navigate = useNavigate();

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
    <div>
      <h1 className="text-[24px] font-semibold text-gray-800 mb-2 text-center">
        Create event page
      </h1>
      <p className="text-[14px] text-gray-600 text-center mb-6">
        Enter your booking page title and description to let people know who
        they’re booking with.
      </p>
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
              <div className="flex justify-between mt-6">
                    <button
                        onClick={() => {
                            if (step === 1) {
                                navigate('/'); // Navigate to the dashboard for step 1
                            } else {
                                setStep(step - 1); // Go to the previous step for other steps
                            }
                        }}
                        className="w-[170px] px-6 py-2 text-black font-medium bg-gray-200 rounded-[32px]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setStep(2)}
                        className="w-[170px] px-6 py-2 text-white font-medium bg-[rgb(97,57,255)] rounded-[32px] hover:bg-customPurple"
                    >
                        Next
                    </button>
                </div>
    </div>
  );
};

export default GroupStep1;
