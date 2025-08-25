import { useEffect, useState } from 'react';

function MovieList({ category }) {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1)
    }, [category])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=3b847ccc51e3c965bbe1787d12943773&language=en-US&page=${page}`)
            .then((res) => res.json())
            .then((data) => setMovies(data.results))
    }, [category, page]);

    const nextpage = () => {
        setPage(page + 1)
    }
    const prevpage = () => {
        setPage(page - 1)
    }

    return (
        <div className="App">
            <h1>{category}</h1>

            <button disabled={page === 1} onClick={prevpage}>Previous</button>
            <input type='number' min={1} onChange={(e) => { setPage(e.target.value) }} style={{ margin: '5px', width: "6ch" }} value={page} />
            <button onClick={nextpage}>Next</button>

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
