import { useState } from "react";
import { InputField } from "../UI/TextInput";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../application/state/authStore";
import SignupForm from "./SignUpForm";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSign, setIsSign] = useState(false);

  const userName = "ahmad@gmail.com";
  const userPassword = "1234";

  const { login, user } = useAuthStore();

  const handleSignToggle = () => {
    setIsSign((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === userName && password === userPassword) {
      login(email, password);
      navigate("/profile");
    } else {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      {isSign ? (
        <SignupForm />
      ) : (
        <>
          <h2 className="text-3xl sm:text-2xl font-bold mb-4 text-theme">
            Welcome Back
          </h2>
          <p className="text-sm mb-6 text-gray-400">
            Sign in to continue exploring our platform!
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="Email Address"
            />
            <InputField
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Password"
              showToggle
              inputClickHandler={() => setShowPassword((current) => !current)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-theme text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Login
            </button>
          </form>
        </>
      )}
      <div className="sm:hidden text-sm text-center text-gray-400 mt-4">
        <span>
          {isSign ? "Already have an account? " : "Don't have an account? "}
        </span>
        <button
          type="button"
          onClick={handleSignToggle}
          className="text-theme transition"
        >
          {isSign ? "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
