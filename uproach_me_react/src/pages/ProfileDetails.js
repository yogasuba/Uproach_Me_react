import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cropper from "react-easy-crop";
import getCroppedImg from "../lib/getCroppedImg";
import { IMAGES } from "../constants";


const ProfileDetails = () => {
  useEffect(() => {
    document.title = "ProfileDetails"; // Set your desired page title here
  }, []);

  const navigate = useNavigate();
  const [profilename, setProfileName] = useState("");
  const [bio, setBio] = useState("");
  const [bioLength, setBioLength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Initialize the profile picture with Google photo URL from localStorage
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profileUrl") || "/SVGRepo_iconCarrier.svg"
  );

  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropModal, setShowCropModal] = useState(false);

  // Disable button if profile name is empty
  useEffect(() => {
    setIsButtonDisabled(profilename.trim() === "");
  }, [profilename]);

  const handleNext = async () => {
    setIsSubmitting(true);

    const profilePicToSave =
      profilePic === "/SVGRepo_iconCarrier.svg" ? null : profilePic;
    const uid = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      toast.error("Authentication token is missing. Please sign in again.");
      setIsSubmitting(false);
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.put(
        "https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/user/profile-details",
        {
          uid,
          profilePicture: profilePicToSave,
          profileName: profilename,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile saved successfully!");
        navigate("/sociallinks");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error saving profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setProfilePic(croppedImage); // Set the cropped image as the profile pic
      setShowCropModal(false);
    } catch (error) {
      console.error("Error cropping image", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Back Button */}
      <div className="pt-6 sm:px-6">
        <button
          className="text-gray-500 hover:text-purple-500 ml-4 text-[14px]"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      {/* Progress Bar */}
      <div className="relative pt-2 px-4 mb-6">
        <div className="h-1 bg-gray-200 w-[250px] mx-auto rounded-full mt-[-18px]">
          <div className="h-1 bg-purple-500 w-1/2 sm:mt-10 xxl:mt-0 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full flex-grow">
        <div className="w-full max-w-lg text-center px-6">
          <h1 className="custom-welcome mb-5 tracking-tight sm:text-xl xxl:text-[38px] w-[501px] sm:ml-[-87px] xxl:ml-[-20px]">
            Add your profile details
          </h1>
          <p className="custom-passages mb-9 sm:text-xs xxl:text-sm font-bold">
            We'll use this to automatically set up your link-in-bio
          </p>

          {/* Profile Picture */}
          <div className="mb-6 relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto relative overflow-hidden">
              <img
                src={profilePic || "/SVGRepo_iconCarrier.svg"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => (e.target.src = "/SVGRepo_iconCarrier.svg")}
              />
            </div>
            <div className="absolute top-[4rem] left-[calc(50%-1rem)] bg-black p-1 rounded-full cursor-pointer ml-9">
              <input
                type="file"
                accept="image/*"
                className="opacity-0 absolute inset-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <img src={IMAGES.CAMERA} alt="Camera Icon" className="w-6 h-6" />
            </div>
          </div>

          {/* Profile Title and Bio */}
          <div className="mb-8">
            <div className="mb-4">
              <label className="custom-inputfeild block text-sm font-bold text-gray-800 mb-3">
                Add title and bio
              </label>
              <input
                type="text"
                placeholder="Profile name"
                value={profilename}
                onChange={(e) => setProfileName(e.target.value)}
                className="xxl:w-[418px]  sm:w-[276px] h-[48px] py-2 px-4 rounded-md text-[14px] bg-gray-100"
              />
            </div>
            <div className="relative mb-4">
              <textarea
                rows="3"
                maxLength="2500"
                placeholder="Bio (optional)"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                  setBioLength(e.target.value.length);
                }}
                className="xxl:w-[418px] h-[164px] sm:w-[276px] py-2 px-4 rounded-md text-[14px] bg-gray-100 overflow-y-auto scrollbar-hide"
                style={{ resize: "none" }}
              />
              <p className="absolute bottom-2 right-1 xxl:mr-10 sm:mr-10 text-[12px] text-gray-500">
                {bioLength}/2500
              </p>
            </div>

          </div>

          {/* Next Button */}
          <div className="mb-6">
            <button
              onClick={handleNext}
              disabled={isButtonDisabled}
              className={`mt-[52px] xxl:w-[418px] sm:w-[276px] h-[48px] py-2 px-4 rounded-full font-semibold text-[14px] xxl:ml-[6px] sm:ml-0 ${
                isButtonDisabled
                  ? "bg-[rgb(227,229,232)] cursor-not-allowed text-[#1e1f24]"
                  : "bg-[rgb(97,57,255)] hover:bg-customPurple text-white"
              }`}
            >
              {isSubmitting ? "Processing..." : "Next"}
            </button>
          </div>

          <p className="mt-6 mb-3 text-xs text-gray-500">
            Already have an account?{" "}
            <a href="/" className="text-purple-600 hover:underline font-bold">
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Crop Modal */}
      {showCropModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <div className="relative w-[300px] h-[400px]">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowCropModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCropComplete}
                className="px-4 py-2 bg-purple-500 text-white rounded-md"
              >
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
