import axios from 'axios';

const TVMAZE_API_BASE = 'https://api.tvmaze.com';

export const fetchMovies = async (page = 0) => {
  try {
    const response = await fetch(`${TVMAZE_API_BASE}/shows?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    return [];
  }
};

export const fetchGenres = async () => {
  // TVmaze doesn't have a separate genres endpoint, so we'll fetch shows
  // and extract unique genres
  try {
    const shows = await fetchMovies();
    const uniqueGenres = [...new Set(shows.flatMap((show) => show.genres))];
    return uniqueGenres.map((name, id) => ({ id, name }));
  } catch (error) {
    console.error('Error fetching genres:', error);
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
  const genres = await fetchGenres();
  return genres.find((g) => g.id === genreId)?.name || 'Unknown';
};
