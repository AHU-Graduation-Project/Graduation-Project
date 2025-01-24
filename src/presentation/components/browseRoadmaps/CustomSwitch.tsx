interface SwitchProps {
  label: string;
  isEnabled: boolean;
  onChange: (checked: boolean) => void;
}

export const CustomSwitch = ({ label, isEnabled, onChange }: SwitchProps) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <button
        role="switch"
        aria-checked={isEnabled.toString()}
        title={label}
        onClick={() => onChange(!isEnabled)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-theme focus:ring-offset-2
          ${isEnabled ? 'bg-theme' : 'bg-gray-300'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out
            ${isEnabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
};
