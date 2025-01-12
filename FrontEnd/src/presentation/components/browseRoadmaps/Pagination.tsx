import { ArrowLeft, ArrowRight } from "lucide-react";

interface PProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const P: React.FC<PProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const getVisiblePages = () => {
    const pages: (number | -1)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, -1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          -1,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          -1,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          -1,
          totalPages
        );
      }
    }
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-4 space-x-1 flex-wrap min-w-[300px] max-w-[500px] mx-auto relative z-10 ">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-2 py-2 font-medium rounded-md transition-colors 
                   text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 
                   dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <div className="flex space-x-2 overflow-x-auto">
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== -1 && setCurrentPage(page)}
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

export default P;
