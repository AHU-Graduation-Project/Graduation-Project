import React from "react";
import { Camera } from "lucide-react";

type ProfilePictureProps = {
  profilePicture: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
};

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  profilePicture,
  onChange,
  onRemove,
}) => (
  <div className="col-span-1 shadow-md rounded-lg p-6 flex flex-col items-center">
    <label htmlFor="profilePicture" className="cursor-pointer">
      <div className="w-32 h-32 border border-gray-300 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <Camera className="w-9 h-9 text-slate-500" />
        )}
      </div>
    </label>
    <input
      type="file"
      id="profilePicture"
      className="hidden"
      accept="image/*"
      onChange={onChange}
    />
    {profilePicture && (
      <button
        onClick={onRemove}
        className="mt-2 text-sm text-gray-400 hover:underline"
      >
        Remove
      </button>
    )}
  </div>
);

export default ProfilePicture;
