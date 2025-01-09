import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import ReactDOM from "react-dom";

interface ChangePasswordProps {
  onClose: () => void;
}

const ChangePassword = ({ onClose }: ChangePasswordProps) => {
  const { user, updateUser } = useAuthStore();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!user || user.password !== currentPassword) {
      setErrorMessage("The current password is incorrect.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    updateUser({ password: newPassword });
    setSuccessMessage("Password updated successfully!");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return ReactDOM.createPortal(
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full m-6 dark:bg-slate-800 bg-slate-100 text-slate-900 dark:text-white max-w-md rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-theme mb-2">
          Change Password
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border bg-transparent border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-theme mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border bg-transparent border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-theme mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border bg-transparent border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme"
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
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="py-2 px-6 bg-theme text-white rounded-lg hover:bg-blue-600"
            >
              Save Password
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ChangePassword;
