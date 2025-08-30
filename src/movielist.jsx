import { useEffect, useState } from 'react';

function MovieList({ category }) {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState("");

    useEffect(() => {
        setPage(1)
    }, [category])

    useEffect(() => {
        var url = "";

        if (search !== "") {
            url = `https://api.themoviedb.org/3/search/movie?api_key=3b847ccc51e3c965bbe1787d12943773&language=en-US&query=${search}&page=1`;
        } else if (region !== "") {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=3b847ccc51e3c965bbe1787d12943773&with_origin_country=${region}&page=${page}`;
        } else {
            url = `https://api.themoviedb.org/3/movie/${category}?api_key=3b847ccc51e3c965bbe1787d12943773&language=en-US&page=${page}`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => setMovies(data.results))
    }, [category, page, search, region]);

    const nextpage = () => {
        setPage(page + 1)
    }
    const prevpage = () => {
        setPage(page - 1)
    }
    if (page === 0) {
        setPage(1)
    }
    return (
        <div className="App">

            <h1>{category}</h1>

            <button disabled={page === 1} onClick={prevpage}>Previous</button>
            <input type='number' min={1} onChange={(e) => { setPage(Number(e.target.value)) }} style={{ margin: '5px', width: "6ch" }} value={page} />
            <button onClick={nextpage}>Next</button> <br></br>
            <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Enter movie name'></input>
            <input onChange={(e) => setRegion(e.target.value)} value={region} placeholder='Enter country'></input>

            <ol>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h1>{movie.title}</h1>
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                        <p>{movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}</p>
                        <p>{movie.overview}</p>
                    </li>
                ))}
            </ol>
            <button disabled={page === 1} onClick={prevpage}>Previous</button>
            <input type='number' min={1} onChange={(e) => { setPage(Number(e.target.value)) }} style={{ margin: '5px', width: "6ch" }} value={page} />
            <button onClick={nextpage}>Next</button> <br></br>
        </div>
    );
}

export default MovieList;
