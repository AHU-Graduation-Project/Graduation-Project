import { ArrowRight, ArrowLeft } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    const visiblePages: number[] = [];
    const maxVisible = 3; // Max number of page buttons to display

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      const end = Math.min(totalPages, start + maxVisible - 1);

      for (let i = start; i <= end; i++) {
        visiblePages.push(i);
      }

      if (start > 1) {
        visiblePages.unshift(1);
        if (start > 2) visiblePages.splice(1, 0, -1); // Ellipsis indicator
      }

      if (end < totalPages) {
        visiblePages.push(-1); // Ellipsis indicator
        visiblePages.push(totalPages);
      }
    }

    return visiblePages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-evenly mt-4 space-x-1 flex-wrap min-w-[300px] max-w-[500px] mx-auto">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-2 py-2  font-medium rounded-md transition-colors 
                   text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 
                   dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <div className="flex space-x-2 overflow-x-auto">
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== -1 && onPageChange(page)}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
              page === currentPage
                ? "bg-theme text-white dark:bg-blue-600"
                : page === -1
                ? "cursor-default text-gray-400"
                : "text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
            disabled={page === -1}
          >
            {page === -1 ? "..." : page}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-2 py-2 text-sm font-medium rounded-md transition-colors 
                   text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 
                   dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
