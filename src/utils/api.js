import axios from 'axios';

const API_URL = 'http://localhost/wp-headless/wordpress/wp-json/wp/v2';

export const fetchMovies = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/movies?_embed&acf&rest_base=genre`
    );
    const moviesWithGenres = response.data.map((movie) => {
      const taxonomyGenres = movie._embedded?.['wp:term']?.[0] || [];
      const acfGenres = movie.acf?.genre || [];

 

      return {
        ...movie,
        genres: taxonomyGenres.length > 0 ? taxonomyGenres : acfGenres,
      };
    });
    return moviesWithGenres;
  } catch (error) {
    return [];
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}/genre`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchMoviePoster = async (posterId) => {
  try {
    const response = await axios.get(
      `http://localhost/wp-headless/wordpress/wp-json/wp/v2/media/${posterId}`
    );
    return response.data.source_url;
  } catch (error) {
    console.error('Error fetching movie poster:', error);
    return 'https://via.placeholder.com/300x400?text=No+Image';
  }
};

export const getGenreName = async (genreId) => {
  try {
    const response = await axios.get(`${API_URL}/genre/${genreId}`); // Adjust endpoint if needed
    return response.data.name || 'Unknown Genre'; // Return genre name
  } catch (error) {
    return 'Unknown Genre'; // Default if error occurs
  }
};
