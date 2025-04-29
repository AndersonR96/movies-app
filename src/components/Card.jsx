import React from 'react';
import { Card as MUICard, CardMedia, CardContent, Typography, IconButton, Box, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Card({ item, isFavorite, onToggleFavorite, onClick }) {
  const title = item.title || item.name;
  return (
    <MUICard
      sx={{
        width: 220,
        bgcolor: '#23272f',
        color: '#fff',
        borderRadius: 3,
        boxShadow: 3,
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.15s',
        '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        image={item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : ''}
        alt={title}
        sx={{ width: '100%', borderRadius: 2, mb: 1, minHeight: 320, objectFit: 'cover', bgcolor: '#181818' }}
      />
      <CardContent sx={{ p: 1, width: '100%', textAlign: 'center' }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#FFD700', mb: 0.5 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 1 }}>
          <StarIcon sx={{ color: '#FFD700', fontSize: 18 }} />
          <Typography fontWeight={500} sx={{ color: '#fff' }}>{item.vote_average?.toFixed(1) || '-'}</Typography>
        </Box>
        {onToggleFavorite && (
          <Tooltip title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
            <IconButton
              onClick={e => { e.stopPropagation(); onToggleFavorite(item); }}
              sx={{ color: isFavorite ? '#FFD700' : '#fff', bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: '#FFD70022' }, mb: 1 }}
            >
              {isFavorite ? <StarIcon fontSize="large" /> : <StarBorderIcon fontSize="large" />}
            </IconButton>
          </Tooltip>
        )}
      </CardContent>
    </MUICard>
  );
}
