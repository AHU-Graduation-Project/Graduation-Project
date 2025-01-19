import React from "react";

interface EducationFormProps {
  onSubmit: (data: Education) => void;
  onDelete?: (index: number) => void;
  initialData?: Education;
  index?: number;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  onSubmit,
  onDelete,
  initialData,
  index,
}) => {
  const [formData, setFormData] = React.useState({
    degree: initialData?.degree || "",
    institution: initialData?.institution || "",
    years: initialData?.years || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ degree: "", institution: "", years: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
          Degree
        </label>
        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="Bachelor of Science in Computer Science"
        />
      </div>
      <div>
        <label className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
          Institution
        </label>
        <input
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="University Name"
        />
      </div>
      <div>
        <label className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
          Years
        </label>
        <input
          type="text"
          name="years"
          value={formData.years}
          onChange={handleChange}
          required
          className="w-full px-3 py-2  border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="2019 - 2023"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          {initialData ? "Update" : "Add"} Education
        </button>
        {onDelete && index !== undefined && (
          <button
            type="button"
            onClick={() => onDelete(index)}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};
