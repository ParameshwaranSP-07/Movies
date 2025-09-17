import React, { useState, useEffect } from 'react';
import './App.css';
import MovieDetails from './MovieDetails';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    if (selectedMovieId !== null) return; // Don't fetch list if viewing details
    async function getData() {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const payload = await response.json();
        setMovies(payload);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [selectedMovieId]);

  if (selectedMovieId !== null) {
    return (
      <div className="App">
        <MovieDetails movieId={selectedMovieId} onBack={() => setSelectedMovieId(null)} />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Movie List</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <div className="movie-grid">
        {movies && Array.isArray(movies) && movies.map(movie => (
          <div className="movie-card" key={movie.id} onClick={() => setSelectedMovieId(movie.id)} style={{cursor:'pointer'}}>
            <h2>{movie.title}</h2>
            <p className="tagline">{movie.tagline || <span style={{color:'#aaa'}}>No tagline</span>}</p>
            <p className="vote">Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
