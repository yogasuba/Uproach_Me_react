import React, { useState } from "react";
import { IMAGES } from "../../constants"; 
import { FiDownload } from "react-icons/fi"; // React Icon for download symbol


export default function BillingPage() {
  // State to manage visibility of Professional Plan and Billing History sections
  const [isUpgraded, setIsUpgraded] = useState(false);

  // State to manage subscription details
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    subscribedOn: "", // Example: "Oct 29, 2024"
    subscriptionEndDate: "", // Example: "Nov 29, 2024"
    price: "$10.00", // Subscription price
  });
  const handleDownloadRow = (referenceNo) => {
    // Logic to download individual billing details
    console.log(`Downloading details for Reference No: ${referenceNo}`);
  };

  const handleDownloadAll = () => {
    // Logic to download the full billing history
    console.log("Downloading all billing history...");
  };
  // State to manage billing history
  const [billingHistory, setBillingHistory] = useState([]);

  // Handle Upgrade Button Click
  const handleUpgrade = () => {
    setIsUpgraded(true);

    // Set subscription details dynamically (dummy data for now)
    setSubscriptionDetails({
      subscribedOn: "Oct 29, 2024", // Replace this with real fetched data
      subscriptionEndDate: "Nov 29, 2024", // Replace this with real fetched data
      price: "$10.00",
    });

    // Add dummy billing data for demonstration purposes
    setBillingHistory([
      {
        referenceNo: "INV-1001",
        date: "17 Nov 2024",
        amount: "$7.20",
        type: "Paid",
      },
      {
        referenceNo: "INV-1002",
        date: "18 Nov 2024",
        amount: "$10.00",
        type: "Paid",
      },
      {
        referenceNo: "INV-1002",
        date: "18 Nov 2024",
        amount: "$10.00",
        type: "Paid",
      },
      {
        referenceNo: "INV-1002",
        date: "18 Nov 2024",
        amount: "$10.00",
        type: "Paid",
      },

    ]);
  };

  return (
    <div className="xxl:min-h-screen  sm:h-[836px] bg-gray-50 flex flex-col p-6 relative">
      {/* Billing text in the left corner with a horizontal line */}
      <div className="absolute top-6 left-6">
        <h1 className="text-xl font-bold">Billing</h1>
        <hr className="border-gray-300 my-4 xxl:w-[994px] sm:w-[314px]" />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center">
        {/* Conditional Rendering for Subscription Details */}
        {!isUpgraded && (
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative sm:h-[593px] xxl:h-[372px] xxl:w-[677px] xxl:mt-[91px] sm:mt-[70px] ">
            {/* Title and Subtitle */}
            <h2 className="text-[18px] font-semibold text-black mb-1">
              Subscriptions
            </h2>
            <p className="text-[#686A74] text-[14px] mb-3">
              View and manage your Uproach me subscriptions.
            </p>

            {/* Subscription Details */}
            <div className="bg-[#D6E7FC] rounded-lg p-6 shadow-md relative sm:h-[433px] xxl:w-[616px] xxl:h-[236px]">
              <img
                src={IMAGES.FREEPLAN_IMAGE}
                alt="Illustration"
                className="absolute -top-10 right-4 w-[242px] h-[135px] xxl:mt-[95px] sm:mt-[271px]"
              />
              <h2 className="text-[16px] font-semibold mb-2">
                Hurry and grab your 14 days free trial
              </h2>

              {/* Features */}
              <ul className="text-[14px] space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 font-bold text-lg mr-2">
                    ✓
                  </span>
                  Customizable reminder emails & SMS
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 font-bold text-lg mr-2">
                    ✓
                  </span>
                  Integration with third-party marketing tools
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 font-bold text-lg mr-2">
                    ✓
                  </span>
                  Create unlimited pages
                </li>
              </ul>

              {/* Upgrade Button */}
              <button
                className="xxl:mt-2 sm:mt-[167px] xxl:w-[266px] sm:w-[210px] px-6 py-[8px] bg-purple-600 hover:bg-purple-700 text-white text-[14px] font-medium rounded-[32px] shadow flex items-center justify-center"
                onClick={handleUpgrade}
              >
                <img
                  src={IMAGES.VECTOR} // Replace with your crown image URL
                  alt="Crown"
                  className="w-[14px] h-[14px] mr-2"
                />
                Upgrade
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Professional Plan and Billing History - Display on Upgrade */}
      {isUpgraded && (
        <div className=" px-6 flex flex-col items-center space-y-6">
          {/* Professional Plan Section */}
          <div className=" bg-white rounded-lg shadow-md p-6 xxl:w-full sm:w-[301px] h-[202px] max-w-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 xxl:mt-[91px] sm:mt-[70px]">
            <div>
              <h2 className="xxl:text-[18px] sm:text-[11px] font-semibold">Professional Plan</h2>
              <div className="text-[28px] font-bold text-purple-600 mt-[53px]">
                {subscriptionDetails.price}
              </div>
              <p className="text-[#686A74] xxl:text-sm sm:text-[10px] sm:w-[137px] xxl:w-[184px]">
                Subscribed on{" "}
                <span className="font-medium ">{subscriptionDetails.subscribedOn}</span>
              </p>
            </div>
            <div className="mb-[118px]">
            <div className=" text-[#686A74] mb-[118px] xxl:text-sm sm:text-[11px] ">
              Subscription end date{" "}
              <span className="bg-[#FBDD53] px-3 py-1 rounded-[37px] text-sm text-[#4B3E02]">{subscriptionDetails.subscriptionEndDate}</span>
            </div>
            </div>
          </div>

          {/* Billing History Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full max-w-3xl">
            <h2 className="xxl:text-lg sm:text-[14px] font-semibold mb-2 sm:mb-0">Billing History</h2>
            {/* Download All Button */}
            <button
              onClick={handleDownloadAll}
              className="flex items-center space-x-1 text-sm text-black hover:underline"
            >
              <FiDownload className="text-lg" />
              <span>Download all</span>
            </button>
          </div>

          {/* Billing History Table */}
          <div className="bg-white rounded-lg shadow-md p-6 xxl:w-full sm:w-[301px] max-w-3xl overflow-x-auto">
            {/* Conditional Rendering Based on Billing Data */}
            {billingHistory.length === 0 ? (
              <div className="text-center">
                <img
                  src={IMAGES.NO_DATA_IMAGE} // Replace with your no-data illustration URL
                  alt="No Data"
                  className="mx-auto w-32 h-32 mb-4"
                />
                <p className="text-[#333] font-semibold">No information available</p>
                <p className="text-[#686A74] text-sm">
                  No transactions in your history yet
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 xxl:text-[14px] sm:text-[12px] font-medium text-[#807E93] whitespace-nowrap" style={{ width: "20%" }}>
                      Reference No.
                    </th>
                    <th className="p-3 xxl:text-[14px] sm:text-[12px] font-medium text-[#807E93]" style={{ width: "52%" }}>
                      Date
                    </th>
                    <th className="p-3 xxl:text-[14px] sm:text-[12px] font-medium text-[#807E93]">
                      Amount
                    </th>
                    <th className="p-3 xxl:text-[14px] sm:text-[12px] font-medium text-[#807E93]">
                      Type
                    </th>
                    <th className="p-3 xxl:text-[14px] sm:text-[12px] font-medium text-[#807E93]"></th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3 xxl:text-sm sm:text-[10px] text-gray-700">{item.referenceNo}</td>
                      <td className="p-3 xxl:text-sm sm:text-[10px] text-gray-700 whitespace-nowrap">{item.date}</td>
                      <td className="p-3 xxl:text-sm sm:text-[10px] text-gray-700">{item.amount}</td>
                      <td className="p-3 xxl:text-sm sm:text-[10px] text-[#1D874C] font-medium ">
                        {item.type}
                      </td>
                      <td className="p-3 text-sm text-right">
                        {/* Individual Row Download */}
                        <button
                          onClick={() => handleDownloadRow(item.referenceNo)}
                          className="text-black hover:underline flex items-center space-x-1"
                        >
                          <FiDownload className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      )}
    </div>
  );
}
