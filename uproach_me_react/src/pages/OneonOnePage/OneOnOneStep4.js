import React, { useState } from "react";
import axios from "axios";

const OneOnOneStep4 = ({ setStep, navigate }) => {
  const [amount, setAmount] = useState("");
  const [increaseConversation, setIncreaseConversation] = useState(false);
  const slashedAmount = 1000; // Default slashed amount

  // This function will call the API using axios PUT
  const handleCreateLink = async () => {
    const uid = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");
    const eventId = localStorage.getItem("eventId");

    // Build the payload. If amount is empty, default to "0"
    const pricingPayload = {
      uid,
      eventId,
      pricing: {
        amount: amount ? amount.toString() : "0",
        actualAmount: amount ? amount.toString() : "0",
        // When increaseConversation is false, we send the slashedAmount;
        // otherwise, you might want to send a different value (or even omit it).
        slashedAmount: !increaseConversation ? slashedAmount.toString() : "0",
        increaseConversationBySlashingPrice: increaseConversation,
      },
    };

    try {
      const response = await axios.put(
        "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/events/pricingOneOnOne",
        pricingPayload,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      console.log("API Response:", response.data);
      // Navigate to the desired page on success
      navigate("/pages");
    } catch (error) {
      console.error("Error while updating pricing:", error);
      // Optionally, handle errors (show error message etc.)
    }
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
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-[14px] px-4 py-2 focus:outline-none"
          />
        </div>
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
          Hide Actual & Slashed Amount
        </span>
      </div>

      {!increaseConversation && (
        <>
          {/* Slashed Pricing Display */}
          <div className="flex items-center justify-center mb-6 border border-gray-300 rounded-full px-4 py-2 w-fit">
            <span className="text-gray-500 line-through mr-2">
              ₹{slashedAmount}
            </span>
            <span className="text-black font-semibold">₹{amount || 0}</span>
          </div>

          <div className="border border-[#CCCDD6] rounded-lg p-4 mb-[147px]">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-gray-700 text-[14px] font-medium mb-2">
                  Actual Amount
                </label>
                <div className="flex items-center border border-[#CCCDD6] rounded-lg">
                  <span className="pl-[10px] text-gray-500">₹</span>
                  <input
                    type="number"
                    value={amount}
                    readOnly
                    className="w-full text-[14px] p-[10px] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-[14px] font-medium mb-2">
                  Slashed Amount
                </label>
                <div className="flex items-center border border-[#CCCDD6] rounded-lg">
                  <span className="pl-[10px] text-gray-500">₹</span>
                  <input
                    type="number"
                    value={slashedAmount}
                    readOnly
                    className="w-full text-[14px] p-[10px] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Create Link Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleCreateLink}
          className="w-[407px] px-6 py-3 text-white font-medium bg-[rgb(97,57,255)] rounded-[32px] hover:bg-customPurple"
        >
          Create Link
        </button>
      </div>
    </div>
  );
};

export default OneOnOneStep4;
