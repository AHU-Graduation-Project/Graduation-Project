import { useState } from "react";
import { InputField } from "./TextInput";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export function SignupForm() {
  const { updateUser } = useAuthStore();
  const navigate = useNavigate();
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      fname,
      lname,
      email,
      password,
    });
    navigate("/Profile");
  };

  return (
    <>
      <h2 className="text-3xl sm:text-2xl font-bold mb-4 text-theme">
        Join the Community
      </h2>
      <p className="text-sm mb-6 text-gray-400">
        Create an account and start your journey with us!
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="signup-name"
          type="text"
          value={fname}
          onChange={(e) => setfName(e.target.value)}
          label="First Name"
          placeholder="Full Name"
        />
        <InputField
          id="signup-name"
          type="text"
          value={lname}
          onChange={(e) => setlName(e.target.value)}
          label="Last Name"
          placeholder="Full Name"
        />
        <InputField
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="Email Address"
        />
        <InputField
          id="signup-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Password"
          showToggle
          inputClickHandler={() => setShowPassword(!showPassword)}
        />
        <div className=" hidden text-sm text-center text-gray-400 mt-4">
          <span>Already have an account? </span>
          <button type="button" className="text-theme  transition">
            Login
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-theme  text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
export default SignupForm;
