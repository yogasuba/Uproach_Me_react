import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import BillingPopup from '../../../pages/Billing/BillingPopup';
import {ICONS} from "../../../constants"
import axios from "axios";
import { toast } from "react-toastify";


export default function Sidebar() {


  // Navigation links
  const navLinks = [
    { to: "/dashboard", icon: ICONS.DASHBOARD, label: "Dashboard" },
    { to: "/bookings", icon:ICONS.BOOKING, label: "Booking" },
    { to: "/pages", icon:ICONS.SERVICES, label: "Pages" },
    { to: "/analytics", icon:ICONS.ANALYTICS, label: "Analytics" },
    { to: "/teams", icon:ICONS.USERS, label: "Teams" },
    { to: "/availability", icon:ICONS.AVAILABILITY, label: "Availability" },
  ];

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [user, setUser] = useState({ profilePic: "", username: "" });


  const handleClose = () => {
    setPopupOpen(false);
  };
  // Ref for dropdown
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = localStorage.getItem("userId");
        if (!uid) {
          toast.error("User ID is missing.");
          return;
        }
        const response = await axios.post(
          "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/success-page",
          { uid},
        );
        if (response.status === 200) {
          const data = response.data;
          setUser({ profilePic: data.profilePhoto, username: data.profileName });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <aside className="lg:flex lg:flex-col bg-card xxxl:p-4 xxl:p-4 sm:p-0 lg:w-60 lg:min-h-screen lg:relative">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between ">
          <div className="font-helvetica custom-headingdashboard">UPROACH ME</div>
          <div
            className="relative bg-gray-100 rounded-full p-2"
            style={{ backgroundColor: "rgba(246, 246, 249, 1)" }}
          >
            <img
              src="/icons/bell-icon.svg"
              alt="Notifications"
              className="w-[20px] h-[20px]"
            />
            <span className="absolute top-0.5 right-0.5 bg-red-500 w-[7px] h-[7px] rounded-full border border-white" />
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="my-3 border-muted" />

        {/* Navigation Links */}
        <nav className="">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="flex items-center hover:bg-gray-100 px-2 py-2 rounded-md space-x-3 custom-sidbars"
            >
              <img src={link.icon} alt={link.label} className="w-[20px] h-[20px]" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Horizontal Line */}
        <hr className="my-6 border-muted" />

        {/* Try Pro Button */}
        <div className="mt-[149px] space-y-4 relative mb-2 ">
          <button className="bg-[rgba(234,234,241,1)] text-black p-4 rounded-full w-[169px] h-[43px] text-[16px] flex items-center justify-center space-x-2">
            <img src="/icons/zap.svg" alt="Pro Icon" className="w-[20px] h-[20px]" />
            <span>Try Pro for free</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white shadow-md flex justify-around items-center h-16 z-50">
        {navLinks.map((link, index) => (
          <Link key={index} to={link.to} className="flex flex-col items-center">
            <img src={link.icon} alt={link.label} className="w-6 h-6" />
            <span className="text-xs">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Profile Dropdown */}
      <div className="relative mt-4 lg:mt-auto lg:block hidden" ref={dropdownRef}>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-8 h-8 rounded-full"
            onError={(e) => (e.target.src = "/SVGRepo_iconCarrier.svg")}
          />
          <span>@{user.username}</span>
        </div>
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className="absolute bottom-[43%] left-[42px] w-[295px] h-[515px] bg-white shadow-md rounded-lg z-50 px-4 py-4"
              style={{ transform: "translateY(-10px)" }} // Slight adjustment for spacing
            >
              {/* Profile Section */}
              <div className="flex items-center justify-between">
                {/* Profile Pic and Username */}
                <div className="flex items-center space-x-2">
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                    onError={(e) => (e.target.src = "/SVGRepo_iconCarrier.svg")} // Fallback image
                  />
                  <div>
                    <div className="font-bold text-[14px] text-gray-800">@{user.username}</div>
                    <div className="text-[12px] text-gray-500">
                      Uproach me.in/{user.username}
                    </div>
                  </div>
                </div>
                {/* QR Code */}
                <img
                  src="/icons/Qr-code.svg"
                  alt="QR Code"
                  className="w-6 h-6 cursor-pointer"
                />
              </div>

              {/* Spacer */}
              <div className="h-4"></div>

              {/* Purchase Plan Button */}
              <div className="px-4 mb-4">
                <button className="w-full h-[41px] flex items-center justify-center bg-[#F6F6F9] text-[#1C2434] font-semibold text-sm rounded-[46px] ">
                  <img
                    src="/icons/zap.svg"
                    alt="Zap Icon"
                    className="w-4 h-4 mr-2"
                  />
                  Purchase Plan
                </button>
              </div>

              {/* Account Section */}
              <div>
                <h3 className="text-[14px] px-2 font-semibold text-gray-500 uppercase mb-2">
                  Account
                </h3>
                <ul className="text-[14px] text-gray-700 space-y-2">
                  <li
                    className="flex items-center hover:bg-gray-100 px-2 py-2 rounded-md cursor-pointer"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <img
                      src="/icons/user.svg"
                      alt="My Account"
                      className="w-5 h-5 mr-2"
                    />
                    <Link to="/profile">My Account</Link>
                  </li>
                  <li
                    className="flex items-center hover:bg-gray-100 px-2 py-2 rounded-md cursor-pointer"
                    onClick={() => {setDropdownOpen(false);
                      setPopupOpen(true);}}// Open BillingPopup

                  >
                    <img src="/icons/billing.svg" alt="Billing" className="w-5 h-5 mr-2" />
                    Billing
                  </li>
                  <li
                    className="flex items-center hover:bg-gray-100 px-2 py-2 rounded-md cursor-pointer"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <img
                      src="/icons/integration.svg"
                      alt="Integration"
                      className="w-5 h-5 mr-2"
                    />
                    <Link to="/integration">Integration</Link>
                  </li>
                  <li
                    className="flex items-center hover:bg-gray-100 px-2 py-2 rounded-md cursor-pointer"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <img
                      src="/icons/payment.svg"
                      alt="Payments"
                      className="w-5 h-5 mr-2"
                    />
                    Payments
                  </li>
                </ul>
              </div>

              {/* Spacer */}
              <div className="h-4"></div>

              {/* Support Section */}
              <div>
                <h3 className="text-[14px] font-semibold text-gray-500 px-2 uppercase mb-2">
                  Support
                </h3>
                <ul className="text-[14px] text-gray-700 space-y-2">
                  <li
                    className="flex items-center hover:bg-gray-100 px-2 py-2 rounded-md cursor-pointer"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <img src="/icons/faq.svg" alt="FAQ" className="w-5 h-5 mr-2" />
                    <Link to="/faq">FAQ's</Link>
                  </li>
                  <li
                    className="flex items-center hover:bg-gray-100 px-2 py-2 rounded-md cursor-pointer"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <img
                      src="/icons/feedback.svg"
                      alt="Submit Feedback"
                      className="w-5 h-5 mr-2"
                    />
                    <Link to="/feedback">Submit Feedback</Link>
                  </li>
                </ul>
              </div>

              <hr className="mt-1 mb-1" />

              {/* Sign Out */}
              <div
              className="flex items-center text-[14px] text-[#1C2434] px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer mb-2"
              onClick={() => {
                // Clear token from local storage
                localStorage.removeItem("authToken");
                // Redirect to sign-in page
                window.location.href = "/";
              }}
            >
                <img
                  src="/icons/log-out.svg"
                  alt="Sign Out"
                  className="w-5 h-5 mr-2"
                />
                Sign Out
              </div>
            </div>
          )}
        </div>
        {isPopupOpen && <BillingPopup onClose={handleClose} />}
    </aside>
  );
}
