import { useState } from "react";
import axios from "axios";
import { InputField } from "../UI/TextInput";

const PasswordReset = ({ setChangePassword, onClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PATH_API}/auth/request-password-recovery`,
        {
          email,
        }
      );
      if (response.status === 200) {
        console.log(response.data)
        setSuccess(true);
        setChangePassword(true);
        setTimeout(() => {
          onClose?.();
        }, 15000);
      } else if (response.status / 100 === 5) {
        setError("try again later");
      } else if (Math.floor(response.status / 100) === 4) {
        setError("wrong email");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "email not found. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-3xl sm:text-2xl font-bold mb-4 text-theme">
        Reset Password
      </h2>
      <p className="text-sm mb-6 text-gray-400">
        Enter your email address and we'll send you instructions to reset your
        password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="reset-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="Email Address"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && (
          <p className="text-sm text-green-500">
            Password reset instructions have been sent to your email.
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-theme text-white rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
