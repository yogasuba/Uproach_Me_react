import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const GroupStep1 = ({ setStep }) => {
    const [duration, setDuration] = useState("");
    const [step] = useState(1);

    const [isHidden, setIsHidden] = useState(false);
    const [text, setText] = useState(""); 
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [title, setTitle] = useState(""); 
    const navigate = useNavigate();

    const handleEmojiSelect = (emoji) => {
      const quill = document.querySelector(".ql-editor"); // Get the editor
      if (quill) {
          quill.focus(); // Ensure the editor is focused
          const selection = window.getSelection(); 
          const range = selection.getRangeAt(0);
          const emojiText = document.createTextNode(emoji.native);
          range.insertNode(emojiText);
          range.setStartAfter(emojiText); 
          selection.removeAllRanges();
          selection.addRange(range);
      }
  };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const uid = localStorage.getItem("userId");
            const eventId = localStorage.getItem("eventId");

            if (!uid || !eventId) {
                alert("Missing user or event information. Please try again.");
                return;
            }

            const payload = {
                uid,
                eventId,
                title,
                description: text,
                duration,
                hideFromProfile: isHidden,
            };

            const response = await axios.put(
                `https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/events/${eventId}/details`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Response:", response.data);
            setStep(2);
        } catch (error) {
            console.error("Error updating event:", error);
            alert("Failed to update the event. Please try again.");
        }
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="custom-inputfeild w-full text-[14px] p-[10px] border border-[#CCCDD6] rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
            </div>

                <ReactQuill
                    value={text}
                    onChange={setText}
                    modules={{
                        toolbar: [
                            ["bold", "italic", "underline", "strike"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "emoji"],
                        ],
                    }}
                    placeholder="Description..."
                    className=" rounded-b-lg h-[82px] mb-[4rem]"
                />
                    <div className=" text-gray-600 relative">
                        <button
                            type="button"
                            className="p-1 hover:text-black sm:absolute sm:transform sm:scale-105 xxl:scale-110 xxl:right-[44px] xxl:bottom-[112px] sm:right-[30px] sm:bottom-[113px] object-contain "
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            <BsEmojiSmile />
                        </button>
                
                    </div>
                    {showEmojiPicker && (
                    <div className=" top-[16.71rem] p-2 border border-gray-300 bg-white">
                        <Picker data={emojiData} onEmojiSelect={handleEmojiSelect} />
                    </div>
                )}


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
                            navigate('/login'); // Navigate to the dashboard for step 1
                        } else {
                            setStep(step - 1); // Go to the previous step for other steps
                        }
                    }}
                    className="w-[170px] px-6 py-2 text-black font-medium bg-gray-200 rounded-[32px]"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="w-[170px] px-6 py-2 text-white font-medium bg-[rgb(97,57,255)] rounded-[32px] hover:bg-customPurple"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default GroupStep1;
