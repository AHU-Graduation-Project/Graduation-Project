import { useState } from "react";
import { InputField } from "../UI/TextInput";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignUpForm";
import Login from "../../../infrastructure/api/login";
import useTokenStore from "../../../application/state/tokenStore";
import PasswordReset from "./PasswordReset";

export default function LoginForm({ setShowServey }) {
  const { setToken } = useTokenStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSign, setIsSign] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const handleSignToggle = () => {
    setIsSign((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("password must be at least 8 characters long");
      return;
    }
    if (!password || !email) {
      setError("Please check for all input fields!");
      return;
    }

    try {
      const response = await Login({
        email,
        password,
      });

      if (response.success) {
        setToken(response.token);

        navigate("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <div className="form-container">
      {showPasswordReset ? (
        <PasswordReset onClose={() => setShowPasswordReset(false)} />
      ) : isSign ? (
        <SignupForm setShowServey={setShowServey} />
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
            <input className="" type="checkbox" />{" "}
            <span>Keep Me Signed in</span>
            <div className="flex  mt-2 mb-2">
              <button
                type="button"
                onClick={() => setShowPasswordReset(true)}
                className="text-sm text-theme hover:underline"
              >
                Forgot Password?
              </button>
            </div>
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
      <div className="sm:hidden mt-4">
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
