import React from "react";
import SelectDropDown from "../UI/SelectDropDown";

type DropdownSectionProps = {
  label: string;
  items: string[];
  selectedValue: string;
  onChange: (value: string) => void;
};

const DropdownSection: React.FC<DropdownSectionProps> = ({
  label,
  items,
  selectedValue,
  onChange,
}) => (
  <div className="col-span-1 shadow-md rounded-lg p-6">
    <label
      htmlFor={label.toLowerCase()}
      className="block text-sm font-medium text-theme dark:text-white mb-1"
    >
      {label}
    </label>
    <SelectDropDown
      items={items}
      selectedValue={selectedValue}
      onChange={onChange}
      className="border border-gray-300 dark:border-gray-600 rounded-md text-sm"
    />
  </div>
);

export default DropdownSection;
