import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventDetails } from "./EventDetailPage";

export default function BookingPage() {
  useEffect(() => {
    document.title = 'Booking'; // Set your desired page title here
  }, []);
  const navigate = useNavigate();
  const { slug } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    whatsappNumber: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  if (!slug) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold">Invalid Event</h2>
      </div>
    );
  }

  // Retrieve the values from localStorage
  const storedDateInfo = JSON.parse(localStorage.getItem("selectedDateInfo"));
  const storedTimeRange = localStorage.getItem("selectedTimeRange");
  const event = eventDetails[slug];

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold">Event Not Found</h2>
        <button
          className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate the form: Check if all fields have values
    const isValid =
      formData.name.trim() &&
      formData.email.trim() &&
      formData.message.trim() &&
      formData.whatsappNumber.trim();
    setIsFormValid(isValid);
  };

  return (
    <div className="min-h-screen flex flex-col sm:mt-[77px] xxl:mt-0">
      {/* Back Button */}
      <button className="flex items-center text-gray-800 font-bold p-2" onClick={() => navigate(-1)}>
        <img
          src="/icons/back-arrow.svg"
          alt="Back Arrow"
          width={16}
          height={16}
        />
        <span className="ml-2">Back</span>
      </button>

      {/* Main Grid Container */}
      <div className="flex-1 w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] pt-1">
        {/* Left Column: Booking Form */}
        <div className="bg-white gap-6 xl:pr-20 xl:pl-20 pt-5 sm:pr-10 sm:pl-10 sm:pb-40 xl:pb-0 shadow-md w-full sm:order-2 xl:order-1">
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                placeholder="Enter Your Name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                placeholder="Enter Your Email"
                required
              />
            </div>

            {/* Call Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-700">What Is The Call About?</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                placeholder="Enter Your Message"
                required
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
              <div className="mt-2 flex items-center border border-gray-300 rounded-md p-2 text-sm">
                <div className="flex items-center space-x-2 pr-2 border-r border-gray-300">
                  <img src="/icons/india 1.svg" alt="India Flag" className="h-5 w-5" />
                  <img src="/icons/chevron-down.svg" alt="Arrow Down" className="h-3 w-3" />
                </div>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Your Number"
                  className="ml-2 flex-1 focus:outline-none"
                />
              </div>
              <div className="mt-4 flex items-center">
                <input type="checkbox" id="phoneCheckbox" className="mr-2" />
                <label htmlFor="phoneCheckbox" className="text-sm text-gray-500">
                  Receive Booking Details On Phone
                </label>
              </div>
            </div>

            {/* Terms of Use */}
            <div className="text-xs text-gray-500">
              <p className="mb-1 mt-9">
                By Proceeding, You Confirm That You Have Read and Agree
              </p>
              <p>
                To{" "}
                <a href="/terms" className="text-purple-600 font-bold hover:underline">
                  Uproach.Me Terms of Use
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-purple-600 font-bold hover:underline">
                  Privacy Notes
                </a>
                .
              </p>
            </div>

            {/* Confirm And Pay Button */}
            <div className="mt-8 sm:fixed sm:bottom-0 sm:left-0 sm:right-0 sm:bg-white sm:p-4 sm:w-full sm:border-t sm:border-gray-200 sm:z-50 xl:relative xl:mt-8">
              <button
                type="button"
                disabled={!isFormValid}
                className={`${
                  isFormValid
                    ? "bg-purple-600 text-white hover:bg-purple-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } px-6 py-3 text-lg font-semibold w-full rounded-md`}
                onClick={() => navigate(`/scheduled/${slug}`)}
              >
                Confirm And Pay
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Event Summary */}
        <div className="bg-purple-100 xl:pr-20 xl:pl-20 xl:pt-8 sm:pr-5 sm:pl-5 sm:pt-2 shadow-md w-full sm:order-1 xl:order-2">
          <h2 className="text-2xl font-bold">{event.title}</h2>

          {/* Duration and Google Meet */}
          <div className="mt-4 flex items-center">
            <div className="flex items-center text-sm font-medium text-gray-600">
              <img src="/icons/clock.svg" alt="Clock Icon" width={20} height={20} />
              <span className="ml-2">Duration: {event.duration}</span>
            </div>

            <div className="h-6 w-px bg-gray-300 mx-4"></div>

            <div className="flex items-center text-sm font-medium text-gray-600">
              <img src="/icons/google-meet.svg" alt="Google Meet Icon" width={20} height={20} />
              <span className="ml-2">Google Meet</span>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-md">
            {storedDateInfo && storedTimeRange && (
              <div className="flex items-center justify-between border-2 p-4 rounded-md space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 border-2 border-yellow-400 bg-yellow-300 rounded-md">
                    <div className="text-center">
                      <div className="text-xs font-bold">{storedDateInfo.month}</div>
                      <div className="text-lg font-bold">{storedDateInfo.day}</div>
                    </div>
                  </div>

                  {/* Date and Time Details */}
                  <div>
                    <p className="text-lg font-semibold">{storedDateInfo.fullDate}</p>
                    <p className="text-sm text-gray-600">
                      {storedTimeRange} (GMT +05:30)
                    </p>
                  </div>
                </div>

                <button className="text-gray-800 px-2 py-1 rounded-2xl border-2" onClick={() => navigate(-1)}>
                  Change
                </button>
              </div>
            )}
          </div>

          {/* Event Description */}
          <h3 className="text-m font-semibold mt-6">Description</h3>
          <p className="text-gray-600 mt-2">{event.description}</p>

          <div className="mt-6">
            {event.price === "" ? (
              <p className="justify-between border-2 ml-[7rem] rounded-2xl bg-purple-200 font-bold px-6 py-3 w-[223px] mt-8 text-center">
                Booking is free!
              </p>
            ) : event.price === "₹500" ? (
              <div className="mt-2 bg-white p-4 rounded-lg shadow-sm border xxl:h-[195px] sm:h-[219px] sm:mb-10 xl:mb-0">
                <h3 className="text-m font-semibold">Order Summary</h3>
                <div className="flex justify-between py-2 border-b border-dotted border-gray-400 m-3">
                  <p className="text-sm font-medium text-gray-600">1 x quick chat on {event.title}</p>
                  <p className="text-sm font-medium text-gray-600">₹ 300</p>
                </div>

                <div className="flex justify-between py-2 border-b border-dotted border-gray-400 m-3">
                  <p className="text-sm font-medium text-gray-600">Add On: Recording</p>
                  <p className="text-sm font-medium text-gray-600">₹ 200</p>
                </div>

                <div className="flex justify-between font-semibold py-2 m-3">
                  <p>Total</p>
                  <p>₹ 500</p>
                </div>
              </div>
            ) : (
              <div className="mt-2 bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex justify-between py-2 border-b border-dotted border-gray-400">
                  <p className="text-sm font-medium text-gray-600">1 x {event.title}</p>
                  <p className="text-sm font-medium text-gray-600">{event.price}</p>
                </div>
                <div className="flex justify-between font-semibold py-2">
                  <p>Total</p>
                  <p>{event.price}</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-gray-500 text-sm mt-9 mb-9 flex justify-center sm:hidden xl:block xl:ml-40 sm:flex">
            Powered by{" "}
            <a href="#" className="text-purple-600 font-bold hover:underline ml-1">
              Uproach.Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
