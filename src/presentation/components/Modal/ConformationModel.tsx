import { useRef, useEffect } from "react";

type ConfirmationModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title: string;
  message: string;
};

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 max-w-sm w-full"
      >
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <p className="text-sm mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
