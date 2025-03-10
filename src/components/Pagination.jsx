export const Pagination = ({
  totalMovies,
  moviesPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  // Calculate the range of page numbers to display
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  // Adjust startPage if we're near the end
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  // Generate array of page numbers to display
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center gap-2'>
      {/* First page button */}
      {startPage > 1 && (
        <button
          onClick={() => setCurrentPage(1)}
          className='px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300'>
          1
        </button>
      )}

      {/* Ellipsis if there are skipped pages at the start */}
      {startPage > 2 && <span className='px-4 py-2 text-gray-400'>...</span>}

      {/* Page numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            currentPage === number
              ? 'bg-yellow-500 text-gray-900 font-bold'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}>
          {number}
        </button>
      ))}

      {/* Ellipsis if there are skipped pages at the end */}
      {endPage < totalPages - 1 && (
        <span className='px-4 py-2 text-gray-400'>...</span>
      )}

      {/* Last page button */}
      {endPage < totalPages && (
        <button
          onClick={() => setCurrentPage(totalPages)}
          className='px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300'>
          {totalPages}
        </button>
      )}
    </div>
  );
};
