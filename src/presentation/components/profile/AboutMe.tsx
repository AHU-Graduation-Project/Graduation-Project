import React from "react";

type AboutMeProps = {
  aboutme: string;
  onAboutMeChange: (value: string) => void;
};

const AboutMe: React.FC<AboutMeProps> = ({ aboutme, onAboutMeChange }) => (
  <div className="shadow-md rounded-lg p-6">
    <h3 className="text-lg font-semibold text-theme dark:text-white mb-4">
      About Me
    </h3>
    <textarea
      className="w-full border bg-transparent dark:bg-slate-800 border-gray-300 dark:border-gray-600 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 resize-none"
      rows={5}
      value={aboutme}
      onChange={(e) => onAboutMeChange(e.target.value)}
      placeholder="Write something about yourself..."
    ></textarea>
  </div>
);

export default AboutMe;
