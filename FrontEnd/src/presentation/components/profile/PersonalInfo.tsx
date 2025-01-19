import React from "react";

type PersonalInfoProps = {
  first_name: string;
  last_name: string;
  email: string;
  isEmailConf: boolean;
  position: string;
  onfirst_nameChange: (value: string) => void;
  onlast_nameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPositionChange: (value: string) => void;
};

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  first_name,
  last_name,
  email,
  isEmailConf,
  position,
  onfirst_nameChange,
  onlast_nameChange,
  onEmailChange,
  onPositionChange,
}) => (
  <div className="col-span-2 shadow-md rounded-lg p-6 space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="first_name"
          className="block text-sm font-medium text-theme dark:text-white mb-1"
        >
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          value={first_name}
          onChange={(e) => onfirst_nameChange(e.target.value)}
          className="w-full border bg-transparent dark:bg-slate-800 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme dark:focus:ring-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="last_name"
          className="block text-sm font-medium text-theme dark:text-white mb-1"
        >
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          value={last_name}
          onChange={(e) => onlast_nameChange(e.target.value)}
          className="w-full border bg-transparent dark:bg-slate-800 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme dark:focus:ring-indigo-500"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-theme dark:text-white mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={`w-full border bg-transparent dark:bg-slate-800 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm focus:outline-none ${
            isEmailConf
              ? "focus:ring-2 focus:ring-theme dark:focus:ring-indigo-500"
              : "cursor-not-allowed"
          }`}
          disabled={!isEmailConf}
        />
        {!isEmailConf && (
          <p className="text-red-500 dark:text-red-400 text-base mt-1">
            Please confirm your email!
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="position"
          className="block text-sm font-medium text-theme dark:text-white mb-1"
        >
          Position
        </label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => onPositionChange(e.target.value)}
          className="w-full border bg-transparent dark:bg-slate-800 dark:text-white border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme dark:focus:ring-indigo-500"
        />
      </div>
    </div>
  </div>
);

export default PersonalInfo;
