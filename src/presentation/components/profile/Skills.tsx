import React, { useState, useEffect } from "react";
import axios from "axios";

interface Skill {
  id: number;
  skill_name: string;
}

interface SkillsProps {
  skillList: Skill[];
  setSkillList: React.Dispatch<React.SetStateAction<Skill[]>>;
  isProfile?: boolean;
}

const SkillSelector: React.FC<SkillsProps> = ({ skillList = [], setSkillList }) => {
  const [predefinedSkills, setPredefinedSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PATH_API}/topics/`
        );
        if (response.data.success && response.data.topics) {
          setPredefinedSkills(response.data.topics);
          setLoading(false);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError("Failed to load skills");
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredSkills([]);
      return;
    }

    const filtered = predefinedSkills.filter(
      (skill) =>
        skill.skill_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !skillList.some((s) => s.id === skill.id)
    );
    setFilteredSkills(filtered);
  }, [searchTerm, skillList, predefinedSkills]);

  const handleAddSkill = (skill: Skill) => {
    setSkillList((prev) => [...prev, skill]);
    setSearchTerm("");
    setDropdownOpen(false);
  };

  const handleRemoveSkill = (skill: Skill) => {
    setSkillList((prev) => prev.filter((s) => s.id !== skill.id));
  };

  const handleInputFocus = () => {
    setDropdownOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDropdownOpen(false), 150);
  };

  if (loading) {
    return <div>Loading skills...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
                key={skill.id}
                onClick={() => handleAddSkill(skill)}
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              >
                {skill.skill_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Skills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {skillList.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-theme text-white text-sm font-medium shadow-sm"
          >
            <span>{skill.skill_name}</span>
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
