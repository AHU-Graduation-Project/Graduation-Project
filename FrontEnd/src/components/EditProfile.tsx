import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Camera } from "lucide-react";
import SelectDropDown from "./SelectDropDown";
import Skills from "./Skills";

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

const positions = ["Front end", "Backend", "DevOps", "Software Enginner"];
const levels = ["Junior", "Middle", "Senior"];

const EditProfile = () => {
  const { user, updateUser } = useAuthStore();
  const [fname, setFirstName] = useState(user?.fname || "");
  const [lname, setLastName] = useState(user?.lname || "");
  const [email, setEmail] = useState(user?.email || "");
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
    <div className="p-4 sm:p-6 lg:p-8 w-full mx-auto">
      <h2 className="text-center text-theme text-2xl font-bold mb-2">
        Edit Profile
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
        {/* Profile Picture Section */}
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          <label htmlFor="profilePicture" className="cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Camera className="w-10 h-10 text-slate-500" />
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

        {/* Input Fields Section */}
        <div className="flex-1 space-y-4 mt-6 sm:mt-0">
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-theme mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={fname}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border bg-transparent border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-theme mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border bg-transparent border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-theme mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border bg-transparent border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-theme mb-1"
              >
                Country
              </label>
              {/* <Country /> */}
              <SelectDropDown
                items={countries}
                selectedValue={country}
                onChange={setCountry}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-theme mb-1"
        >
          Position
        </label>
        <SelectDropDown
          items={positions}
          selectedValue={position}
          onChange={setPosition}
        />
      </div>

      <div className="my-3">
        <label
          htmlFor="level"
          className="block text-sm font-medium text-theme mb-1"
        >
          Level
        </label>
        <SelectDropDown
          items={levels}
          selectedValue={level}
          onChange={setLevel}
        />
      </div>
      <div className="my-3">
        <Skills />
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSaveChanges}
          className="py-2 px-10 bg-theme text-white rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="text-green-600 text-center font-semibold">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default EditProfile;
