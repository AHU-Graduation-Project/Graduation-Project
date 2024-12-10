import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate("/profile");
  };

  const handleSubmitSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    signup(email, password, name);
    navigate("/profile");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-transparent">
      <div className="min-h-screen flex items-center justify-center  text-gray-300 font-sans px-4 sm:px-6 md:px-8">
        <div className="relative w-full max-w-5xl   overflow-hidden flex flex-col md:flex-row">
          {/* Side Button */}
          <div
            className={`absolute inset-0 hidden md:flex justify-center items-center w-full md:w-1/2 transition-transform duration-700 ease-in-out ${
              isSignUp ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {!isSignUp ? (
              <button
                onClick={() => setIsSignUp(true)}
                className="text-cyan-400 bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105 shadow-md"
              >
                Don't have an account? Sign Up
              </button>
            ) : (
              <button
                onClick={() => setIsSignUp(false)}
                className="text-pink-300 bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105 shadow-md"
              >
                Already have an account? Login
              </button>
            )}
          </div>

          {/* Login Form */}
          <div
            className={`w-full md:w-1/2 p-6 md:p-8 transition-transform duration-700 ease-in-out bg-gray-800 bg-opacity-75 rounded-xl ${
              isSignUp ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <h2 className="text-3xl sm:text-2xl font-bold mb-4 text-cyan-400">
              Welcome Back
            </h2>
            <p className="text-sm mb-6">
              Sign in to continue exploring our platform!
            </p>
            <form onSubmit={handleSubmitLogin} className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="login-email"
                  className="block text-sm text-gray-400 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 text-gray-300 rounded-lg border border-gray-600 focus:ring-2 focus:ring-cyan-400 focus:outline-none placeholder-transparent transition-all duration-200 ease-in-out shadow-md"
                  placeholder="Email Address"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="login-password"
                  className="block text-sm text-gray-400 mb-1"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 text-gray-300 rounded-lg border border-gray-600 focus:ring-2 focus:ring-teal-400 focus:outline-none placeholder-transparent transition-all duration-200 ease-in-out shadow-md"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              <div className="text-sm text-center text-gray-400 mt-4">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-cyan-400 hover:text-cyan-500 transition"
                >
                  Sign Up
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-cyan-400 hover:bg-teal-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Login
              </button>
            </form>
          </div>

          {/* Sign-Up Form */}
          <div
            className={`w-full md:w-1/2 p-6 md:p-8 transition-transform duration-700 ease-in-out bg-gray-800 bg-opacity-75 rounded-xl ${
              isSignUp ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <h2 className="text-3xl sm:text-2xl font-bold mb-4 text-pink-300">
              Join the Community
            </h2>
            <p className="text-sm mb-6">
              Create an account and start your journey with us!
            </p>
            <form onSubmit={handleSubmitSignUp} className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="signup-name"
                  className="block text-sm text-gray-400 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 text-gray-300 rounded-lg border border-gray-600 focus:ring-2 focus:ring-pink-400 focus:outline-none placeholder-transparent transition-all duration-200 ease-in-out shadow-md"
                  placeholder="Full Name"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="signup-email"
                  className="block text-sm text-gray-400 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 text-gray-300 rounded-lg border border-gray-600 focus:ring-2 focus:ring-pink-400 focus:outline-none placeholder-transparent transition-all duration-200 ease-in-out shadow-md"
                  placeholder="Email Address"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="signup-password"
                  className="block text-sm text-gray-400 mb-1"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 text-gray-300 rounded-lg border border-gray-600 focus:ring-2 focus:ring-pink-400 focus:outline-none placeholder-transparent transition-all duration-200 ease-in-out shadow-md"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-400 hover:text-pink-400 transition focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              <div className="text-sm text-center text-gray-400 mt-4">
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-pink-300 hover:text-pink-400 transition"
                >
                  Login
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
