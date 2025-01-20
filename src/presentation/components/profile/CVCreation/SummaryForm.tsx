import React from "react";

interface SummaryFormProps {
  onSubmit: (summary: string) => void; // Called when the form is submitted
  summary: string; // The current summary value from the parent
  setSummary: (summary: string) => void; // Updates the summary in the parent
}

export const SummaryForm: React.FC<SummaryFormProps> = ({
  onSubmit,
  summary,
  setSummary,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value); // Update the parent state as the user types
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(summary); // Submit the current summary value
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="summary"
          className="block dark:text-white text-sm font-medium text-gray-700 mb-1"
        >
          Professional Summary
        </label>
        <textarea
          id="summary"
          value={summary}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
          placeholder="Write a brief professional summary..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Save Summary
      </button>
    </form>
  );
};
