import { useEffect, useState } from 'react';
import './movielist.css'
function MovieList({ category }) {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState("");

    useEffect(() => {
        setPage(1)
    }, [category])
    useEffect(() => {
        const fetchMovies = async () => {
            let url = "";

            if (search !== "") {
                url = `https://api.themoviedb.org/3/search/movie?api_key=3b847ccc51e3c965bbe1787d12943773&language=en-US&query=${search}&page=1`;
            } else if (region !== "") {
                url = `https://api.themoviedb.org/3/discover/movie?api_key=3b847ccc51e3c965bbe1787d12943773&with_origin_country=${region}&page=${page}`;
            } else {
                url = `https://api.themoviedb.org/3/movie/${category}?api_key=3b847ccc51e3c965bbe1787d12943773&language=en-US&page=${page}`;
            }

            try {
                const res = await fetch(url);
                const data = await res.json();

                if (!data.results) return;

                const detailedMovies = await Promise.all(
                    data.results.map(async (movie) => {
                        // runtime
                        const RunTimeRes = await fetch(
                            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=3b847ccc51e3c965bbe1787d12943773&language=en-US`
                        );
                        const RuntimeData = await RunTimeRes.json();

                        // certification
                        const releaseRes = await fetch(
                            `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=3b847ccc51e3c965bbe1787d12943773`
                        );
                        const releaseData = await releaseRes.json();


                        let certification = "";
                        const usRelease = releaseData.results.find(
                            (r) => r.iso_3166_1 === "US"
                        );
                        if (usRelease && usRelease.release_dates.length > 0) {
                            const ratedRelease = usRelease.release_dates.find(
                                (rd) => rd.certification && rd.certification !== ""
                            );

                            if (ratedRelease) {
                                certification = ratedRelease.certification;
                            }
                        }

                        return {
                            ...movie,
                            runtime: RuntimeData.runtime,
                            certification: certification || "N/A",
                        };
                    })
                );

                setMovies(detailedMovies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
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
    const formatRuntime = (minutes) => {
        if (!minutes)
            return "N/A";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className="App">

            <h1>{category}</h1>

            <button disabled={page === 1} onClick={prevpage}>Previous</button>
            <input type='number' min={1} onChange={(e) => { setPage(Number(e.target.value)) }} style={{ margin: '5px', width: "6ch" }} value={page} />
            <button onClick={nextpage}>Next</button> <br></br>
            <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Enter movie name'></input>
            <input onChange={(e) => setRegion(e.target.value)} value={region} placeholder='Enter country'></input>

            <ol className="movie-list">
                {movies.map((movie, index) => (
                    <li key={movie.id} className="movie-item">
                        <span className="movie-rank">{index + 1 + (page - 1) * 20}.</span>

                        <img
                            className="movie-poster"
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                        />

                        <div className="movie-info">
                            <h2 className="movie-title">{movie.title}</h2>
                            <p className="movie-meta">
                                {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"} {" "}
                                {formatRuntime(movie.runtime)}  {movie.certification}
                            </p>
                            <p className="movie-rating">
                                ⭐ {movie.vote_average} ({movie.vote_count})
                            </p>
                            <div className="movie-actions">
                                <button className="link-btn">Rate</button>
                                <button className="link-btn">Mark as watched</button>
                            </div>
                        </div>

                        <button className="info-btn">ℹ️</button>
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
