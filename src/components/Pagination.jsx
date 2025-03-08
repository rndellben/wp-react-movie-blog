export const Pagination = ({
  totalMovies,
  moviesPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center gap-2'>
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
    </div>
  );
};
