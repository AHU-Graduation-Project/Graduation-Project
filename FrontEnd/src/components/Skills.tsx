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
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const { user, addSkill, removeSkill } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Populate selectedSkills with user's saved skills on component mount
  useEffect(() => {
    if (user?.selectedSkills) {
      const userSkills = user.selectedSkills.map((skillTitle: string) =>
        skills.find((skill) => skill.title === skillTitle)
      );
      setSelectedSkills(userSkills.filter((skill): skill is Skill => !!skill));
    }
  }, [user?.selectedSkills]);

  const handleSelectChange = (skillTitle: string) => {
    const selectedSkill = skills.find((skill) => skill.title === skillTitle);
    if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
      setSelectedSkills((prevSkills) => [...prevSkills, selectedSkill]);
      if (!user?.selectedSkills.includes(skillTitle)) {
        addSkill(skillTitle);
      }
    }
  };

  const handleRemove = (skillToRemove: Skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToRemove)
    );
    removeSkill(skillToRemove.title);
  };

  const filteredSkills = skills.filter(
    (skill) =>
      !selectedSkills.includes(skill) &&
      skill.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full mx-auto mt-10">
      <label className="block text-theme text-sm font-bold mb-2">
        Add Your Skills
      </label>
      <div className="p-2">
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <div
              key={skill.title}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-theme text-white text-sm font-medium shadow-sm"
            >
              <span>{skill.title}</span>
              <button
                onClick={() => handleRemove(skill)}
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2">
          {/* <input
            type="text"
            placeholder="Search for a skill"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border bg-transparent border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme mb-2"
          /> */}
          <select
            onChange={(e) => handleSelectChange(e.target.value)}
            className="w-full border bg-transparent border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme"
            value=""
          >
            <option value="" disabled>
              Add a Skill
            </option>
            {filteredSkills.map((skill) => (
              <option key={skill.title} value={skill.title}>
                {skill.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SkillSelector;
