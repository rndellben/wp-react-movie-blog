export const SearchBar = ({ setSearchTerm }) => {
  return (
    <div className='relative mb-6'>
      <input
        type='text'
        placeholder='Search movies...'
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300'
      />
      <span className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400'>
        🔍
      </span>
    </div>
  );
};
