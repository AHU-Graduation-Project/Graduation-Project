import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Camera } from "lucide-react";

const EditProfile = () => {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || ""
  );

  const handleSaveChanges = () => {
    updateUser({ name, email, profilePicture });
  };

  if (!user) return null;

  return (
    <div className="dark:bg-slate-800 rounded-2xl p-8 mb-12">
      <h2 className="text-theme text-2xl font-bold mb-4">Edit Profile</h2>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => setProfilePicture(reader.result);
                reader.readAsDataURL(file);
              }
            }}
          />

          <div className="flex-1">
            <label htmlFor="name" className="text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:text-white"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:text-white"
            />
          </div>
        </div>

        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-theme text-white rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
