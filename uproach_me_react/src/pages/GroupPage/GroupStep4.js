import React, { useState } from "react";

const GroupStep4 = ({ setStep, navigate }) => {
  const [sellSessionRecording, setSellSessionRecording] = useState(false);
  const [increaseConversation, setIncreaseConversation] = useState(false);

  const handleLinkClick = () => {
    navigate("/pages"); 
  };

  return (
    <div>
      <h1 className="text-[24px] font-semibold text-gray-800 mb-2 text-center">
        Pricing
      </h1>
      <p className="text-[14px] text-gray-600 text-center mb-6">
        Set up the pricing for your session.
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
                    onClick={handleLinkClick} // Replace with your final step logic
                    className="w-[407px] px-6 py-3 text-white font-medium bg-[rgb(97,57,255)] rounded-[32px] hover:bg-customPurple"
                    >
                    Create Link
                    </button>
                </div>
    </div>
  );
};

export default GroupStep4;
