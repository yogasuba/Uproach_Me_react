import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {IMAGES,ICONS} from "../constants"

export default function ResetPasswordPage() {
  useEffect(() => {
    document.title = 'ResetPassword'; // Set your desired page title here
  }, []);

  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get token from URL
    const token = new URLSearchParams(window.location.search).get('token'); 

    try {
      // Send token and new password to backend
      const response = await axios.post('', { // Replace with your backend URL
        token,
        newPassword,
      });

      if (response.status === 200) {
        toast.success('Password changed successfully!');
        
        // Redirect to the sign-in page
        navigate('/signin');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Reset Password Form */}
      <div className="lg:w-1/2 w-full bg-white flex flex-col justify-center relative px-6 sm:px-12 xxl:px-[7.5rem] xxl:mt-0 sm:mt-[75px]">
        <div className="max-w-md w-full mx-auto mb-[111px]">
          <img src={ICONS.LOGO} alt="Uproach Me Logo" width={130} height={50} className="mb-4" />
          <h1 className="custom-heading mb-3 mt-8 tracking-tight sm:text-xl xxl:text-3xl">Set your new password</h1>
          <p className="custom-passages mb-4 sm:text-xs xxl:text-sm font-bold">
            Please enter a new password for your Uproach Me account
          </p>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit}>
          <div className="relative mb-4 custom-inputfeild">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="xxl:w-[418px] sm:w-[276px] h-[48px] p-3 border rounded-[10px] xxl:text-[14px] sm:text-xs bg-white focus:outline-none focus:ring-0 transition-all duration-300"
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-3 top-3 custom-input-color transition-all transform ${
                  newPassword ? '-translate-y-4 scale-75 text-[12px] pt-[3px]' : 'xxl:text-[14px]'
                }`}
              >
                Password
              </label>
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img src={IMAGES.EYE} alt="Hide password" width={25} height={26} />
                ) : (
                  <img src={IMAGES.EYE_OFF} alt="Show password" width={20} height={20} />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="xxl:w-[418px] sm:w-[276px] h-[48px] mt-8 flex justify-center rounded-full border border-transparent bg-[rgb(97,57,255)] py-3 px-2 text-sm font-medium text-white shadow-sm hover:bg-customPurple"
            >
              {isSubmitting ? 'Processing...' : 'Set Password'}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Background with Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.BACKGROUND_PATTERN})` }}>
        <div className="flex items-center justify-center w-full h-full xxl:ml-[22px]">
          <img src={IMAGES.RIGHT_IMAGE} alt="Right side design" width={400} height={400} className="object-contain" />
        </div>
      </div>
    </div>
  );
}