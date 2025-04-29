import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPopularMovies,
  getTopRatedMovies,
  getMostViewedMovies,
  addFavorite,
  removeFavorite,
  isFavorite
} from '../services/tmdb';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { Box, Typography, Button, Stack, CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const FILTERS = [
  { label: 'Más populares', value: 'popular' },
  { label: 'Más vistas', value: 'most_viewed' },
  { label: 'Mejor valoradas', value: 'top_rated' }
];

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('popular');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 0 });

  // Cargar la primera página al cambiar filtro
  useEffect(() => {
    let fetchFn;
    if (filter === 'popular') fetchFn = getPopularMovies;
    else if (filter === 'top_rated') fetchFn = getTopRatedMovies;
    else fetchFn = getMostViewedMovies;
    setLoading(true);
    fetchFn(1).then(data => {
      setMovies(data.results);
      setPage(1);
      setTotalPages(data.total_pages);
      setLoading(false);
    });
  }, [filter]);

  // Cargar más páginas al hacer scroll
  useEffect(() => {
    if (
      inView &&
      !loading &&
      !loadingMore &&
      page < totalPages
    ) {
      setLoadingMore(true);
      let fetchFn;
      if (filter === 'popular') fetchFn = getPopularMovies;
      else if (filter === 'top_rated') fetchFn = getTopRatedMovies;
      else fetchFn = getMostViewedMovies;
      fetchFn(page + 1).then(data => {
        setMovies(prev => [...prev, ...data.results]);
        setPage(p => p + 1);
        setLoadingMore(false);
      });
    }
  }, [inView, loading, loadingMore, page, totalPages, filter]);

  const handleToggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
    setMovies([...movies]); // Trigger re-render
  };

  const handleCardClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const handleSearchSelect = (item) => {
    navigate(`/movies/${item.id}`);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFD700', mb: 2 }}>
        Películas
      </Typography>
      <SearchBar type="movie" onSelect={handleSearchSelect} />
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        {FILTERS.map(f => (
          <Button
            key={f.value}
            onClick={() => setFilter(f.value)}
            variant={filter === f.value ? 'contained' : 'outlined'}
            sx={{
              bgcolor: filter === f.value ? '#FFD700' : 'transparent',
              color: filter === f.value ? '#23272f' : '#fff',
              borderColor: '#FFD700',
              fontWeight: filter === f.value ? 700 : 400,
              '&:hover': {
                bgcolor: '#FFD700', color: '#23272f',
              },
              textTransform: 'none',
            }}
          >
            {f.label}
          </Button>
        ))}
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="warning" />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {movies.map(movie => (
            <Card
              key={movie.id}
              item={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={handleToggleFavorite}
              onClick={() => handleCardClick(movie.id)}
            />
          ))}
          <div ref={ref} style={{ width: '100%' }} />
        </Box>
      )}
      {loadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress color="warning" />
        </Box>
      )}
      {page >= totalPages && movies.length > 0 && !loading && (
        <Typography align="center" sx={{ color: '#FFD700', my: 2 }}>
          ¡Has llegado al final!
        </Typography>
      )}
    </Box>
  );
}
