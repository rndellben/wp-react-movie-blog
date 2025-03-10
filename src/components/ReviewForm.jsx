import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const ReviewForm = ({ movieId, onReviewSubmitted }) => {
  const { user } = useAuth();
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (!user) {
      setError('You must be logged in to submit a review.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Get existing reviews from localStorage
      const existingReviews = JSON.parse(
        localStorage.getItem('reviews') || '[]'
      );

      // Create new review
      const newReview = {
        id: Date.now(), // Use timestamp as unique ID
        content: review,
        author_name: user.username,
        date: new Date().toISOString(),
        movieId: movieId,
      };

      // Add new review to array
      existingReviews.push(newReview);

      // Save back to localStorage
      localStorage.setItem('reviews', JSON.stringify(existingReviews));

      setSuccess('Review submitted successfully!');
      setReview('');
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (error) {
      console.error('Review submission error:', error);
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-gray-800 rounded-lg p-6 shadow-lg'>
      <h3 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4'>
        Write a Review
      </h3>
      {!user && (
        <div className='bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4'>
          <p className='text-yellow-500 text-sm'>
            Please log in to submit a review
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={
              user ? 'Write your review here...' : 'Log in to write a review'
            }
            disabled={!user}
            className='w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none h-32 placeholder-gray-400'
            required
          />
        </div>
        {error && (
          <div className='bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm'>
            {error}
          </div>
        )}
        {success && (
          <div className='bg-green-900/50 border border-green-500/50 text-green-200 px-4 py-2 rounded-lg text-sm'>
            {success}
          </div>
        )}
        <button
          type='submit'
          disabled={!user || isSubmitting}
          className='bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800'>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};
