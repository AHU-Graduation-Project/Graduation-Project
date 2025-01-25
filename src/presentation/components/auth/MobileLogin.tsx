import React, { useState } from "react";
import { InputField } from "../UI/TextInput";
import Login from "../../../infrastructure/api/login";
import useTokenStore from "../../../application/state/tokenStore";
import { useNavigate } from "react-router-dom";
import PasswordReset from "./PasswordReset";

const MobileLoginForm = ({ setChangePassword }) => {
  const { setToken } = useTokenStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await Login({ email, password });

      if (response.success) {
        setToken(response.token);
        navigate("/");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" mobile-login-container    ">
      {showPasswordReset ? (
        <PasswordReset
          setChangePassword={setChangePassword}
          onClose={() => setShowPasswordReset(false)}
        />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-theme">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              id="mobile-login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="Enter your email"
            />
            <InputField
              id="mobile-login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              showToggle
              inputClickHandler={() => setShowPassword((current) => !current)}
              classname="dark:bg-transparent"
            />

            <div className="flex justify-between items-center">
              <div>
                <input type="checkbox" className="mr-2  bg-transparent" />
                <span>Remember me</span>
              </div>
              <div className="mt-2 mb-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordReset(true)}
                  className="text-sm text-theme hover:underlin"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-theme text-white py-2 rounded-lg hover:opacity-90 transition-all"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default MobileLoginForm;
