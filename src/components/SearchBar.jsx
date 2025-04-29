import React, { useState, useRef } from 'react';
import { searchMovies, searchSeries } from '../services/tmdb';
import { Autocomplete, TextField, Box, Typography, Avatar, Paper } from '@mui/material';

export default function SearchBar({ type, onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(timeoutRef.current);
    if (value.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    timeoutRef.current = setTimeout(async () => {
      const data = type === 'movie' ? await searchMovies(value) : await searchSeries(value);
      setResults(data.slice(0, 7));
      setOpen(true);
    }, 300);
  };

  return (
    <Autocomplete
      freeSolo
      open={open && results.length > 0}
      onOpen={() => { if (results.length > 0) setOpen(true); }}
      onClose={() => setOpen(false)}
      options={results}
      getOptionLabel={(option) => option.title || option.name || ''}
      onChange={(_, value) => {
        if (value) {
          setQuery('');
          setOpen(false);
          setResults([]);
          onSelect(value);
        }
      }}
      inputValue={query}
      onInputChange={(_, value, reason) => {
        if (reason === 'input') handleInputChange({ target: { value } });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={type === 'movie' ? 'Buscar película...' : 'Buscar serie...'}
          variant="outlined"
          sx={{ mb: 2, bgcolor: '#23272f', borderRadius: 2 }}
          InputLabelProps={{ style: { color: '#FFD700' } }}
          InputProps={{ ...params.InputProps, style: { color: '#fff' } }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.2 }}>
          <Avatar
            variant="rounded"
            src={option.poster_path ? `https://image.tmdb.org/t/p/w92${option.poster_path}` : ''}
            alt="poster"
            sx={{ width: 40, height: 56, bgcolor: '#444' }}
          />
          <Box sx={{ ml: 1 }}>
            <Typography sx={{ color: '#fff', fontWeight: 500 }}>
              {option.title || option.name}
            </Typography>
            <Typography sx={{ color: '#FFD700', fontSize: 13 }}>
              {option.vote_average?.toFixed(1) || '-'}
            </Typography>
          </Box>
        </Box>
      )}
      PaperComponent={({ children }) => (
        <Paper sx={{ bgcolor: '#23272f', color: '#fff', borderRadius: 2, mt: 1 }}>{children}</Paper>
      )}
    />
  );
}
