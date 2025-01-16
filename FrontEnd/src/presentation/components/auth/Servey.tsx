import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectDropDown from "../UI/SelectDropDown";
import { useAuthStore } from "../../../application/state/authStore";
import Skills from "../profile/Skills";

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

const Survey = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [position, setPosition] = useState(user?.position || "");
  const [level, setLevel] = useState(user?.level || "");
  const [country, setCountry] = useState(user?.country || "");

  const handleSurveySubmit = () => {
    handleSaveChanges();
    navigate("/");
  };

  const handleSkipSurvey = () => {
    navigate("/profile");
  };

  const handleSaveChanges = () => {
    updateUser({
      country,
      position,
      level,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 relative z-20">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg transition-colors duration-200">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-theme mb-2 transition-colors duration-200">
            Career Survey
          </h2>
          <p className="text-sm text-gray-500 mb-8 transition-colors duration-200">
            Help us personalize your experience by sharing your professional
            details.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-theme mb-2 transition-colors duration-200"
            >
              Position
            </label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 
                bg-gray-700 text-gray-900 dark:text-white
                focus:outline-none focus:ring-2 focus:border-blue-400
                sm:text-sm transition-colors duration-200"
              placeholder="Enter your current position"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-theme mb-2 transition-colors duration-200"
            >
              Country
            </label>
            <SelectDropDown
              items={countries}
              selectedValue={country}
              onChange={setCountry}
              className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm 
               bg-gray-700  text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                dark:focus:ring-blue-400 dark:focus:border-blue-400
                sm:text-sm transition-colors duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium text-theme mb-2 transition-colors duration-200"
            >
              Experience Level
            </label>
            <SelectDropDown
              items={levels}
              selectedValue={level}
              onChange={setLevel}
              className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm 
                bg-gray-700 text-white
                focus:outline-none focus:ring-2  focus:ring-blue-400  focus:border-blue-400
                sm:text-sm transition-colors duration-200"
            />
          </div>

          <div className="py-4">
            <Skills />
          </div>

          <div className="flex justify-between pt-6">
            <button
              onClick={handleSkipSurvey}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 
                rounded-md shadow-sm text-sm font-medium 
                text-gray-300 
                bg-gray-700 
                hover:bg-gray-600 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 
                dark:focus:ring-offset-gray-800 dark:focus:ring-gray-400
                transition-colors duration-200"
            >
              Skip for Now
            </button>
            <button
              onClick={handleSurveySubmit}
              className="inline-flex justify-center py-2 px-4 border border-transparent 
                rounded-md shadow-sm text-sm font-medium text-white 
                 bg-theme dark:hover:bg-blue-600 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                dark:focus:ring-offset-gray-800 dark:focus:ring-blue-400
                transition-colors duration-200"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
