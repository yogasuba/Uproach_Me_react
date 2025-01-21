import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getAuth, signInWithPopup, GoogleAuthProvider ,signInWithEmailAndPassword} from 'firebase/auth';
import firebaseApp from '../firebase/firebaseConfig'; // Adjust path as necessary
import { IMAGES, ICONS } from '../constants';


export default function SigninPage() {
  useEffect(() => {
    document.title = 'Signin'; // Set your desired page title here
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async () => { 
    setLoading(true); // Start loading
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Get Firebase ID Token
        const idToken = await user.getIdToken();

        // Send the token to your backend API
        const response = await axios.post(
            'https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/auth/signin',
            { idToken },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            const { token, uid, isOnboardingComplete } = response.data;

            // Store the token, uid, and profile URL in localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', uid);
            localStorage.setItem('profileUrl', user.photoURL); // Store profile URL

            toast.success('Successfully signed in with Google');

            // Redirect based on onboarding completion status
            if (isOnboardingComplete) {
                navigate('/dashboard');
            } else {
                navigate('/welcome');
            }
        } else {
            toast.error('Failed to sign in with Google');
        }
    } catch (error) {
        console.error('Google Sign-In error:', error);
        toast.error('Google sign-in failed. Please try again.');
    } finally {
        setLoading(false); // Stop loading
    }
};


  const handleEmailSignin = async (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user
      const idToken = await user.getIdToken();

      const response = await axios.post('https://k9ycr51xu4.execute-api.ap-south-1.amazonaws.com/auth/signin', 
        { idToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );


      if (response.status === 200) {
        const { token, uid } = response.data;

        // Store the token and uid in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', uid);

        toast.success('User login successfully');
        navigate('/dashboard');
      } 
    } catch (err) {
      // Handle Firebase Authentication errors
      if (err.code || (err.response && err.response.status === 400)) {
        toast.error('Invalid login credentials. Please check your email and password.');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Too many login attempts. Please try again later.');
      } 
    }
  };

  return (
    <div className="min-h-screen flex">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 z-50">
          <h2 className="text-lg font-semibold">Loading... Please wait</h2>
        </div>
      )}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center p-6 lg:p-12">
        <div className="max-w-md xxl:ml-[3.5rem] sm:ml-[12px]">
          <img src={ICONS.LOGO} alt="Uproach Me Logo" width={130} height={50} className="mb-4" />
          <h1 className="custom-heading mb-3 tracking-tight sm:text-xl xxl:text-3xl">Login to Uproach Me</h1>
          <p className="mb-6 sm:text-xs xxl:text-sm">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-[rgb(97,57,255)] font-medium">Sign up</a>
          </p>

          {/* Google and Apple Buttons */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleGoogleSignIn}
              className="xxl:w-[202px] xxl:h-[40px] sm:w-[135px] sm:w-1/1 inline-flex items-center justify-center rounded-[10px] border border-gray-300 bg-white px-4 py-2 xxl:text-sm sm:text-[9px] font-regular text-gray-700 shadow-sm hover:bg-gray-50 whitespace-nowrap"
            >
              <img src={ICONS.GOOGLE_ICON} alt="Google" width={20} height={20} className="mr-2" />
              Continue with <span className="font-bold ml-1">Google</span>
            </button>

            <button className="xxl:w-[202px] xxl:h-[40px] sm:w-[128px] sm:w-1/1 inline-flex items-center justify-center rounded-[10px] border border-gray-300 bg-white px-4 py-2 xxl:text-sm sm:text-[9px] font-regular text-gray-700 shadow-sm hover:bg-gray-50 whitespace-nowrap">
              <img src={ICONS.APPLE_ICON} alt="Apple" width={20} height={20} className="mr-2" />
              Continue with <span className="font-bold ml-1">Apple</span>
            </button>
          </div>

          {/* OR Divider */}
          <div className="or-divider">
            <div className="line"></div>
            <span className="text">or</span>
            <div className="line"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleEmailSignin}>
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
                className={`absolute left-3 top-3 custom-input-color transition-all transform ${
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
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer mr-10 mb-[33px]"
                onClick={togglePasswordVisibility}
              >
                <img src={showPassword ? IMAGES.EYE : IMAGES.EYE_OFF} alt="Toggle password visibility" width={20} height={20} />
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="checkbox-custom h-4 w-4 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block custom-remember-label">Remember me</label>
                </div>
                <a href="/forgotpassword" className="text-sm mr-[32px] block custom-password-label">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="xxl:w-[418px] sm:w-[276px] h-[48px] mt-8 flex justify-center rounded-full bg-[rgb(97,57,255)] py-3 px-2 text-sm font-medium text-white shadow-sm hover:bg-customPurple"
            >
              Sign In
            </button>
          </form>

          <p className="text-left mt-4 custom-paragraph mr-[65px] sm:text-[10px] xxl:text-sm">
            By signing up, you agree to our{' '}
            <a href="/terms" className="font-semibold">Terms of Service</a> and{' '}
            <a href="/privacy" className="font-semibold">Privacy Policy</a>. Need help?{' '}
            <a href="/help" className="font-semibold">Get in touch</a>.
          </p>
        </div>
      </div>

      {/* Right Side - Background with Image */}
      <div className="hidden xxl:flex xl:flex xxl:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.BACKGROUND_PATTERN})` }}>
        <div className="flex items-center justify-center w-full h-full ml-[22px]">
          <img src={IMAGES.RIGHT_IMAGE} alt="Right side design" width={400} height={400} className="object-contain" />
        </div>
      </div>
    </div>
  );
}
