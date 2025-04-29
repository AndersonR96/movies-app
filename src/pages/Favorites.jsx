import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from '../services/tmdb';
import Card from '../components/Card';
import { Box, Typography, Stack } from '@mui/material';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = useCallback((item) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
    setFavorites(getFavorites());
  }, []);

  const handleCardClick = useCallback((item) => {
    if (item.title) {
      navigate(`/movies/${item.id}`);
    } else {
      navigate(`/series/${item.id}`);
    }
  }, [navigate]);

  const movies = favorites.filter(item => item.title);
  const series = favorites.filter(item => item.name && !item.title);

  return (
    <Box sx={{ p: 2, minHeight: 'calc(100vh - 120px)', bgcolor: '#181818', borderRadius: 3 }}>
      <Typography variant="h4" sx={{ color: '#FFD700', mb: 3, fontWeight: 700 }}>Favoritos</Typography>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>Películas</Typography>
        <Stack direction="row" flexWrap="wrap" gap={3}>
          {movies.length === 0 && <Typography color="#aaa">No tienes películas favoritas aún.</Typography>}
          {movies.map(item => (
            <Card
              key={item.id}
              item={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={handleToggleFavorite}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </Stack>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>Series</Typography>
        <Stack direction="row" flexWrap="wrap" gap={3}>
          {series.length === 0 && <Typography color="#aaa">No tienes series favoritas aún.</Typography>}
          {series.map(item => (
            <Card
              key={item.id}
              item={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={handleToggleFavorite}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
