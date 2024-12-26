import React, { useState,useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import {ICONS, IMAGES} from "../constants";



export default function ProfilePage() {
  useEffect(() => {
    document.title = 'Profile'; // Set your desired page title here
  }, []);

  const [activeTab, setActiveTab] = useState("profile"); // State for active tab
  const [selectedMethod, setSelectedMethod] = useState("bank");

  const [profileData] = useState({
    profilePic: "/profile.jpg", // Default Profile Picture
    lastupadte: "Updated on 19 Oct",
    profileUrl: "Uproach me.in/vignesh03",
    profileName: "vignesh03",
    email: "vignesh03@gmail.com",
    mobile: "+91 9876543210",
    password: "********",
    bio: "Lorem ipsum dolor sit amet consectetur. Eget dui convallis potenti lacus cras nec. Tempus enim accumsan malesuada at vitae in euismod in odio.",
  });


  const [themeColor, setThemeColor] = useState("#6A35FF"); // Selected color state
  const [showColorPicker, setShowColorPicker] = useState(false); // Toggle picker
  const [savedColors, setSavedColors] = useState(["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#4B0082"]); // Default saved colors

  const [rgbaValues, setRgbaValues] = useState({
    r: 106,
    g: 53,
    b: 255,
    a: 100, // Alpha percentage
  });

  // Update RGBA based on HEX
  const updateRgbaFromHex = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    setRgbaValues((prev) => ({ ...prev, r, g, b }));
  };

  // Update HEX based on RGBA
  const updateHexFromRgba = () => {
    const { r, g, b } = rgbaValues;
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    setThemeColor(hex);
  };

  const handleSaveColor = () => {
    if (!savedColors.includes(themeColor)) {
      setSavedColors([...savedColors, themeColor]);
    }
  };


  const handleSaveChanges = () => {
    alert("Profile changes saved!");
  };

  return (
    <div className="p-8 w-full xxl:min-h-screen sm:h-[1872px] bg-gray-50 sm:mt-[77px] xxl:mt-0">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[22px] font-semibold text-gray-800">Profile</h1>
        <button
          onClick={handleSaveChanges}
          className="bg-[#6139FF] text-white px-6 py-2 rounded-full shadow-md hover:bg-customPurple"
        >
          Save Changes
        </button>
      </div>

      {/* Tabs Section */}
      <div className="flex border-b mb-8">
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === "profile"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === "account"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("account")}
        >
          Account
        </button>
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === "payout-settings"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("payout-settings")}
        >
          Payout Settings
        </button>
      </div>

      {activeTab === "profile" && (
        <>
          {/* Profile Section */}
          <div>
            {/* Profile Picture Section */}
            <div className="flex items-center justify-between mb-6 xxl:w-[677px] sm:w-[298px] xxl:ml-[149px] xxxl:ml-[237px]">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={profileData.profilePic}
                    alt="Profile"
                    className="xxl:w-[103px] xxl:h-[103px] sm:w-[74px] h-[74px] rounded-full object-cover"
                    onError={(e) => (e.target.src = "/SVGRepo_iconCarrier.svg")} // Fallback
                  />
                  <button className="absolute bottom-0 right-0 bg-white rounded-[7px] xxl:w-[44px] xxl:h-[44px] sm:w-[24px] sm:h-[24px]">
                    <img
                      src="/icons/Qr-code.svg"
                      alt="QR Code"
                      className="w-[33px] h-[33px] cursor-pointer ml-[6px]"
                      onClick={() => alert("QR Code clicked!")}
                    />
                  </button>
                </div>
                <div>
                  <h2 className="xxl:text-[28px] sm:text-[20px] font-bold text-gray-800">
                    Profile Photo
                  </h2>
                  <p className="text-gray-500 text-sm">{profileData.lastupadte}</p>
                </div>
              </div>

              {/* Edit Photo Button */}
              <div className="text-[#6139FF] xxl:text-[14px] sm:text-[7px] font-semibold">
                <button>Edit photo</button>
              </div>
            </div>

            {/* Information Section */}
            <h2 className="text-lg font-semibold mt-8 mb-4 xxl:ml-[149px] xxxl:ml-[237px]">
              Information
            </h2>
            <div className="bg-white p-8 xxl:w-[677px] sm:w-[298px] xxl:ml-[149px] xxxl:ml-[237px] rounded-md">
              {/* Profile URL */}
              <div className="mb-6">
                <label className="block text-[12px] text-gray-700 font-medium mb-2">
                  Profile URL
                </label>
                <div className="flex items-center text-[14px]">
                  <span className="text-gray-500">Uproach.me.in/</span>
                  <span className="ml-1 text-gray-700">{profileData.profileName}</span>
                  <img
                    src="/icons/green_tick.svg"
                    alt="QR Code"
                    className="ml-auto cursor-pointer"
                    onClick={() => alert("success")}
                  />
                </div>
              </div>

              <hr className="border-gray-300 mb-3" />

              {/* Profile Name */}
              <div className="mb-6">
                <label className="block text-[12px] text-gray-700 font-medium mb-2">
                  Profile Name
                </label>
                <div className="text-[14px] text-gray-700">{profileData.profileName}</div>
              </div>

              <hr className="border-gray-300 mb-3" />

              {/* Bio */}
              <div>
                <label className="block text-[12px] text-gray-700 font-medium mb-2">
                  Bio
                </label>
                <div className="text-[14px] text-gray-700">{profileData.bio}</div>
              </div>
            </div>

            {/* Social Media Section */}
            <h2 className="text-lg font-semibold mt-8 mb-2 xxl:ml-[149px] xxxl:ml-[237px]">
              Social Media
            </h2>
            <div className="bg-white px-8 py-12 xxl:w-[677px] sm:w-[298px] xxl:ml-[149px] xxxl:ml-[237px] rounded-md mt-5">
              <div className="space-y-12">
                {/* Social Media Links */}
                {[
                  {
                    placeholder: "Add your link",
                    icon: ICONS.URLICON,
                    bgColor: "#F6F6F9",
                    iconSize: "w-6 h-6",
                  },
                  {
                    placeholder: "Instagram Username",
                    icon: ICONS.ION_LOGO_INSTAGRAM,
                    bgColor:
                      "linear-gradient(to bottom right, #8C48DB, #CC4499, #FFB133)",
                    iconSize: "w-8 h-8",
                  },
                  {
                    placeholder: "Tik Tok Username",
                    icon: ICONS.TIKTOK,
                    bgColor: "#010101",
                    iconSize: "w-7 h-7",
                  },
                  {
                    placeholder: "YouTube Username",
                    icon: ICONS.YOUTUBE,
                    bgColor: "#FF0000",
                    iconSize: "w-7 h-7",
                  },
                  {
                    placeholder: "Twitch Username",
                    icon: ICONS.TWITCHS,
                    bgColor: "rgb(156, 66, 255)",
                  },
                  {
                    placeholder: "Twitter Username",
                    icon: ICONS.TWITTER,
                    bgColor: "#010101",
                    iconSize: "w-7 h-7",
                  },
                  {
                    placeholder: "LinkedIn Username",
                    icon: ICONS.LINKEDIN,
                    bgColor: "#0077B5",
                    iconSize: "w-7 h-7",
                  },
                ].map((item, index) => (
                  <div key={index} className="relative mb-6">
                    {/* Icon */}
                    <div
                      className="absolute left-0 top-1/2 ml-[-11px] transform -translate-y-1/2 w-[48px] h-[48px] flex items-center justify-center rounded-full"
                      style={{ background: item.bgColor }}
                    >
                      <img
                        src={item.icon}
                        alt={item.placeholder}
                        className={`${item.iconSize}`}
                      />
                    </div>

                    {/* Input and Floating Label */}
                    <div className="flex flex-col ml-12">
                      <input
                        type="text"
                        id={`input-${index}`}
                        className="peer mt-4 w-full bg-transparent focus:outline-none text-gray-800 border-b border-gray-300 focus:ring-0 placeholder-transparent"
                      />
                      <label
                        htmlFor={`input-${index}`}
                        className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:transform peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:text-xs"
                      >
                        {item.placeholder}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          {/* Display Section */}
          <h2 className="text-lg font-semibold mt-8 mb-2 xxl:ml-[149px] xxxl:ml-[237px]">
              Display
          </h2>
          <div className="bg-white p-8 xxl:w-[677px] sm:w-[298px] xxl:ml-[149px] xxxl:ml-[237px] rounded-md mt-5">
              {/* Profile Theme */}
              <div className="pb-6 border-b border-gray-300">
              <div className="flex justify-between items-center">
                  <div>
                  <h3 className="text-md font-medium">Profile theme</h3>
                  <p className="text-gray-500 text-sm">Customize your profile to your brand</p>
                  </div>
                  <div className="flex items-center space-x-2 relative">
                  {/* Color Preview */}
                  <div
                      className="w-6 h-6 rounded-sm border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: themeColor }}
                      onClick={() => setShowColorPicker(!showColorPicker)}
                  ></div>
                  <button
                      className="text-indigo-600 font-medium hover:underline"
                      onClick={() => setShowColorPicker(!showColorPicker)}
                  >
                      Edit
                  </button>

                {/* Color Picker */}
                {showColorPicker && (
                  <div className="absolute bottom-full left-0 mt-2 z-10 bg-white shadow-lg p-4 rounded-md">
                    <HexColorPicker
                      color={themeColor}
                      onChange={(color) => {
                        setThemeColor(color);
                        updateRgbaFromHex(color);
                      }}
                      className="mb-4"
                    />

                    {/* HEX Input */}
                    <div className="flex items-center space-x-2 mb-4">
                      <label className="text-sm text-gray-500">HEX:</label>
                      <input
                        type="text"
                        value={themeColor}
                        onChange={(e) => {
                          setThemeColor(e.target.value);
                          updateRgbaFromHex(e.target.value);
                        }}
                        className="border rounded-md px-2 py-1 text-sm w-full"
                      />
                    </div>

                    {/* RGB Inputs */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex flex-col">
                        <label className="text-sm text-gray-500">R:</label>
                        <input
                          type="number"
                          value={rgbaValues.r}
                          onChange={(e) => setRgbaValues((prev) => ({ ...prev, r: +e.target.value }))}
                          onBlur={updateHexFromRgba}
                          className="border rounded-md px-2 py-1 text-sm w-16"
                          min={0}
                          max={255}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm text-gray-500">G:</label>
                        <input
                          type="number"
                          value={rgbaValues.g}
                          onChange={(e) => setRgbaValues((prev) => ({ ...prev, g: +e.target.value }))}
                          onBlur={updateHexFromRgba}
                          className="border rounded-md px-2 py-1 text-sm w-16"
                          min={0}
                          max={255}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm text-gray-500">B:</label>
                        <input
                          type="number"
                          value={rgbaValues.b}
                          onChange={(e) => setRgbaValues((prev) => ({ ...prev, b: +e.target.value }))}
                          onBlur={updateHexFromRgba}
                          className="border rounded-md px-2 py-1 text-sm w-16"
                          min={0}
                          max={255}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm text-gray-500">A:</label>
                        <input
                          type="number"
                          value={rgbaValues.a}
                          onChange={(e) => setRgbaValues((prev) => ({ ...prev, a: +e.target.value }))}
                          className="border rounded-md px-2 py-1 text-sm w-16"
                          min={0}
                          max={100}
                        />
                      </div>
                    </div>

                    {/* Saved Colors */}
                    <div className="mb-4">
                      <label className="text-sm text-gray-500 mb-2">Saved Colors:</label>
                      <div className="flex items-center space-x-2 mt-2">
                        {savedColors.map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full cursor-pointer border"
                            style={{ backgroundColor: color }}
                            onClick={() => setThemeColor(color)}
                          ></div>
                        ))}
                        <button
                          className="w-6 h-6 border rounded-full flex items-center justify-center text-xs font-bold text-gray-600"
                          onClick={handleSaveColor}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Font Size */}
          <div className="pt-6">
            <div className="flex flex-col xxl:flex-row xxl:justify-between xxl:items-center sm:items-bottom">
              <div>
                <h3 className="text-md font-medium">Font Size</h3>
                <p className="text-gray-500 text-sm">
                  Customize your profile to your brand
                </p>
              </div>
              <div className="mt-4 flex items-center sm:space-x-4 ">
                {/* Font Size Control */}
                <span className="text-gray-500 text-sm font-medium">A</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-32 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-indigo-500 mx-4 sm:mx-0"
                />
                <span className="text-gray-800 text-lg font-medium">A</span>
              </div>
  </div>
        </div>
      </div>
    </div>
    </>
  )}  

    {activeTab === "account" && (
    <div className="bg-gray-50 flex items-center justify-center">
    <div className=" w-[677px]">
      {/* Header */}
      <h3 className="text-[16px] font-semibold text-[#1E1F24] mb-4">Information</h3>

      {/* White Box for Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* Email Address */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email address</label>
            <p className="text-gray-900 text-sm font-medium">{profileData.email}</p>
            <hr className="border-gray-300 mt-2" />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Mobile number</label>
            <p className="text-gray-900 text-sm font-medium">{profileData.mobile}</p>
            <hr className="border-gray-300 mt-2" />
          </div>

          {/* Password */}
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Password</label>
              <p className="text-gray-900 text-sm font-medium">{profileData.password}</p>
            </div>
            <button className="text-indigo-600 text-sm font-semibold hover:underline">
              Change
            </button>
          </div>
          <hr className="border-gray-300 mt-2" />
        </div>
      </div>
    </div>
  </div>
  
  )}     
    {activeTab === "payout-settings" && (
      <div className="xxl:w-[965px] xxxl:w-[1139px] bg-white p-4 md:p-8 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          {/* Left Side: Payment Method Info */}
          <div className="md:w-1/3">
            <h2 className="text-[22px] font-bold mb-1">Payment method</h2>
            <p className="text-gray-600 mb-1 md:mb-6 text-[14px]">
              Select a default payout method
            </p>
          </div>

          {/* Right Side: Payout Method Selection and Form */}
          <div className="flex flex-col xxl:w-[680px] sm:w-[261px] gap-6">
            {/* Payout Method Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bank Account Button */}
              <button
                className={`flex items-center gap-3 p-4 rounded-lg w-full bg-[#F6F6F9] ${
                  selectedMethod === "bank" ? "border border-[#B8B8C7]" : ""
                }`}
                onClick={() => setSelectedMethod("bank")}
              >
                <img
                  src={IMAGES.BANK}
                  alt="Bank Icon"
                  className="border border-black bg-[#1E1F24] rounded-[10px] w-10 h-10 object-contain"
                />
                <div>
                  <h3 className="font-medium text-[16px]">Bank account</h3>
                  <p className="text-gray-500 text-[14px]">
                    Get paid out to your Bank account
                  </p>
                </div>
              </button>

              {/* Stripe Button */}
              <button
                className={`flex items-center gap-3 p-4 rounded-lg w-full bg-[#F6F6F9] ${
                  selectedMethod === "stripe" ? "border border-[#B8B8C7]" : ""
                }`}
                onClick={() => setSelectedMethod("stripe")}
              >
                <img
                  src={IMAGES.STRIPE}
                  alt="Stripe Icon"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h3 className="font-medium text-[16px]">Stripe</h3>
                  <p className="text-gray-500 text-[14px]">
                    Get paid out to your Stripe account
                  </p>
                </div>
              </button>
            </div>

            {/* Conditional Content Rendering */}
            {selectedMethod === "bank" && (
              <form className="grid gap-4">
                <p className="text-gray-500 text-[14px]">
                  All sales will incur a 10% Uproachme fee + 2.9$ + 20$ credit card fee
                </p>
                <div>
                    <label className="block text-[#5A5A5A] mb-2 text-[14px]">
                      Pay of the order of
                    </label>
                    <input
                      type="text"
                      placeholder="Full name of account number"
                      className="w-full text-[14px] text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B8C7]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                    <div>
                      <label className="block text-[#5A5A5A] mb-2 text-[14px]">IFSC Code</label>
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="w-full text-[14px] text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B8C7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5A5A5A] mb-2 text-[14px]">Account number</label>
                      <input
                        type="text"
                        placeholder="1234567890"
                        className="w-full text-[14px] text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B8C7]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#5A5A5A] mb-2 text-[14px]">First name</label>
                      <input
                        type="text"
                        placeholder="First name"
                        className="w-full text-[14px] text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B8C7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5A5A5A] mb-2 text-[14px]">Last name</label>
                      <input
                        type="text"
                        placeholder="Last name"
                        className="w-full text-[14px] text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B8C7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#5A5A5A] mb-2 text-[14px]">Address</label>
                    <input
                      type="text"
                      placeholder="Street address"
                      className="w-full  text-[14px] text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B8C7]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#5A5A5A] mb-2 text-[14px]">City</label>
                      <input
                        type="text"
                        placeholder="City"
                        className="w-full text-[14px] text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B8C7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5A5A5A] mb-2 text-[14px]">Postal code</label>
                      <input
                        type="text"
                        placeholder="Postal code"
                        className="w-full text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B8C7] text-[14px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#5A5A5A] mb-2 text-[14px]">Country</label>
                    <select className="w-full text-[14px] text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B8C7]">
                      <option value="India">India</option>
                      {/* Add more country options */}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#5A5A5A] mb-2 text-[14px]">Day</label>
                      <select className="w-full text-[14px] text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B8C7]">
                        {[...Array(31)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#5A5A5A] mb-2 text-[14px]">Month</label>
                      <select className="w-full text-[14px] text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B8C7]">
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#5A5A5A] mb-2 text-[14px]">Year</label>
                      <select className="w-full text-[14px] text-[#80828D] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        {Array.from(
                          { length: 100 },
                          (_, i) => new Date().getFullYear() - i
                        ).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
              </form>
            )}

            {selectedMethod === "stripe" && (
              <div>
                <p className="text-gray-500 text-[14px]">
                  All sales will incur a 10% Uproachme fee. This feature is available
                  in all countries where Stripe operates except Brazil, India, Indonesia,
                  Malaysia, Mexico, Philippines, and Thailand.
                </p>
                <button className="flex items-center gap-2 mt-4 px-6 py-3 bg-gray-400 hover:bg-gray-300 text-white font-medium rounded-[91px]">
                <img
                  src={IMAGES.STRIPE_ICON}
                  alt="Strip"
                  className="w-6 h-6"
                />
                  Connect with Stripe
                </button>
              </div>
            )}
          </div>
        </div>
        <hr className="border-gray-300 mb-6 mt-10" />


        {/* PayPal Section */}
        <div className="mt-6 md:flex md:items-start md:justify-between">
            {/* Left Side: PayPal Info */}
            <div className="md:w-1/3">
              <h3 className="text-[22px] font-semibold">PayPal</h3>
              <p className="text-gray-600 mb-1 text-[14px]">
                Select a default payout method
              </p>
            </div>
            {/* Right Side: PayPal Details and Button */}
            <div className="md:w-2/3">
              <p className="text-gray-600 mt-2 text-[14px]">
                Connecting a PayPal account will allow you to accept payments. With
                PayPal, each purchase made will be deposited into your PayPal account
                immediately. Payments via PayPal are supported in every country except
                Brazil, India, Israel, Japan, Micronesia, and Turkey.
              </p>
              <p className="text-gray-500 mt-2 text-[14px]">
                All sales will incur a 10% Uproachme fee
              </p>
              <button className="flex items-center ml-[-13px] gap-2 mt-4 px-6 py-3 bg-gray-400 hover:bg-gray-300 text-white font-medium rounded-[91px]">
                <img
                  src={IMAGES.PAYPAL}
                  alt="PayPal"
                  className="w-6 h-6"
                />
                Connect with PayPal
              </button>
            </div>
            </div>
        </div>
      )}
  </div>
  );
}
