import React from "react";

interface Skill {
  title: string;
}

interface SkillsFormProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  setSkills,
}) => {
  const [newSkill, setNewSkill] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      const updatedSkills = [...skills, { title: newSkill.trim() }];
      setSkills(updatedSkills);
      setNewSkill("");
    }
  };

  const handleDelete = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1 border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="Enter a skill"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Skill
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-theme px-3 py-1 rounded-full"
          >
            <span>{skill.title}</span>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
