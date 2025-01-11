import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Camera } from "lucide-react";
import Skills from "./Skills";
import ChangePassword from "./ChangePassword";
import SelectDropDown from "./SelectDropDown";

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

const EditProfile = () => {
  const { user, updateUser } = useAuthStore();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [fname, setFirstName] = useState(user?.fname || "");
  const [lname, setLastName] = useState(user?.lname || "");
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
      fname,
      lname,
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
    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 sm:p-6 lg:p-8 w-full max-w-screen-xl  shadow-md rounded-lg mx-auto space-y-6">
      <h2 className="text-center text-theme dark:text-white text-3xl font-bold">
        Profile
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <div className="col-span-1  shadow-md rounded-lg p-6 flex flex-col items-center">
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
            onChange={handleProfilePictureChange}
          />
          {profilePicture && (
            <button
              onClick={() => setProfilePicture("")}
              className="mt-2 sm:ml-5 text-sm text-gray-400 hover:underline"
            >
              Remove
            </button>
          )}
        </div>

        {/* Personal Information Section */}
        <div className="col-span-2  shadow-md rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-theme dark:text-white mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={fname}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border bg-transparent dark:bg-slate-800 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme dark:focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-theme dark:text-white mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border bg-transparent  dark:bg-slate-800 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme dark:focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-theme dark:text-white mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border bg-transparent dark:bg-slate-800 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm focus:outline-none ${
                  isEmailConf
                    ? "focus:ring-2 focus:ring-theme dark:focus:ring-indigo-500"
                    : "cursor-not-allowed"
                }`}
                disabled={!isEmailConf}
              />
              {!isEmailConf && (
                <p className="text-red-500 dark:text-red-400 text-base mt-1">
                  Please confirm your email!
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-theme dark:text-white mb-1"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full border bg-transparent dark:bg-slate-800 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme dark:focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* {level and contry component} */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="col-span-1 shadow-md rounded-lg p-6">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-theme dark:text-white mb-1"
          >
            Country
          </label>
          <SelectDropDown
            items={countries}
            selectedValue={country}
            onChange={setCountry}
            className="border  border-gray-300 dark:border-gray-600 rounded-md text-sm"
          />
        </div>

        <div className="col-span-1  shadow-md rounded-lg p-6">
          <label
            htmlFor="level"
            className="block text-sm font-medium text-theme dark:text-white mb-1"
          >
            Level
          </label>
          <SelectDropDown
            items={levels}
            selectedValue={level}
            onChange={setLevel}
            className="w-60 p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Skills component */}
      <div className="shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold text-theme dark:text-white mb-4">
          Skills
        </h3>
        <Skills />
      </div>

      {/* About Me Section */}
      <div className="  shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold text-theme dark:text-white mb-4">
          About Me
        </h3>
        <textarea
          className="w-full border bg-transparent dark:bg-slate-800  border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          rows={5}
          value={aboutme}
          id="aboutme"
          onChange={(e) => setAboutMe(e.target.value)}
          placeholder="Write something about yourself..."
        ></textarea>
      </div>

      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}

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
