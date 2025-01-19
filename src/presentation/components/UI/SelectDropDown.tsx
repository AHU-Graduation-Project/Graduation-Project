const SelectDropDown = ({
  items,
  selectedValue,
  onChange,
  className,
}: {
  items: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}) => (
  <select
    value={selectedValue}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme ${className} bg-transparent dark:bg-slate-800 text-black dark:text-white`}
  >
    {items.map((item) => (
      <option
        key={item}
        value={item}
        className="bg-white dark:bg-slate-800 text-black dark:text-white"
      >
        {item}
      </option>
    ))}
  </select>
);
export default SelectDropDown;
