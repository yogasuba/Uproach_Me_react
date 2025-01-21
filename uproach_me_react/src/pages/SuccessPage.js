import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import { useAuth } from "../context/AuthContext";



export default function SuccessPage() {
  useEffect(() => {
    document.title = 'Success'; // Set your desired page title here
  }, []);

  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);
  const [profilePic, setProfilePic] = useState("/SVGRepo_iconCarrier.svg");
  const [profilename, setProfilename] = useState("User");
  const { completeSignup } = useAuth();


  useEffect(() => {
    // Load animation JSON from the public folder
    fetch("/animation.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const uid = localStorage.getItem("userId");
        if (!uid) {
          toast.error("User ID is missing.");
          return;
        }

        const response = await axios.post(
          "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/success-page",
          { uid },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Destructure response and set state
        const { profilePhoto = "/SVGRepo_iconCarrier.svg", profileName = "User" } = response.data || {};
        setProfilePic(profilePhoto);
        setProfilename(profileName);
      } catch (error) {
        toast.error("Error fetching profile data. Please try again.");
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmitSuccessPage = async () => {
    await completeSignup(); // Ensure `user` is updated

    navigate("/dashboard");
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
      {/* Lottie Animation */}
      {animationData && (
        <div className="absolute bottom-0 left-0 w-full h-[117%] z-0 flex mr-10">
          <Lottie animationData={animationData} loop={false} className="w-1/2 h-full pointer-events-none" />
          <Lottie animationData={animationData} loop={false} className="w-1/2 h-[117%] pointer-events-none" />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center z-10 p-4 sm:p-6">
        <h1 className="xxl:text-[32px] sm:text-xl font-bold mb-[46px]">Welcome to Uproach Me</h1>

        {/* User Image Container */}
        <div className="relative mt-10 mb-10 w-40 h-40 flex items-center justify-center">
          <div className="absolute w-[13rem] h-[13rem] rounded-lg border-4 border-white overflow-hidden">
            <div
              className="w-[396px] h-[396px]"
              style={{
                backgroundImage: `url(${profilePic || "/defaultbackground.jpg"})`,
                filter: "blur(5px)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          {/* Profile Image */}
          {profilePic ? (
            <img
              src={profilePic}
              alt="User Profile"
              className="shadow-lg relative z-10 w-[135px] h-[135px]  object-cover"
              onError={(e) => (e.target.src = "/SVGRepo_iconCarrier.svg")}
            />
          ) : (
            <div className="shadow-lg flex flex-col bg-purple-200 items-center z-10 w-[132px] h-[115px]">
              <span className="text-5xl mt-[40px] font-bold text-gray-600">
                {profilename.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Profile Name Overlay */}
          <p className="absolute bottom-0 bg-purple-500 text-white px-3 py-1 rounded-lg text-sm sm:text-base z-20 ml-[-37px]">
            {profilename.toUpperCase()}
          </p>
        </div>

        {/* Success Text */}
        <div className="text-center">
          <h2 className="xxl:text-[32px] sm:text-lg font-bold mb-[12px] mt-[31px]">You're all set up</h2>
          <p className="text-gray-500 xxl:text-[16px] sm:text-xs">Let's get started exploring Uproach Me</p>
        </div>

        {/* Continue Button */}
        <button
          type="button"
          className="xxl:w-[418px] sm:w-[276px] h-[48px] mt-[122px] flex justify-center rounded-full border border-transparent bg-[rgb(97,57,255)] py-3 px-2 text-sm font-medium text-white shadow-sm hover:bg-customPurple"
          onClick={handleSubmitSuccessPage}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
