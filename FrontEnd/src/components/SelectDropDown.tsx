import React from "react";

interface SelectDropDownProps {
  items: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const SelectDropDown: React.FC<SelectDropDownProps> = ({
  items,
  selectedValue,
  onChange,
}) => {
  return (
    <select
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border bg-transparent border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-theme"
    >
      <option value="" disabled>
        Select an option
      </option>
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectDropDown;
