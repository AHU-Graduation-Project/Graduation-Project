import { FaEye, FaEyeSlash } from "react-icons/fa";

export function InputField({
  id,
  type,
  value,
  onChange,
  label,
  placeholder,
  showToggle,
  toggleHandler,
}: {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  showToggle?: boolean;
  toggleHandler?: () => void;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm text-gray-400 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-gray-900 text-gray-300 rounded-lg border border-gray-600 focus:ring-2 focus:ring-cyan-400 focus:outline-none placeholder-transparent transition-all duration-200 ease-in-out shadow-md"
        placeholder={placeholder}
      />
      {showToggle && toggleHandler && (
        <button
          type="button"
          onClick={toggleHandler}
          className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition focus:outline-none"
        >
          {type === "password" ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      )}
    </div>
  );
}
