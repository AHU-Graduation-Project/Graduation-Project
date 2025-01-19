import { useState, useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignUpForm';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BackgroundRays from '../components/OverView/BackgroundRays';
import Servey from '../components/auth/Servey';
import useTokenStore from '../../application/state/tokenStore';

export default function Auth() {
  const { userRole } = useTokenStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showServey, setShowServey] = useState(false);
  const [showChangePassowrd, setChangePassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole()) {
      navigate('/');
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <BackgroundRays option={2} fullPage={true} />

      <div
        className="absolute top-3 left-3 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gray-800 text-white rounded-full shadow-lg cursor-pointer hover:bg-gray-700 transition-colors"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="w-5 h-5" />
      </div>

      <div className="min-h-screen flex items-center justify-center text-gray-300 font-sans">
        {showServey ? (
          <div>
            <Servey />
          </div>
        ) : (
          <div className="relative w-full max-w-4xl overflow-hidden flex flex-col md:flex-row sm:px-4 md:px-0 md:bg-gray-800 md:bg-opacity-75 md:rounded-lg">
            {/* Side Button */}
            <div
              className={`absolute inset-0 hidden md:flex justify-center items-center w-full md:w-1/2 transition-transform duration-700 ease-in-out ${
                isSignUp ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {!isSignUp ? (
                <div className="flex justify-center flex-col p-16">
                  <h1 className="text-2xl py-3">Don't have an account?</h1>
                  <p className="pb-4 text-sm">
                    Personalize Switter based on where you've seen switter
                    content on the web. Learn more.
                  </p>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="bg-theme text-slate-200 py-2 rounded-lg text-base font-semibold transition-transform transform hover:scale-105 shadow-md"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="flex justify-center flex-col p-16">
                  <h1 className="text-2xl py-3">Already have an account?</h1>
                  <p className="pb-4 text-sm">
                    Personalize Switter based on where you've seen switter
                    content on the web. Learn more.
                  </p>
                  <button
                    onClick={() => setIsSignUp(false)}
                    className="bg-theme text-slate-200 py-2 rounded-lg text-base font-semibold transition-transform transform hover:scale-105 shadow-md"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>

            {/* Login Form */}
            <div
              className={`w-full md:w-1/2 p-8 mt-16 sm:mt-0 md:py-20 transition-transform duration-700 ease-in-out bg-gray-800 bg-opacity-90 rounded-lg md:bg-gray-800 ${
                isSignUp ? '-translate-x-full' : 'translate-x-0'
              }`}
            >
              <LoginForm
                setChangePassword={setChangePassword}
                setShowServey={setShowServey}
              />
            </div>

            {/* Sign-Up Form */}
            <div
              className={`hidden sm:block w-full md:w-1/2 p-8 md:p-6 transition-transform duration-700 ease-in-out bg-gray-800 bg-opacity-90 rounded-lg md:bg-gray-800 ${
                isSignUp ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <SignupForm setShowServey={setShowServey} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
