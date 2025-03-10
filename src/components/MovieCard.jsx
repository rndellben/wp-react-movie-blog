import { motion } from 'framer-motion';
import { useState } from 'react';
import { MovieDetail } from './MovieDetail';

export const MovieCard = ({ movie }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className='relative bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer group'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetail(true)}>
        <div className='relative aspect-[2/3]'>
          <img
            src={
              movie.image?.medium ||
              movie.image?.original ||
              'https://via.placeholder.com/300x400?text=No+Image'
            }
            alt={movie.name}
            className='w-full h-full object-cover'
          />
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
              <h2 className='text-xl text-white font-bold mb-2'>
                {movie.name}
              </h2>
              <p className='text-sm opacity-90'>
                {movie.network?.name || 'Network not available'}
              </p>
              <div className='flex items-center mt-2'>
                <span className='text-yellow-400 text-lg font-bold'>
                  {movie.rating?.average || 'N/A'}
                </span>
                <span className='text-sm ml-1'>/10</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {showDetail && (
        <MovieDetail movie={movie} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
};
