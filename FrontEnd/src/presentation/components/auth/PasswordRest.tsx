import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundRays from "../OverView/BackgroundRays";
import { InputField } from "../UI/TextInput";
import passwordRecovery from "../../../infrastructure/api/passwordRecovery";

const PasswordRest = () => {
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleSubmit = () => {
    setIsLoading(true);

    
  };

  return (
    <div className="relative w-full h-screen overflow-hidden z-10">
      <BackgroundRays option={2} fullPage={true} />
      <div className="min-h-screen flex items-center justify-center text-gray-300 font-sans ">
        <form onSubmit={handleSubmit} className="space-y-6 w-96">
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
          <InputField
            id="reset-confpassword"
            type={showPassword2 ? "text" : "password"}
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            label="Conform Password"
            placeholder="Password Conformation..."
            showToggle
            inputClickHandler={() => setShowPassword2(!showPassword2)}
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-theme text-white rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PasswordRest;
