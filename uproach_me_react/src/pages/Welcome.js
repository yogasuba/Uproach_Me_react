import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { IMAGES } from "../constants";

const WelcomePage = () => {
  useEffect(() => {
    document.title = "Welcome"; // Set your desired page title here
  }, []);

  const [username, setUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const checkUsernameAvailability = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const uid = localStorage.getItem("userId");
  
      if (!token || !uid) {
        toast.error("Authentication details missing. Please log in again.");
        navigate("/login");
        return;
      }
  
      const availabilityResponse = await axios.get(
        "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/checkUsernameAvailability",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { username },
        }
      );
  
      console.log("Availability API Response:", availabilityResponse.data);
  
      if (availabilityResponse.data?.available) {
        setIsAvailable(true);
        setError("");
      } else {
        setIsAvailable(false);
        setError(`Username "${username}" is not available.`);
        return; // Stop here if the username is unavailable
      }
  
      // Update the username only if available
      const updateResponse = await axios.put(
        "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/user/username",
        { uid, username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Update API Response:", updateResponse.data);

    } catch (err) {
      console.error("API Error:", err);
      toast.error("Error occurred while processing your request.");
      setIsAvailable(null);
    }
  }, [username, navigate]);
  
  

  useEffect(() => {
    if (username.trim() !== "") {
      setIsAvailable(null); // Reset availability when username changes
      setError(""); // Reset error message
  
      const delayDebounce = setTimeout(() => {
        checkUsernameAvailability();
      }, 500); // Debounce API calls by 500ms
  
      return () => clearTimeout(delayDebounce);
    } else {
      setError("");
      setIsAvailable(null);
    }
  }, [username, checkUsernameAvailability]);
  

  const handleContinue = () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty.");
      return;
    }
  

  
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Username created successfully.");
      navigate("/profiledetails");
      setIsSubmitting(false);
    }, 2000);
  };
  

  const isButtonDisabled =
    username.trim() === "" || isSubmitting || isAvailable === false;
    

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="pt-6 sm:px-6">
        <button
          className="text-gray-500 hover:text-purple-500 ml-4 text-[14px]"
          onClick={() => navigate(-1)} // Navigate back
        >
          Back
        </button>
      </div>

      <div className="flex flex-col items-center w-full flex-grow">
        <div className="w-full max-w-md text-center px-4 sm:px-6 md:px-8 lg:px-10 sm:ml-[58px] xxl:ml-0">
          <div className="mb-6 w-full px-6">
            <div className="relative">
              <div className="h-1 bg-gray-200 w-[250px] mx-auto rounded-full mt-[-18px] mb-[44px] sm:ml-[12px] xxl:ml-[34px]">
                <div className="h-1 bg-purple-500 w-1/3 sm:mt-10 xxl:mt-0 rounded-full"></div>
              </div>
            </div>
          </div>

          <h1 className="custom-welcome mb-6 tracking-tight sm:text-xl xxl:text-[38px] w-[501px] xxl:ml-[-55px] sm:ml-[-88px]">
            Welcome to Uproach Me
          </h1>
          <p className="custom-passages mb-9 sm:text-xs xxl:text-sm font-bold">
            In a few minutes your link will be ready
          </p>

          <div className="mb-8 px-6">
            <label className="custom-inputfeild block text-sm font-bold text-gray-800 mb-3">
              Claim Your Profile URL
            </label>
            <div className="relative w-full mx-auto">
              <span className="absolute inset-y-0 xxl:left-[-29px] sm:left-0 pl-3 flex items-center text-[#686A74] text-[14px]">
                Uproach.me/
              </span>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`block pl-[118px] pr-10 py-2 xxl:w-[418px] sm:w-[276px] h-[48px] xxl:ml-[-51px] ${
                  isAvailable === false
                    ? "border-red-500 bg-red-100"
                    : isAvailable === true
                    ? "border-green-500 bg-white"
                    : "border-gray-100"
                } bg-[rgb(246,246,249)] rounded-[10px] focus:ring-indigo-500 focus:border-indigo-500 text-[14px]`}
              />

              {isAvailable === true && (
                <span className="absolute inset-y-0 xxl:right-[-46px] sm:right-0 pr-3 flex items-center text-green-500">
                  <img
                    src={IMAGES.TICK}
                    alt="Available"
                    className="h-5 w-5"
                  />
                </span>
              )}
            </div>
            {error && (
              <p className="text-red-500 text-[12px] mt-2 xxl:ml-[-213px] sm:ml-[-110px]">
                {error}
              </p>
            )}
          </div>

          <div className="px-6">
            <button
              onClick={handleContinue}
              disabled={isButtonDisabled}
              className={` mt-[181px] xxl:w-[418px] sm:w-[276px] h-[48px] py-2 px-4 rounded-full font-semibold text-[14px] xxl:ml-[-47px] sm:ml-0 ${
                isButtonDisabled
                  ? "bg-[rgb(227,229,232)] cursor-not-allowed text-[#1e1f24]"
                  : "bg-[rgb(97,57,255)] hover:bg-customPurple text-white"
              }`}
            >
              {isSubmitting ? "Processing..." : "Continue"}
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Already have an account?{" "}
            <a href="/" className="text-purple-600 hover:underline font-bold">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
