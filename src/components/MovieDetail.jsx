import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { getGenreName } from '../utils/api';
import { MovieReviews } from './MovieReviews';
import { ReviewForm } from './ReviewForm';
// eslint-disable-next-line
export const MovieDetail = ({ movie, onClose }) => {
  const [genreNames, setGenreNames] = useState('Loading...');
  const [reviewsKey, setReviewsKey] = useState(0);

  useEffect(() => {
    const fetchGenres = async () => {
      if (!movie.genres) {
        setGenreNames(['N/A']);
        return;
      }

      const genrePromises = movie.genres.map((id) => getGenreName(id));
      const genreResults = await Promise.all(genrePromises);

      setGenreNames(genreResults);
    };

    fetchGenres();
  }, [movie]);

  // eslint-disable-next-line
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    if (dateString.length === 8) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${day}/${month}/${year}`;
    }

    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    }

    return dateString;
  };

  const handleReviewSubmitted = () => {
    // Trigger a refetch of reviews by changing the key
    setReviewsKey((prev) => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden max-w-4xl w-full shadow-xl max-h-[90vh] overflow-y-auto'
        onClick={(e) => e.stopPropagation()}>
        <div className='relative'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10'>
            <IoClose size={24} />
          </button>

          <div className='flex flex-col md:flex-row'>
            <div className='md:w-5/5'>
              <img
                src={
                  movie.image?.original || 'https://via.placeholder.com/300x450'
                }
                alt={movie.name}
                className='w-full h-[450px] object-cover'
              />
            </div>

            <div className='md:w-2/5 p-6'>
              <h2 className='text-3xl text-gray-500 font-bold mb-4'>
                {movie.name}
              </h2>

              <div className='space-y-4'>
                <div className='flex items-center'>
                  <span className='text-yellow-500 text-2xl font-bold'>
                    {movie.rating?.average || 'N/A'}
                  </span>
                  <span className='text-gray-600 ml-2'>/10</span>
                </div>

                <div className='space-y-2'>
                  <p className='text-gray-300'>
                    <span className='font-semibold'>Premiered:</span>{' '}
                    {movie.premiered || 'N/A'}
                  </p>
                  <p className='text-gray-300'>
                    <span className='font-semibold'>Network:</span>{' '}
                    {movie.network?.name || 'N/A'}
                  </p>
                  <p className='text-gray-300'>
                    <span className='font-semibold'>Status:</span>{' '}
                    {movie.status || 'N/A'}
                  </p>
                  <p className='text-gray-300'>
                    <span className='font-semibold'>Genre:</span>{' '}
                    {movie.genres.join(', ') || 'N/A'}
                  </p>
                </div>

                {movie.officialSite && (
                  <a
                    href={movie.officialSite}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mt-4'>
                    Official Site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='p-6'>
          <div
            className='prose prose-invert max-w-none'
            dangerouslySetInnerHTML={{ __html: movie.summary }}
          />
        </div>
        <div className='p-6 space-y-6'>
          <ReviewForm
            movieId={movie.id}
            onReviewSubmitted={handleReviewSubmitted}
          />
          <MovieReviews movieId={movie.id} triggerRefetch={reviewsKey} />
        </div>
      </motion.div>
    </motion.div>
  );
};
