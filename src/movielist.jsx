import { useEffect, useState } from 'react';

function MovieList({ category }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=3b847ccc51e3c965bbe1787d12943773&language=en-US&page=1`)
            .then((res) => res.json())
            .then((data) => setMovies(data.results))
    }, [category]);

    return (
        <div className="App">
            <h1>{category}</h1>
            <ol>

                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h1>{movie.title}</h1>
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                        <p>{movie.overview}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default MovieList;
