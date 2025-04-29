import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSerieDetail, addFavorite, isFavorite } from '../services/tmdb';

export default function SerieDetail() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);

  useEffect(() => {
    getSerieDetail(id).then(setSerie);
  }, [id]);

  if (!serie) return <div style={{ padding: '1rem' }}>Cargando...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto', color: '#fff' }}>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <img src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`} alt={serie.name} style={{ borderRadius: 8 }} />
        <div>
          <h1>{serie.name}</h1>
          <p><strong>Fecha de estreno:</strong> {serie.first_air_date}</p>
          <p><strong>Temporadas:</strong> {serie.number_of_seasons}</p>
          <p><strong>Géneros:</strong> {serie.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Sinopsis:</strong> {serie.overview}</p>
          <button onClick={() => addFavorite(serie)} disabled={isFavorite(serie.id)}>
            {isFavorite(serie.id) ? 'Favorito' : 'Agregar a Favoritos'}
          </button>
        </div>
      </div>
    </div>
  );
}
