import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetail, addFavorite, isFavorite } from '../services/tmdb';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetail(id).then(setMovie);
  }, [id]);

  if (!movie) return <div style={{ padding: '1rem' }}>Cargando...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto', color: '#fff' }}>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} style={{ borderRadius: 8 }} />
        <div>
          <h1>{movie.title}</h1>
          <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
          <p><strong>Duración:</strong> {movie.runtime} min</p>
          <p><strong>Géneros:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Sinopsis:</strong> {movie.overview}</p>
          <button onClick={() => addFavorite(movie)} disabled={isFavorite(movie.id)}>
            {isFavorite(movie.id) ? 'Favorito' : 'Agregar a Favoritos'}
          </button>
        </div>
      </div>
    </div>
  );
}
