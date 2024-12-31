import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Camera } from "lucide-react";

const EditProfile = () => {
  const { user, updateUser } = useAuthStore();
  const [fname, setFirstName] = useState(user?.fname || "");
  const [lname, setLastName] = useState(user?.lname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || ""
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSaveChanges = () => {
    updateUser({
      fname,
      lname,
      email,
      profilePicture,
    });

    // Set success message after saving
    setSuccessMessage("Changes have been successfully saved!");

    // Optionally, hide the success message after a few seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000); // Message disappears after 3 seconds
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePicture(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="p-2 mb-2">
      <h2 className="flex justify-center text-theme text-2xl font-bold mb-4">
        Edit Profile
      </h2>

      <div className="flex flex-col gap-4">
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-4">
          <label htmlFor="profilePicture" className="cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Camera className="w-6 h-6 text-slate-500" />
              )}
            </div>
          </label>
          <input
            type="file"
            id="profilePicture"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>

        {/* Name and Email Inputs */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="flex justify-center text-sm font-medium mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={fname}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border bg-transparent border-gray-500 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme mb-2"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="flex justify-center text-theme text-sm font-medium mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lname}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border bg-transparent border-gray-500 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme mb-2"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="email"
              className="flex justify-center text-theme text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border bg-transparent border-gray-500 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme mb-2"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-theme text-white rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 text-green-600 text-center font-semibold">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
