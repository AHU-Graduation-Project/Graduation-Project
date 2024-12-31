import { useState } from "react";
import { InputField } from "./TextInput";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface LoginFormProps {
  onSignUpClick: () => void;
}

export default function LoginForm({ onSignUpClick }: LoginFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the login function from authStore
      await login(email, password);
      setError(null); // Clear errors on successful login
      // alert(`Welcome, ${user?.fname || "User"}!`);
      navigate("/BrowseRoadmaps");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <h2 className="text-3xl sm:text-2xl font-bold mb-4 text-theme">
        Welcome Back
      </h2>
      <p className="text-sm mb-6 text-gray-400">
        Sign in to continue exploring our platform!
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-sm text-red-500">{error}</p>}
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
        <div className="text-sm text-center text-gray-400 mt-4">
          <span>Don't have an account? </span>
          <button
            type="button"
            onClick={onSignUpClick}
            className="text-theme transition"
          >
            Sign Up
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-theme text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </>
  );
}
