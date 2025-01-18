import { useState, useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignUpForm";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BackgroundRays from "../components/OverView/BackgroundRays";
import Servey from "../components/auth/Servey";
import useTokenStore from "../../application/state/tokenStore";

export default function Auth() {
  const { userRole } = useTokenStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showServey, setShowServey] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole()) {
      navigate("/");
    }
  }, []);

  //bg-[#111827]
  return (
    <div className="relative w-full h-screen overflow-hidden ">
      <BackgroundRays option={2} fullPage={true} />
      {/* Back to Home Button */}
      <div
        className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-800 text-white rounded-full shadow-lg cursor-pointer hover:bg-gray-700 transition-colors"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-6 h-6" />
      </div>

      <div className="min-h-screen flex items-center justify-center text-gray-300 font-sans ">
        {showServey ? (
          <div>
            <Servey />
          </div>
        ) : (
          <div className="relative w-full max-w-5xl overflow-hidden flex flex-col md:flex-row sm:px-6 md:px-0 md:bg-gray-800 md:bg-opacity-75 md:rounded-xl">
            {/* Side Button */}
            <div
              className={`absolute inset-0 hidden md:flex justify-center items-center w-full md:w-1/2 transition-transform duration-700 ease-in-out ${
                isSignUp ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {!isSignUp ? (
                <div className="flex justify-center flex-col p-24 ">
                  <h1 className="text-3xl py-5">Don't have an account?</h1>
                  <p className="pb-6">
                    Personalize Switter based on where you've seen switter
                    content on the web. Learn more.
                  </p>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="bg-theme text-slate-200 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105 shadow-md"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="flex justify-center flex-col p-24 ">
                  <h1 className="text-3xl py-5">Already have an account?</h1>
                  <p className="pb-6">
                    Personalize Switter based on where you've seen switter
                    content on the web. Learn more.
                  </p>
                  <button
                    onClick={() => setIsSignUp(false)}
                    className="bg-theme text-slate-200 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105 shadow-md"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>

            {/* Login Form */}
            <div
              className={`w-full md:w-1/2 p-12 mt-20 sm:mt-0 md:py-28 transition-transform duration-700 ease-in-out bg-gray-800 bg-opacity-90 rounded-xl md:bg-gray-800 ${
                isSignUp ? "-translate-x-full" : "translate-x-0"
              }`}
            >
              <LoginForm setShowServey={setShowServey} />
            </div>

            {/* Sign-Up Form */}
            <div
              className={`hidden sm:block w-full md:w-1/2 p-12 md:p-8 transition-transform duration-700 ease-in-out bg-gray-800 bg-opacity-90 rounded-xl md:bg-gray-800 ${
                isSignUp ? "translate-x-0" : "translate-x-full"
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
