import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export const MovieReviews = ({ movieId, triggerRefetch }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = () => {
      try {
        // Get all reviews from localStorage
        const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');

        // Filter reviews for this movie
        const movieReviews = allReviews.filter(
          (review) => review.movieId === movieId
        );

        // Sort reviews by date (newest first)
        movieReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        setReviews(movieReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId, triggerRefetch]);

  if (loading) {
    return (
      <div className='mt-6 bg-gray-800 rounded-lg p-6 shadow-lg'>
        <h3 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4'>
          Reviews
        </h3>
        <div className='animate-pulse space-y-4'>
          {[1, 2].map((n) => (
            <div
              key={n}
              className='bg-gray-700/50 h-24 rounded-lg border border-gray-700'
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='mt-6 bg-gray-800 rounded-lg p-6 shadow-lg'>
      <h3 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4'>
        Reviews ({reviews.length})
      </h3>
      {reviews.length > 0 ? (
        <div className='space-y-4'>
          {reviews.map((review) => (
            <div
              key={review.id}
              className='bg-gray-700/50 rounded-lg p-4 border border-gray-600'>
              <div className='flex justify-between items-start mb-2'>
                <div>
                  <h4 className='font-medium text-yellow-500'>
                    {review.author_name}
                  </h4>
                  <p className='text-sm text-gray-400'>
                    {format(new Date(review.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className='text-gray-300'>{review.content}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-400 italic'>
          No reviews yet. Be the first to review!
        </p>
      )}
    </div>
  );
};
