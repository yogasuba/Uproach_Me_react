import React from "react";

const OneOnOneStep3 = ({ setStep, meetingType, setMeetingType }) => {
  return (
    <div>
      <h1 className="text-[24px] font-semibold text-gray-800 mb-2 text-center">
        Choose a location
      </h1>
      <p className="text-[14px] text-gray-600 text-center mb-6">
        Decide whether you would like to meet in person or a web conference.
      </p>
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
              <div className="flex justify-between mt-6">
                    <button
                        onClick={() => setStep(2)}
                        className="w-[170px] px-6 py-2 text-black font-medium bg-gray-200 rounded-[32px]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setStep(4)}
                        className="w-[170px] px-6 py-2 text-white font-medium bg-[rgb(97,57,255)] rounded-[32px] hover:bg-customPurple"
                    >
                        Next
                    </button>
                </div>
    </div>
  );
};

export default OneOnOneStep3;
