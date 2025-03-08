import { useState, useEffect } from 'react';
import { fetchGenres } from '../utils/api';

export const FilterBar = ({ setFilters, movies }) => {
  const [genres, setGenres] = useState([]);
  const ratings = ['5+', '6+', '7+', '8+', '9+'];
  const years = ['2025', '2024', '2023', '2022', '2021', '2020'];

  const [selectedFilters, setSelectedFilters] = useState({
    genre: '',
    year: '',
    rating: '',
  });

  useEffect(() => {
    // Fetch Genres using the API function
    const getGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };
    getGenres();
  }, []);

  const handleFilterChange = (type, value) => {
    const newFilters = { ...selectedFilters, [type]: value };
    setSelectedFilters(newFilters);
    setFilters(newFilters);
  };

  return (
    <div className='flex flex-wrap gap-4 mb-6'>
      <select
        className='px-4 py-2 rounded-lg bg-gray-700 text-white border-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300'
        value={selectedFilters.genre}
        onChange={(e) => handleFilterChange('genre', e.target.value)}>
        <option value=''>All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <select
        className='px-4 py-2 rounded-lg bg-gray-700 text-white border-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300'
        value={selectedFilters.year}
        onChange={(e) => handleFilterChange('year', e.target.value)}>
        <option value=''>All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        className='px-4 py-2 rounded-lg bg-gray-700 text-white border-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300'
        value={selectedFilters.rating}
        onChange={(e) => handleFilterChange('rating', e.target.value)}>
        <option value=''>All Ratings</option>
        {ratings.map((rating) => (
          <option key={rating} value={rating.replace('+', '')}>
            {rating}
          </option>
        ))}
      </select>

      {Object.values(selectedFilters).some(Boolean) && (
        <button
          className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800'
          onClick={() => {
            setSelectedFilters({ genre: '', year: '', rating: '' });
            setFilters({ genre: '', year: '', rating: '' });
          }}>
          Clear Filters
        </button>
      )}
    </div>
  );
};
