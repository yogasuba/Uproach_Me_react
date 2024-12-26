import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; 
import {IMAGES,ICONS} from "../constants";


export default function SignupPage() {
  useEffect(() => {
    document.title = 'Signup'; // Set your desired page title here
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  const handleGoogleSignIn = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/google-signin'); // Redirect to backend for Google sign-in
      if (response.status === 200) {
        toast.success('Successfully signed in with Google');
        navigate('/welcome');
      } else {
        toast.error('Failed to sign in with Google');
      }
    } catch (error) {
      console.error('Google sign-in error:', error.message);
      toast.error('Google sign-in failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        toast.success('Signup successful!');
        navigate('/welcome');
      } 
    } catch (err) {
      setError(err.message);
      if (err.response && err.response.status === 409) {
        toast.error('User already exists!');
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-lg font-semibold">Loading... Please wait</h2>
        {/* Loading animation */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center p-6 lg:p-12">
        <div className="max-w-md xxl:ml-[3.5rem] sm:ml-[12px]">
          <img src={ICONS.LOGO} alt="Uproach Me Logo" width={130} height={50} className="mb-4" />
          <h1 className="custom-heading mb-3 tracking-tight sm:text-xl xxl:text-3xl">Sign up to Uproach Me</h1>
          <p className="mb-6 sm:text-xs xxl:text-sm">
            Already have an account?{' '}
            <a href="/" className="text-[rgb(97,57,255)] font-medium">Sign in</a>
          </p>

            {/* Google and Apple Buttons */}
            <div className="flex space-x-4 mb-4">
              <button
                onClick={handleGoogleSignIn}
                className="xxl:w-[202px] xxl:h-[40px] sm:w-[135px] sm:w-1/1 inline-flex items-center justify-center rounded-[10px] border border-gray-300 bg-white px-4 py-2 xxl:text-sm sm:text-[9px] font-regular text-gray-700 shadow-sm hover:bg-gray-50 whitespace-nowrap"
              >
                <img src={ICONS.GOOGLE_ICON} alt="Google" width={20} height={20} className="mr-2" />
                Continue with <span className="font-bold ml-1">Google</span> {/* Bold only "Google" */}
              </button>
              
              <button className="xxl:w-[202px] xxl:h-[40px] sm:w-[128px] sm:w-1/1 inline-flex items-center justify-center rounded-[10px]  border border-gray-300 bg-white px-4 py-2 xxl:text-sm sm:text-[9px] font-regular text-gray-700 shadow-sm hover:bg-gray-50 whitespace-nowrap ">
                <img src={ICONS.APPLE_ICON} alt="Apple" width={20} height={20} className="mr-2" />
                Continue with <span className="font-bold ml-1">Apple</span> {/* Bold only "Apple" */}
              </button>
            </div>

          <div className="or-divider">
            <div className="line"></div>
            <span className="text">or</span>
            <div className="line"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-4 custom-inputfeild">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="xxl:w-[418px] sm:w-[276px] h-[48px] p-3 border rounded-[10px] xxl:text-[14px] sm:text-xs bg-white focus:outline-none focus:ring-0 transition-all duration-300"
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

            <div className="relative mb-4 custom-inputfeild">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="xxl:w-[418px] sm:w-[276px] h-[48px] p-3 border rounded-[10px] xxl:text-[14px] sm:text-xs bg-white focus:outline-none focus:ring-0 transition-all duration-300"
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-3 top-3 custom-input-color transition-all transform ${
                  password ? '-translate-y-4 scale-75 text-[12px] pt-[3px]' : 'xxl:text-[14px]'
                }`}
              >
                Password
              </label>
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer mr-10 "
                onClick={togglePasswordVisibility}
              >
                <img src={showPassword ? IMAGES.EYE : IMAGES.EYE_OFF} alt="Toggle password visibility" width={20} height={20} />
              </div>

            </div>

            <button
              type="submit"
              className="xxl:w-[418px] sm:w-[276px] h-[48px] mt-8 flex justify-center rounded-full bg-[rgb(97,57,255)] py-3 px-2 text-sm font-medium text-white shadow-sm hover:bg-customPurple"
            >
              Get Started
            </button>
          </form>

          <p className="text-left mt-4 custom-paragraph mr-[65px] sm:text-[10px] xxl:text-sm">
            By signing up, you agree to our{' '}
            <a href="/terms" className="font-semibold xxl:text-sm sm:text-[10px] text-black-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="font-semibold xxl:text-sm sm:text-[10px] text-black-500">
              Privacy Policy
            </a>. Need help?{' '}
            <a href="/help" className="font-semibold xxl:text-sm sm:text-[10px] text-[rgba(4,121,130,1)]">Get in touch</a>.
          </p>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.BACKGROUND_PATTERN})` }}>
        <div className="flex items-center justify-center w-full h-full ml-[22px]">
          <img src={IMAGES.RIGHT_IMAGE} alt="Right side design" width={400} height={400} className="object-contain" />
        </div>
      </div>
    </div>
  );
}
