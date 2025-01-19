interface TextAreaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  [key: string | null]: any;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  ...props
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1 dark:text-gray-200">
      {label}
    </label>
    <textarea
      {...props}
      className="w-full p-2 border rounded-md h-24 bg-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextArea;