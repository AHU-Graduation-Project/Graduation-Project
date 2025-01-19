import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import BackgroundRays from "../OverView/BackgroundRays";
import { InputField } from "../UI/TextInput";
import passwordRecovery from "../../../infrastructure/api/passwordRecovery";
import PasswordValidation from "./PasswordValidation";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (password === confPassword && isPasswordValid) {
      setIsLoading(true);
    }

    return;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden z-10">
      <BackgroundRays option={2} fullPage={true} />
      <div className="min-h-screen flex items-center justify-center text-gray-300 font-sans">
        <form onSubmit={handleSubmit} className="space-y-6 w-96">
          <div className="space-y-2">
            <InputField
              id="reset-password"
              type={showPassword1 ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Password"
              showToggle
              inputClickHandler={() => setShowPassword1(!showPassword1)}
            />
          </div>
          <div className="space-y-2">
            <InputField
              id="reset-confpassword"
              type={showPassword2 ? "text" : "password"}
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              label="Confirm Password"
              placeholder="Password Confirmation..."
              showToggle
              inputClickHandler={() => setShowPassword2(!showPassword2)}
            />
          </div>

          {(password.length > 0 || confPassword.length > 0) && (
            <PasswordValidation
              password={password}
              onValidationChange={setIsPasswordValid}
            />
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-theme text-white rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
