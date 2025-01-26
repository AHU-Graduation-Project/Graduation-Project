import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AchiveSkills } from "../../../infrastructure/api/getAchivedSkill";
import { UserData } from "../../../infrastructure/api/getUserData";
import { UpdateUserData } from "../../../infrastructure/api/updateUserData";
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
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [skillsList, setSkillsList] = useState([]);
  const [email, setEmail] = useState("");
  const [aboutme, setAboutMe] = useState("");
  const [isEmailConf, setIsEmailConf] = useState(false);
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const [country, setCountry] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const getAchivedSkill = AchiveSkills();
  const getUserData = UserData();
  // const updateData = UpdateUserData();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await getUserData;

        if (response.success) {
          setfirst_name(response.profile.first_name);
          setlast_name(response.profile.last_name);
          setEmail(response.profile.email);
          setAboutMe(response.profile.about_me);
          setPosition(response.profile.position);
          setLevel(response.profile.level);
          setIsEmailConf(response.profile.is_email_confirmed);
          setCountry(response.profile.country);
          setProfilePicture(response.profile.profile_image);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    const loadUserskills = async () => {
      try {
        const response = await getAchivedSkill;
        if (response.success) {
          setSkillsList(response.topic);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };
    loadUserskills();
  }, []);

  const handleSaveChanges = async () => {
    try {
      setError("");
      setSuccessMessage(null);

      if (!first_name || !last_name) {
        setError("First name and last name are required");
        return;
      }

      const profileData = {
        first_name,
        last_name,
        position,
        country,
        level,
      };

      const response = await UpdateUserData(profileData);

      if (response.success) {
        setSuccessMessage("Changes have been successfully saved!");

        const timer = setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
      } else {
        setError(response.message || "Update failed");
      }
    } catch (error) {
      // Comprehensive error handling
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      setError(errorMessage);
      console.error("Save changes error:", error);
    }
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
        <Skills skillList={skillsList} setSkillList={setSkillsList} />
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
