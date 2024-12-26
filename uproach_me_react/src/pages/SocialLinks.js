import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {ICONS} from "../constants";

// Social Input Component for better scalability
const SocialInput = ({ imgSrc, bgColor, placeholder, label, value, onChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
        style={{ background: bgColor }}
      >
        <img src={imgSrc} alt={label} className="w-6 h-6" />
      </div>

      <div className="relative flex-grow">
        <label
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all duration-200 ${
            value ? "top-[12px] text-xs font-bold" : "top-1/2 text-sm"
          }`}
        >
          {label}
        </label>
        <input
          type="text"
          placeholder={value ? "" : placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-gray-100 pl-3 pb-3 pt-4 rounded-lg focus:outline-none text-sm"
        />
      </div>
    </div>
  );
};

const SocialLinksPage = () => {
  useEffect(() => {
    document.title = 'sociallinks'; // Set your desired page title here
  }, []);

  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    url: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    twitch: "",
    twitter: "",
    linkedin: "",
  });

  const socialLinks = [
    { key: "url", imgSrc: ICONS.URLICON , label: "Add your link", bgColor: "#cccccc" },
    { key: "instagram", imgSrc: ICONS.ION_LOGO_INSTAGRAM, label: "Instagram Username", bgColor: "linear-gradient(to bottom right, #8C48DB, #CC4499, #FFB133)" },
    { key: "tiktok", imgSrc: ICONS.TIKTOK, label: "TikTok Username", bgColor: "#010101" },
    { key: "youtube", imgSrc: ICONS.YOUTUBE, label: "YouTube Username", bgColor: "#FF0000" },
    { key: "twitch", imgSrc: ICONS.TWITCHS, label: "Twitch Username", bgColor: "rgb(156 66 255)" },
    { key: "twitter", imgSrc: ICONS.TWITTER, label: "Twitter Username", bgColor: "#010101" },
    { key: "linkedin", imgSrc: ICONS.LINKEDIN, label: "LinkedIn Username", bgColor: "#0077B5" },
  ];

  const handleInputChange = (key) => (event) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: event.target.value,
    }));
  };

  // Check if at least one input field is filled to enable the button
  const isButtonDisabled = Object.values(inputValues).every((value) => value.trim() === "");

  const handleSubmit = async () => {
    try {
      // Example of an API call - replace `/api/social-links` with your actual endpoint
      const token = localStorage.getItem("token"); // Assuming you're using a token for authorization
      const response = await fetch("/api/social-links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputValues),
      });

      if (response.ok) {
        // Redirect to the success page on successful submission
        navigate("/success");
      } else {
        console.error("Failed to submit social links");
      }
    } catch (error) {
      console.error("Error submitting social links:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Back and Skip Buttons */}
      <div className="xxl:pt-6 sm:pt-6 flex justify-between items-center">
        <button className="text-gray-500 hover:text-purple-500 ml-10 text-[14px]" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="text-gray-500 hover:text-purple-500 ml-4 mr-10 text-[14px]" onClick={() => navigate("/success")}>
          Skip
        </button>
      </div>

      {/* Progress Bar */}
      <div className="relative pt-2 px-4 mb-6">
        <div className="h-1 bg-gray-200 w-[250px] mx-auto rounded-full mt-[-18px]">
          <div className="h-1 bg-purple-500 w-full sm:mt-10 xxl:mt-0 rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full flex-grow">
        <div className="w-full max-w-lg text-center px-6">
          <h1 className="custom-welcome mb-5 tracking-tight sm:text-xl xxl:text-[38px] w-[563px] xxl:ml-[-55px] sm:ml-[-125px]">Almost done, One last thing</h1>
          <p className="custom-passages sm:text-xs xxl:text-sm font-bold">
            We’ll use this to automatically set up your link-in-bio
          </p>

          {/* Social Links Input List */}
          <div className="space-y-4 mt-8">
            {socialLinks.map((input) => (
              <div key={input.key} className="xxl:w-[440px] sm:w-[269px] xxl:ml-0 sm:ml-[17px]">
                <SocialInput
                  imgSrc={input.imgSrc}
                  bgColor={input.bgColor}
                  placeholder={input.placeholder}
                  label={input.label}
                  value={inputValues[input.key]}
                  onChange={handleInputChange(input.key)}
                  showLabel={Boolean(inputValues[input.key])}
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-10 mb-10">
            <button
              onClick={handleSubmit}
              disabled={isButtonDisabled}
              className={`xxl:w-[446px] sm:w-[276px] h-[48px] py-2 px-4 rounded-full font-semibold text-[14px] xxl:ml-[-22px] sm:ml-0 ${
                isButtonDisabled
                  ? "bg-[rgb(227,229,232)] cursor-not-allowed text-[#1e1f24]"
                  : "bg-[rgb(97,57,255)] hover:bg-customPurple text-white"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksPage;
