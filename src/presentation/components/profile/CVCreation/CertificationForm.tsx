import React from "react";

interface CertificationFormProps {
  onSubmit: (data: Certification) => void;
  onDelete?: (index: number) => void;
  initialData?: Certification;
  index?: number;
}

export const CertificationForm: React.FC<CertificationFormProps> = ({
  onSubmit,
  onDelete,
  initialData,
  index,
}) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    organization: initialData?.organization || "",
    dateObtained: initialData?.dateObtained || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ name: "", organization: "", dateObtained: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
          Certification Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="AWS Certified Solutions Architect"
        />
      </div>
      <div>
        <label className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
          Organization
        </label>
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="w-full px-3 py-2 border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="Amazon Web Services"
        />
      </div>
      <div>
        <label className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
          Date Obtained
        </label>
        <input
          type="text"
          name="dateObtained"
          value={formData.dateObtained}
          onChange={handleChange}
          className="w-full px-3 py-2 border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="June 2023"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          {initialData ? "Update" : "Add"} Certification
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
