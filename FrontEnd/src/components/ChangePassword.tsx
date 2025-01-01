import { useState } from "react";
import { useAuthStore } from "../store/authStore";

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
    if (user?.password !== currentPassword) {
      setErrorMessage("The current password is incorrect.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    updateUser({ password: newPassword });
    setSuccessMessage("Password updated successfully!");
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 3000);
  };

  return (
    <div className="mt-1 border-t pt-4">
      <h3 className="text-lg font-semibold text-theme mb-2">Change Password</h3>

      {errorMessage && (
        <div className="text-red-600 text-sm mb-2">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-600 text-sm mb-2">{successMessage}</div>
      )}

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
  );
};
export default ChangePassword;
