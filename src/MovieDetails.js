import React, { useEffect, useState } from 'react';

function MovieDetails({ movieId, onBack }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(`/api/movies/${movieId}`);
        if (!response.ok) throw new Error('Movie not found');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    // Try to parse as ISO, fallback to DD/MM/YY
    let date = new Date(dateStr);
    if (isNaN(date)) {
      // Try DD/MM/YY
      const [d, m, y] = dateStr.split('/');
      date = new Date(`20${y.length === 2 ? y : y.slice(-2)}`, m - 1, d);
    }
    return date.toLocaleDateString();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color:'red'}}>{error}</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-details">
      <button className="back-btn" onClick={onBack}>&larr; Back to list</button>
      <h2>{movie.title}</h2>
      <p><strong>Tagline:</strong> {movie.tagline || 'N/A'}</p>
      <p><strong>Overview:</strong> {movie.overview || 'N/A'}</p>
      <p><strong>Release Date:</strong> {formatDate(movie.release_date)}</p>
      <p><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} min` : 'N/A'}</p>
      <p><strong>Status:</strong> {movie.status || 'N/A'}</p>
      <p><strong>Vote Average:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</p>
      <p><strong>Vote Count:</strong> {movie.vote_count || 'N/A'}</p>
      <p><strong>Original Title:</strong> {movie.original_title || 'N/A'}</p>
      <p><strong>ID:</strong> {movie.id}</p>
    </div>
  );
}

export default MovieDetails;
