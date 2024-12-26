// app/feedback/page.js

import { useState,useEffect } from "react";

export default function FeedbackPage() {
  useEffect(() => {
    document.title = 'Feedback'; // Set your desired page title here
  }, []);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();


    // Reset form fields
    setEmail("");
    setMessage("");
  };

  return (

    <div className="p-8 w-full xxl:min-h-screen sm:h-[836px] bg-gray-50 sm:mt-[77px] xxl:mt-0">
      <h1 className="text-[22px] font-semibold text-gray-800">Submit Feedback</h1>
      <hr className="border-gray-300 mb-3 mt-3" />

      <div className="bg-white p-4 xxl:w-[625px] sm:w-[296px] h-[506px] xxl:ml-[149px] xxxl:ml-[237px] rounded-[10px] mt-[50px]">
        <h2 className="xxl:text-2xl sm:text-[16px] font-semibold text-gray-900 flex items-center">
          <span role="img" aria-label="sparkles" className="mr-2">
            ✨
          </span>
          We’d Love To Hear From You
        </h2>
        <p className="text-gray-600 mt-2 text-[14px]">
          Hey there! We’d love to receive your feedback so that we can improve our product for you and others.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#F6F6F9] rounded-lg text-gray-800 text-[14px] focus:outline-none"
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Your message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-[199px] px-4 py-3 bg-[#F6F6F9] rounded-lg text-gray-800 text-[14px] focus:outline-none "
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#6139FF] text-white rounded-full font-medium  hover:bg-customPurple  focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
