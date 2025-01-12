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

const Servey = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [position, setPosition] = useState(user?.position || "");
  const [level, setLevel] = useState(user?.level || "");
  const [country, setCountry] = useState(user?.country || "");

  const handleSurveySubmit = () => {
    navigate("/");
    handleSaveChanges();
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
    <div className="survey-modal">
      <h2 className="text-2xl font-bold mb-2 text-theme">Survey</h2>
      <p className="text-sm mb-2 text-gray-400">
        Please fill in your Information.
      </p>

      <div className="flex-1">
        <label
          htmlFor="position"
          className="block text-sm font-medium text-theme mb-1"
        >
          Position
        </label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full border bg-transparent border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme"
        />
      </div>

      <div className="my-3 min-w-48">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-theme mb-1"
        >
          Country
        </label>

        <SelectDropDown
          items={countries}
          selectedValue={country}
          onChange={setCountry}
          className="border border-gray-300 rounded-md text-sm"
        />
      </div>

      <div className="my-3 min-w-48">
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
          className=" w-60 p-2 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <Skills />

      <div className="flex justify-between mt-3">
        <button
          onClick={handleSkipSurvey}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded text-end"
        >
          Skip
        </button>

        <button
          onClick={handleSurveySubmit}
          className="bg-theme text-white py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Servey;
