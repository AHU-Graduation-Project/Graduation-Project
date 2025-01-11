import { useState } from "react";
import { InputField } from "./TextInput";
import { useAuthStore } from "../store/authStore";
import Servey from "./Servey";

export function SignupForm() {
  const { updateUser } = useAuthStore();

  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      fname,
      lname,
      email,
      password,
    });
    setShowSurvey(true);
  };

  return (
    <>
      {!showSurvey ? (
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
              placeholder="First Name"
            />
            <InputField
              id="signup-lastname"
              type="text"
              value={lname}
              onChange={(e) => setlName(e.target.value)}
              label="Last Name"
              placeholder="Last Name"
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
            <button
              type="submit"
              className="w-full py-3 bg-theme text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
        </>
      ) : (
        <Servey />
      )}
    </>
  );
}

export default SignupForm;
