import React, { useState } from "react";

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

  const handleSelectChange = (skillTitle: string) => {
    const selectedSkill = skills.find((skill) => skill.title === skillTitle);
    if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
      setSelectedSkills((prevSkills) => [...prevSkills, selectedSkill]);
    }
  };

  const handleRemove = (skillToRemove: Skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <div className="w-full mx-auto mt-10">
      <label className="block text-theme text-sm font-bold mb-2">
        Add Your Skills
      </label>
      <div className=" p-2 ">
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
          <select
            onChange={(e) => handleSelectChange(e.target.value)}
            className="w-full border bg-transparent border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme"
            value=""
          >
            <option value="" disabled>
              Add a Skill
            </option>
            {skills
              .filter((skill) => !selectedSkills.includes(skill))
              .map((skill) => (
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
