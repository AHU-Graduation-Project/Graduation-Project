import React, { useState } from "react";
import { useAuthStore } from "../../../application/state/authStore";
import ProfilePicture from "./ProfilePicture";
import PersonalInfo from "./PersonalInfo";
import DropdownSection from "./DropDownSection";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import ChangePassword from "./ChangePassword";

const countries = [
  "Jordan",
  "Saudi Arabia",
  "UAE",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "India",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "Mexico",
];

const levels = ["Junior", "Middle", "Senior", "Team Leader", "Project Manager"];

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [first_name, setfirst_name] = useState(user?.first_name || "");
  const [last_name, setlast_name] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [aboutme, setAboutMe] = useState(user?.aboutme || "");
  const [isEmailConf, setIsEmailConf] = useState(
    user?.isEmailConformed || false
  );
  const [position, setPosition] = useState(user?.position || "");
  const [level, setLevel] = useState(user?.level || "");
  const [country, setCountry] = useState(user?.country || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || ""
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSaveChanges = () => {
    updateUser({
      first_name,
      last_name,
      email,
      country,
      position,
      level,
      aboutme,
      profilePicture,
    });
    setSuccessMessage("Changes have been successfully saved!");
    setTimeout(() => setSuccessMessage(null), 3000);
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
    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 sm:p-6 lg:p-8 w-full max-w-screen-xl shadow-md rounded-lg mx-auto space-y-6">
      <h2 className="text-center text-theme dark:text-white text-3xl font-bold">
        Profile
      </h2>

      {/* Profile Picture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfilePicture
          profilePicture={profilePicture}
          onChange={handleProfilePictureChange}
          onRemove={() => setProfilePicture("")}
        />

        {/* Personal Information */}
        <PersonalInfo
          first_name={first_name}
          last_name={last_name}
          email={email}
          isEmailConf={isEmailConf}
          position={position}
          onfirst_nameChange={setfirst_name}
          onlast_nameChange={setlast_name}
          onEmailChange={setEmail}
          onPositionChange={setPosition}
        />
      </div>

      {/* Dropdown Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DropdownSection
          label="Country"
          items={countries}
          selectedValue={country}
          onChange={setCountry}
        />
        <DropdownSection
          label="Level"
          items={levels}
          selectedValue={level}
          onChange={setLevel}
        />
      </div>

      {/* About Me Section */}
      <AboutMe aboutme={aboutme} onAboutMeChange={setAboutMe} />

      {/* Skills Section */}
      <div className="shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold text-theme dark:text-white mb-4">
          Skills
        </h3>
        <Skills />
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}

      {/* Action Buttons */}
      <div className="flex justify-start gap-4 items-center">
        <button
          onClick={() => setShowChangePassword(!showChangePassword)}
          className="py-2 px-4 bg-gray-400 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700"
        >
          Change Password
        </button>
        <button
          onClick={handleSaveChanges}
          className="py-2 px-4 bg-theme text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          Save Changes
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="text-green-600 text-center font-semibold pt-4">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default EditProfile;
