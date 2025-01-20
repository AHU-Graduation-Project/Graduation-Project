import React from "react";

interface ExperienceFormProps {
  onSubmit: (data: Experience) => void;
  onDelete?: (index: number) => void;
  initialData?: Experience;
  index?: number;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  onSubmit,
  onDelete,
  initialData,
  index,
}) => {
  const [formData, setFormData] = React.useState({
    title: initialData?.title || "",
    company: initialData?.company || "",
    location: initialData?.location || "",
    period: initialData?.period || "",
    responsibilities: initialData?.responsibilities || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        title: "",
        company: "",
        location: "",
        period: "",
        responsibilities: "",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="Software Engineer"
        />
      </div>
      <div>
        <label className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
          Company
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="Company Name"
        />
      </div>
      <div>
        <label className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="City, Country"
        />
      </div>
      <div>
        <label className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
          Period
        </label>
        <input
          type="text"
          name="period"
          value={formData.period}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="Jan 2020 - Present"
        />
      </div>
      <div>
        <label className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
          Responsibilities (one per line)
        </label>
        <textarea
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="- Led development of feature X&#10;- Improved performance by Y%"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          {initialData ? "Update" : "Add"} Experience
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
