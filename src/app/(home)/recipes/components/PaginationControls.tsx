// File: app/recipes/components/PaginationControls.tsx

'use client';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function PaginationControls({ currentPage, totalPages, setPage }: PaginationControlsProps) {
  const handlePrevious = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  return (
    <div className="flex justify-between mt-8">
      {currentPage > 1 ? (
        <button onClick={handlePrevious} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Previous
        </button>
      ) : (
        <div></div>
      )}

      <span className="text-lg">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <button onClick={handleNext} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Next
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
