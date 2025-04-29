import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies(page = 1) {
  const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: 'es-ES',
      page,
    },
  });
  return data;
}

export async function getTopRatedMovies(page = 1) {
  const { data } = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
      language: 'es-ES',
      page,
    },
  });
  return data;
}

export async function getMostViewedMovies(page = 1) {
  const { data } = await axios.get(`${BASE_URL}/movie/now_playing`, {
    params: {
      api_key: API_KEY,
      language: 'es-ES',
      page,
    },
  });
  return data;
}

export async function searchMovies(query) {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      language: 'es-ES',
      query,
    },
  });
  return data.results;
}

export async function searchSeries(query) {
  const { data } = await axios.get(`${BASE_URL}/search/tv`, {
    params: {
      api_key: API_KEY,
      language: 'es-ES',
      query,
    },
  });
  return data.results;
}

export async function getPopularSeries(page = 1) {
  const { data } = await axios.get(`${BASE_URL}/tv/popular`, {
    params: {
      api_key: API_KEY,
      language: 'es-ES',
      page,
    },
  });
  return data;
}

export async function getTopRatedSeries(page = 1) {
  const { data } = await axios.get(`${BASE_URL}/tv/top_rated`, {
    params: {
      api_key: API_KEY,
      language: 'es-ES',
      page,
    },
  });
  return data;
}

export async function getMostViewedSeries(page = 1) {
  const { data } = await axios.get(`${BASE_URL}/tv/on_the_air`, {
    params: {
      api_key: API_KEY,
      language: 'es-ES',
      page,
    },
  });
  return data;
}

export async function getMovieDetail(id) {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      language: 'es-ES',
    },
  });
  return data;
}

export async function getSerieDetail(id) {
  const { data } = await axios.get(`${BASE_URL}/tv/${id}`, {
    params: {
      api_key: API_KEY,
      language: 'es-ES',
    },
  });
  return data;
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

export function addFavorite(item) {
  const favs = getFavorites();
  if (!favs.find(f => f.id === item.id)) {
    favs.push(item);
    localStorage.setItem('favorites', JSON.stringify(favs));
  }
}

export function removeFavorite(id) {
  const favs = getFavorites().filter(f => f.id !== id);
  localStorage.setItem('favorites', JSON.stringify(favs));
}

export function isFavorite(id) {
  return getFavorites().some(f => f.id === id);
}
