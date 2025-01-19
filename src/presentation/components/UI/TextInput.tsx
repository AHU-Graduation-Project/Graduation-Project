import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export function InputField({
  id,
  type,
  value,
  onChange,
  label,
  placeholder,
  showToggle,
  inputClickHandler,
}: {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  showToggle?: boolean;
  inputClickHandler?: () => void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateInput = () => {
    if (type === "password" && value.trim().length < 8) {
      setError("");
    } else if (value.trim() === "") {
      setError("This field is required.");
    } else {
      setError(null);
    }
  };

  const isInputInvalid = error !== null;

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm text-gray-400 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e);
          if (isInputInvalid) {
            validateInput();
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          validateInput();
        }}
        className={`w-full px-4 py-3 bg-gray-900 text-gray-300 rounded-lg border ${
          isInputInvalid
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-600 focus:ring-cyan-400"
        } focus:ring-2 focus:outline-none placeholder-transparent transition-all duration-200 ease-in-out shadow-md`}
        placeholder={placeholder}
      />
      {showToggle && inputClickHandler && (
        <button
          type="button"
          onClick={inputClickHandler}
          className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition focus:outline-none"
        >
          {type === "password" ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      )}
      {isInputInvalid && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
