import React, { useState } from "react";
import { InputField } from "../UI/TextInput";
import signUp from "../../../infrastructure/api/signUp";
import useTokenStore from "../../../application/state/tokenStore";
import PasswordValidation from "./PasswordValidation";

export default function MobileSignUpForm({
  setShowServey,
}: {
  setShowServey: (value: boolean) => void;
}) {
  const { setToken } = useTokenStore();
  const [error, setError] = useState<string | null>(null);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements");
      return;
    }

    if (!password || !first_name || !last_name || !email) {
      setError("Please check for all input fields!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await signUp({
        first_name,
        last_name,
        email,
        password,
      });

      if (response.success) {
        setToken(response.token);
        setShowServey(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mobile-signup-container">
      <h2 className="text-2xl font-bold mb-4 text-theme">Join the Community</h2>
      <p className="text-sm mb-6 text-gray-400">
        Create an account and start your journey!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <InputField
              id="mobile-signup-name"
              type="text"
              value={first_name}
              onChange={(e) => setfirst_name(e.target.value)}
              label="First Name"
              placeholder="First Name"
            />
          </div>
          <div className="flex-1">
            <InputField
              id="mobile-signup-last_name"
              type="text"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
              label="Last Name"
              placeholder="Last Name"
            />
          </div>
        </div>
        <InputField
          id="mobile-signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="Email Address"
        />
        <InputField
          id="mobile-signup-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Password"
          showToggle
          inputClickHandler={() => setShowPassword(!showPassword)}
        />
        {password.length > 0 && (
          <PasswordValidation
            password={password}
            onValidationChange={setIsPasswordValid}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-theme text-white rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:opacity-50"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
