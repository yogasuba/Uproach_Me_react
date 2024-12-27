import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {IMAGES,ICONS} from "../constants"

export default function ForgotPasswordPage() {
  useEffect(() => {
    document.title = 'ForgotPassword'; // Set your desired page title here
  }, []);

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track if the form was successfully submitted
  const [isSubmitting, setIsSubmitting] = useState(false); // Track the loading state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setIsSubmitting(true); // Show loading state

    try {
      // Make API call to Node.js backend for password reset
      const response = await axios.post('', { email });
      
      if (response.status === 200) {
        setSubmitted(true); // Indicate that the form was submitted successfully
        toast.success('Password reset link has been sent to your email.');
      }
    } catch (error) {
      // Handle any errors from the API
      const errorMessage = error.response?.data?.message || 'Something went wrong, please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false); // Stop loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Left Side - Signup Form */}
      <div className="lg:w-1/2 w-full bg-white flex flex-col justify-center relative px-6 sm:px-12 xxl:px-[7.5rem] xxl:mt-0 sm:mt-[75px]">
        <div className="max-w-md w-full mx-auto mb-[111px]">
          {/* Conditional rendering: hide back arrow if the form is submitted */}
          {!submitted && (
            <a href="/signin" className="absolute top-4 left-4 text-gray-600 hover:text-gray-800">
              <img src={IMAGES.ARROW_LEFT} alt="arrow" width={24} height={24} className="xxl:m-[33px] sm:m-[22px]" />
            </a>
          )}

          <img src={ICONS.LOGO} alt="Uproach Me Logo" width={130} height={50} className="mb-4 mx-auto sm:mx-0 " />

          {/* Conditional rendering: show form or success message */}
          {!submitted ? (
            <>
              <h1 className="custom-heading mb-3 mt-8 tracking-tight sm:text-xl xxl:text-3xl">
                Forgot your password?
              </h1>
              <p className="custom-passages mb-4 sm:text-xs xxl:text-sm font-bold">
                To reset your password, please enter the email address.
              </p>

              {/* Reset Password Form */}
              <form onSubmit={handleSubmit}>
                {/* Email Input Field */}
                <div className="relative mb-4 custom-inputfeild">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="xxl:w-[418px] sm:w-[276px] h-[48px] p-3 border rounded-[10px] xxl:text-[14px] sm:text-xs bg-white focus:outline-none focus:ring-0 transition-all"                
                      required
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-3 top-3 custom-input-color transition-all transform  ${
                        email ? '-translate-y-4 scale-75 text-[12px] pt-[3px]' : 'xxl:text-[14px]'
                      }`}
                    >
                      Email
                    </label>
                  </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="xxl:w-[418px] sm:w-[276px] h-[48px] mt-8 flex justify-center rounded-full border border-transparent bg-[rgb(97,57,255)] py-3 px-2 text-sm font-medium text-white shadow-sm hover:bg-customPurple"
            >
              {isSubmitting ? 'Processing...' : 'Reset Password'}
            </button>
          </form>
            </>
          ) : (
            // Success message
            <div className="items-start justify-center mb-[111px] sm:ml-2 xxl:ml-0">
              <h1 className="custom-heading mb-3 mt-8 tracking-tight sm:text-xl xxl:text-3xl">
                Forgot your password?
              </h1>
              <p className="custom-passages mb-4 sm:text-xs xxl:text-sm font-bold">
                You have been emailed a password reset link.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Background with Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center xxl:h-screen" style={{  backgroundImage: `url(${IMAGES.BACKGROUND_PATTERN})` }}>
        <div className="flex items-center justify-center w-full h-full ml-[22px]">
          <img src={IMAGES.RIGHT_IMAGE} alt="Right side design" width={400} height={400} className="object-contain" />
        </div>
      </div>
    </div>
  );
}