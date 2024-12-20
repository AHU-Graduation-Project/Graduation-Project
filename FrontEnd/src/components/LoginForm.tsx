import { useState } from "react";
import { InputField } from "./TextInput";
interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onSignUpClick: () => void;
}

export default function LoginForm({ onSubmit, onSignUpClick }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
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
          toggleHandler={() => setShowPassword(!showPassword)}
        />
        <div className="text-sm text-center text-gray-400 mt-4">
          <span>Don't have an account? </span>
          <button
            type="button"
            onClick={onSignUpClick}
            className="text-theme  transition"
          >
            Sign Up
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-theme  text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </>
  );
}
