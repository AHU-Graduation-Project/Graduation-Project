import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignUpForm";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-transparent">
      <div className="min-h-screen flex items-center justify-center text-gray-300 font-sans ">
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
                  Personalze Switter based on where you've seen switter content
                  on the web. Learn more.
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
                <h1 className="text-3xl py-5 ">Already have an account?</h1>
                <p className="pb-6">
                  Personalze Switter based on where you've seen switter content
                  on the web. Learn more.
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
            <LoginForm />
          </div>

          {/* Sign-Up Form */}
          <div
            className={`hidden sm:block w-full md:w-1/2 p-12  md:p-8 transition-transform duration-700 ease-in-out bg-gray-800 bg-opacity-90 rounded-xl md:bg-gray-800  ${
              isSignUp ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
