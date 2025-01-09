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
    className={`w-full p-2 border bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-theme ${className}`}
  >
    {items.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
);
export default SelectDropDown;
