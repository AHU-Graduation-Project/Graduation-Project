import { useState } from "react";
import { useAuthStore } from "../../../application/state/authStore";
import { InputField } from "../UI/TextInput";
import Servey from "./Servey";

export function SignupForm({ setShowServey }) {
  const { updateUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("password must be at least 8 characters long");
    } else if (!password || !fname || !lname || !email) {
      setError("Please check for all input feilds!");
    } else {
      updateUser({
        fname,
        lname,
        email,
        password,
      });
      setShowServey(true);
    }
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
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-theme text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupForm;
