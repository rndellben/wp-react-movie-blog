import { useEffect, useState, useMemo } from 'react';
import { fetchMovies } from '../utils/api';
import { MovieCard } from './MovieCard';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { Pagination } from './Pagination';

export const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ genre: '', year: '', rating: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    getMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      // Search filter
      const matchesSearch = movie.title.rendered
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Genre filter
      const matchesGenre =
        !filters.genre ||
        (movie.acf?.genre &&
          (Array.isArray(movie.acf.genre)
            ? movie.acf.genre.includes(Number(filters.genre))
            : movie.acf.genre === Number(filters.genre)));

      // Year filter
      const movieYear = movie.acf?.release_date
        ? movie.acf.release_date.substring(0, 4)
        : null;

      const matchesYear =
        !filters.year ||
        (movieYear && Number(movieYear) === Number(filters.year));

      // Rating filter
      const matchesRating =
        !filters.rating ||
        (movie.acf?.rating &&
          parseFloat(movie.acf.rating) >= parseFloat(filters.rating));

      return matchesSearch && matchesGenre && matchesYear && matchesRating;
    });
  }, [movies, searchTerm, filters]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Pagination calculation
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white'>
      <div className='container mx-auto p-6'>
        <h1 className='text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500'>
          🎬 Movie Blog
        </h1>
        <div className='bg-gray-800 rounded-lg p-6 mb-8 shadow-lg'>
          <SearchBar setSearchTerm={setSearchTerm} />
          <FilterBar setFilters={setFilters} movies={movies} />
        </div>

        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8'>
          {currentMovies.length ? (
            currentMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className='text-center col-span-full text-gray-400 py-12'>
              No movies found!
            </p>
          )}
        </div>

        {filteredMovies.length > moviesPerPage && (
          <div className='mt-12'>
            <Pagination
              totalMovies={filteredMovies.length}
              moviesPerPage={moviesPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
