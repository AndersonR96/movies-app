import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Favorites from './pages/Favorites';
import MovieDetail from './pages/MovieDetail';
import SerieDetail from './pages/SerieDetail';

export default function App() {
  return (
    <Box sx={{ bgcolor: '#181818', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: '#23272f' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Movies App
          </Typography>
          <Button component={Link} to="/movies" color="inherit" sx={{ fontWeight: 500 }}>
            Peliculas
          </Button>
          <Button component={Link} to="/series" color="inherit" sx={{ fontWeight: 500 }}>
            Series
          </Button>
          <Button component={Link} to="/favorites" color="inherit" sx={{ fontWeight: 500 }}>
            Favoritos
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, p: 2 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/series" element={<Series />} />
          <Route path="/series/:id" element={<SerieDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Box>
    </Box>
  );
}
