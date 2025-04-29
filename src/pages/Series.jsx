import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPopularSeries,
  getTopRatedSeries,
  getMostViewedSeries,
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

export default function Series() {
  const [series, setSeries] = useState([]);
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
    if (filter === 'popular') fetchFn = getPopularSeries;
    else if (filter === 'top_rated') fetchFn = getTopRatedSeries;
    else fetchFn = getMostViewedSeries;
    setLoading(true);
    fetchFn(1).then(data => {
      setSeries(data.results);
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
      if (filter === 'popular') fetchFn = getPopularSeries;
      else if (filter === 'top_rated') fetchFn = getTopRatedSeries;
      else fetchFn = getMostViewedSeries;
      fetchFn(page + 1).then(data => {
        setSeries(prev => [...prev, ...data.results]);
        setPage(p => p + 1);
        setLoadingMore(false);
      });
    }
  }, [inView, loading, loadingMore, page, totalPages, filter]);

  const handleToggleFavorite = (serie) => {
    if (isFavorite(serie.id)) {
      removeFavorite(serie.id);
    } else {
      addFavorite(serie);
    }
    setSeries([...series]); // Trigger re-render
  };

  const handleCardClick = (id) => {
    navigate(`/series/${id}`);
  };

  const handleSearchSelect = (item) => {
    navigate(`/series/${item.id}`);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFD700', mb: 2 }}>
        Series
      </Typography>
      <SearchBar type="series" onSelect={handleSearchSelect} />
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
          {series.map(serie => (
            <Card
              key={serie.id}
              item={serie}
              isFavorite={isFavorite(serie.id)}
              onToggleFavorite={handleToggleFavorite}
              onClick={() => handleCardClick(serie.id)}
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
      {page >= totalPages && series.length > 0 && !loading && (
        <Typography align="center" sx={{ color: '#FFD700', my: 2 }}>
          ¡Has llegado al final!
        </Typography>
      )}
    </Box>
  );
}
