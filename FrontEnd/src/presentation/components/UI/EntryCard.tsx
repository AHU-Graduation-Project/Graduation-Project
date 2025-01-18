import { X } from "lucide-react";

interface EntryCardProps {
  data: Record<string, string>;
  onDelete: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ data, onDelete }) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md relative">
    <button
      onClick={onDelete}
      className="absolute top-2 right-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
    >
      <X size={20} />
    </button>
    {Object.entries(data).map(([key, value]) => (
      <div key={key} className="mb-2 dark:text-gray-200">
        <span className="font-medium">{key}: </span>
        <span>{value}</span>
      </div>
    ))}
  </div>
);
export default EntryCard;