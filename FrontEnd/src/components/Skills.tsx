import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";

type Skill = {
  title: string;
};

const skills: Skill[] = [
  { title: "HTML" },
  { title: "CSS" },
  { title: "JavaScript" },
  { title: "TypeScript" },
  { title: "React" },
  { title: "Angular" },
  { title: "Vue" },
  { title: "Git/GitHub" },
];

const SkillSelector: React.FC = () => {
  const { user, addSkill, removeSkill } = useAuthStore();
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Populate selectedSkills with user's saved skills on component mount
  useEffect(() => {
    if (user?.selectedSkills) {
      const userSkills = user.selectedSkills.map((skillTitle: string) =>
        skills.find((skill) => skill.title === skillTitle)
      );
      setSelectedSkills(userSkills.filter((skill): skill is Skill => !!skill));
    }
  }, [user?.selectedSkills]);

  // Filter skills based on search term
  useEffect(() => {
    const filtered = skills.filter(
      (skill) =>
        skill.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedSkills.some((s) => s.title === skill.title)
    );
    setFilteredSkills(filtered);
  }, [searchTerm, selectedSkills]);

  const handleAddSkill = (skill: Skill) => {
    setSelectedSkills((prev) => [...prev, skill]);
    addSkill(skill.title);
    setSearchTerm(""); // Clear search input after adding
    setDropdownOpen(false); // Close dropdown after selection
  };

  const handleRemoveSkill = (skill: Skill) => {
    setSelectedSkills((prev) => prev.filter((s) => s.title !== skill.title));
    removeSkill(skill.title);
  };

  const handleInputFocus = () => {
    setDropdownOpen(true);
  };

  const handleInputBlur = () => {
    // Use a timeout to allow click events on dropdown items to register
    setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-theme pb-1">
        Add Your Skills
      </label>

      <div className="relative">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Search skills..."
          className="w-full border bg-transparent dark:bg-slate-800 text-black dark:text-white border-gray-300 dark:border-gray-500 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme"
        />

        {/* Autocomplete Dropdown */}
        {dropdownOpen && filteredSkills.length > 0 && (
          <ul className="absolute z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
            {filteredSkills.map((skill) => (
              <li
                key={skill.title}
                onClick={() => handleAddSkill(skill)}
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              >
                {skill.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Skills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {selectedSkills.map((skill) => (
          <div
            key={skill.title}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-theme text-white text-sm font-medium shadow-sm"
          >
            <span>{skill.title}</span>
            <button
              onClick={() => handleRemoveSkill(skill)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSelector;
