import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { InputField } from "../UI/TextInput";
import useTokenStore from "../../../application/state/tokenStore";
import { ChangePassword } from "../../../infrastructure/api/changePassword"; // Adjust the path as needed

interface ChangePasswordProps {
  onClose: () => void;
}

const Change_Password = ({ onClose }: ChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { token } = useTokenStore();

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await ChangePassword({
        oldPassword: currentPassword,
        password: newPassword,
        accesToken: token,
      });
      setSuccessMessage("Password changed successfully!");
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to change the password.");
    } finally {
      setIsLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="w-full m-6 dark:bg-slate-800 bg-slate-100 text-slate-900 dark:text-white max-w-md rounded-lg shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-theme mb-2">
          Change Password
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <InputField
              id="current-password"
              type={showPassword1 ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              label="Current Password"
              placeholder="Password"
              showToggle
              inputClickHandler={() => setShowPassword1((current) => !current)}
            />
          </div>

          <div>
            <InputField
              id="new-password"
              type={showPassword2 ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="New Password"
              placeholder="New Password"
              showToggle
              inputClickHandler={() => setShowPassword2((current) => !current)}
            />
          </div>

          <div>
            <InputField
              id="conf-password"
              type={showPassword3 ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm New Password"
              placeholder="Confirm Password"
              showToggle
              inputClickHandler={() => setShowPassword3((current) => !current)}
            />
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm mb-2">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-600 text-sm mb-2">{successMessage}</div>
          )}

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={onClose}
              className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              type="button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-6 bg-theme text-white rounded-lg hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Password"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Change_Password;
