import React from "react";
import { useNavigate } from "react-router-dom";

export default function BillingPopup({ onClose }) {
  const navigate = useNavigate();

  // Function to handle plan selection
  const handlePlanClick = (planType) => {
    if (planType === "free") {
      navigate("/billing");
    } else if (planType === "pay") {
      alert("You have chosen the Pay Plan.");
    }
    if (onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-4 relative mx-4 sm:mx-6 md:mx-8 xxl:h-[480px]  sm:h-[692px] sm:w-[608px] xxl:w-[832px]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>

        {/* Header */}
        <h2 className="xxl:text-xl sm:text-sm font-semibold mb-4 text-center">
          Choose the plan that's right for you
        </h2>

        {/* Toggle Options */}
        <div className="flex justify-center items-center space-x-4 mb-4">
          <button className="px-4 py-2 bg-black text-white rounded-[200px] text-sm">
            Monthly
          </button>
          <button className="px-4 py-2 text-black  rounded-[200px] text-sm">
            Annual <span className="border border-grey rounded-[20px] text-[12px] text-white bg-[#686A74] px-1 py-1">- 20%</span>
          </button>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Free Plan */}
          <div
            onClick={() => handlePlanClick("free")}
            className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:shadow-lg transition xxl:h-[316px] xxl:w-[384px] sm:h-[202px] sm:w-[276px]"
          >
            <h4 className=" xxl:mt-[28px] sm:mt-0 ml-[11px]">individual</h4>
            <h3 className="xxl:text-[28px] sm:text-[23px] font-bold  ml-[11px]">Free Plan</h3>
            <p className="text-gray-600 text-sm mb-3 ml-[11px]">
              Perfect for creating unique booking experiences for occasional online scheduling.
            </p>
            <ul className="space-y-1 text-sm ml-[11px] mt-[19px]">
              <li>✔️ Limited reminder emails and SMS</li>
              <li>✔️ Limited pages</li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div
            onClick={() => handlePlanClick("pay")}
            className=" text-white rounded-lg p-3 cursor-pointer hover:shadow-lg transition xxl:h-[316px] xxl:w-[384px] sm:h-[324px] sm:w-[276px]"
            style={{
              background: "linear-gradient(180deg, #0B4666 0%, #063F56 100%) ",
            }}>
              
            <h4 className=" xxl:mt-[28px]sm:mt-0 ml-[11px]">individual</h4>
            <h3 className="text-[16px] font-sm ml-[11px]">
              <span className="text-[28px] font-bold">$7.20</span>/month
            </h3>
            <p className="text-sm mb-3 ml-[11px]">
            Perfect for creating unique booking experience experience for occasional online scheduling.</p>
            <button className=" ml-[11px] mb-4 bg-white text-[#063F56] px-4 py-2 rounded-[200px] font-medium bg-[#5BF1B3]">
              Choose Individual
            </button>
            <ul className="space-y-1 text-sm ml-[11px]">
              <li>✔️ Customizable reminder emails & SMS</li>
              <li>✔️ Integration with third-party marketing tools</li>
              <li>✔️ Create unlimited pages</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 text-gray-500 text-sm">
          Your clients will ❤️ scheduling with you
        </div>
      </div>
    </div>
  );
}
