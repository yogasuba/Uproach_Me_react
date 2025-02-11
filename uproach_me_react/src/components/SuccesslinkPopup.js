import React from "react";

const SuccessPopup = ({ setShowPopup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-xl font-semibold text-center mb-4">
          Great Vicky! Share your link to start taking bookings
        </h2>

        <div className="flex items-center border border-gray-300 rounded-lg p-2 mb-4">
          <span className="font-medium">Vicky-1.uparch.me</span>
          <button className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-lg">
            View my page
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Not ready to share?{" "}
          <span className="text-blue-500 cursor-pointer">Customize your page further</span>
        </p>

        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
