import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    year: "2024",
    rating: "8.7",
    genre: "Sci-Fi",
    duration: "2h 46m",
    image: "https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
  },
  {
    id: 2,
    title: "The Batman",
    year: "2022",
    rating: "7.8",
    genre: "Crime",
    duration: "2h 56m",
    image: "https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    description: "When a sadistic killer leaves cryptic clues, Batman ventures into Gotham's underworld to expose the city's corruption."
  },
  {
    id: 3,
    title: "John Wick: Chapter 4",
    year: "2023",
    rating: "7.7",
    genre: "Action",
    duration: "2h 49m",
    image: "https://image.tmdb.org/t/p/w780/v4e0Y2n6SxR6U4xJQ1D7d9j6YtM.jpg",
    description: "John Wick uncovers a path to defeating the High Table, but before he can earn his freedom, he must face a new enemy."
  },
  {
    id: 4,
    title: "Oppenheimer",
    year: "2023",
    rating: "8.3",
    genre: "Drama",
    duration: "3h 0m",
    image: "https://image.tmdb.org/t/p/w780/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    description: "The story of J. Robert Oppenheimer and the immense scientific and ethical challenges of building the atomic bomb."
  },
  {
    id: 5,
    title: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    rating: "8.6",
    genre: "Animation",
    duration: "2h 20m",
    image: "https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    description: "Miles Morales travels across the Multiverse and meets a team of Spider-People tasked with protecting its existence."
  },
  {
    id: 6,
    title: "Interstellar",
    year: "2014",
    rating: "8.7",
    genre: "Sci-Fi",
    duration: "2h 49m",
    image: "https://image.tmdb.org/t/p/w780/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 101,
    title: "3 Idiots",
    year: "2009",
    rating: "8.4",
    genre: "Hindi",
    duration: "2h 50m",
    image: "https://image.tmdb.org/t/p/w780/66Aajw9WnQXyVjSg8uL9gH6uQfX.jpg",
    description: "Three engineering students follow their dreams while questioning the pressure of India's competitive education system."
  },
  {
    id: 102,
    title: "Dangal",
    year: "2016",
    rating: "8.3",
    genre: "Hindi",
    duration: "2h 41m",
    image: "https://image.tmdb.org/t/p/w780/z6pQvKz1G2nZP0wA9nRrG5uF2kB.jpg",
    description: "A former wrestler trains his daughters to become professional wrestling champions."
  },
  {
    id: 103,
    title: "Gadar 2",
    year: "2023",
    rating: "6.4",
    genre: "Hindi",
    duration: "2h 50m",
    image: "https://placehold.co/780x440/151515/e50914/png?text=Gadar+2",
    description: "Tara Singh returns to Pakistan to rescue his imprisoned son during a dangerous conflict."
  },
  {
    id: 104,
    title: "Jawan",
    year: "2023",
    rating: "7.0",
    genre: "Hindi",
    duration: "2h 49m",
    image: "https://placehold.co/780x440/151515/e50914/png?text=Jawan",
    description: "A man embarks on a mission to correct social wrongs and protect the common people."
  },
  {
    id: 105,
    title: "K.G.F: Chapter 2",
    year: "2022",
    rating: "8.2",
    genre: "Hindi",
    duration: "2h 48m",
    image: "https://placehold.co/780x440/151515/e50914/png?text=KGF+Chapter+2",
    description: "Rocky rises to the top of the Kolar Gold Fields while powerful enemies unite against him."
  },
  {
    id: 106,
    title: "Pathaan",
    year: "2023",
    rating: "6.6",
    genre: "Hindi",
    duration: "2h 26m",
    image: "https://placehold.co/780x440/151515/e50914/png?text=Pathaan",
    description: "An Indian agent races across the world to stop a deadly terrorist plot."
  }
];

function Icon({ name, size = 20 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    play: <path d="m8 5 11 7-11 7Z" fill="currentColor" />,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z" fill="currentColor" />
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function App() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [selected, setSelected] = useState(null);
  const [liveMovies, setLiveMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [catalogError, setCatalogError] = useState("");

  React.useEffect(() => {
    const handleTvKeys = (event) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter"].includes(event.key)) return;

      const candidates = [...document.querySelectorAll(
        "button:not(:disabled), input:not(:disabled)"
      )].filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      if (!candidates.length) return;

      const active = document.activeElement;
      const currentIndex = candidates.indexOf(active);
      if (event.key === "Enter") return;

      event.preventDefault();
      if (currentIndex < 0) {
        candidates[0]?.focus();
        return;
      }

      const current = candidates[currentIndex].getBoundingClientRect();
      let next = candidates[currentIndex];
      let bestDistance = Number.POSITIVE_INFINITY;

      candidates.forEach((candidate, index) => {
        if (index === currentIndex) return;
        const rect = candidate.getBoundingClientRect();
        let valid = false;

        if (event.key === "ArrowRight") valid = rect.left > current.left;
        if (event.key === "ArrowLeft") valid = rect.right < current.right;
        if (event.key === "ArrowDown") valid = rect.top > current.top;
        if (event.key === "ArrowUp") valid = rect.bottom < current.bottom;

        if (!valid) return;
        const dx = rect.left + rect.width / 2 - (current.left + current.width / 2);
        const dy = rect.top + rect.height / 2 - (current.top + current.height / 2);
        const distance = dx * dx + dy * dy;
        if (distance < bestDistance) {
          bestDistance = distance;
          next = candidate;
        }
      });
      next.focus();
    };

    window.addEventListener("keydown", handleTvKeys);
    return () => window.removeEventListener("keydown", handleTvKeys);
  }, []);

  React.useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    if (!apiKey) return;

    const loadMovies = async () => {
      setIsLoading(true);
      setCatalogError("");
      try {
        const hindiPages = await Promise.all([1, 2, 3].map(async (page) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${encodeURIComponent(apiKey)}&language=hi-IN&region=IN&with_original_language=hi&sort_by=popularity.desc&page=${page}`
          );
          if (!response.ok) throw new Error(`TMDB returned ${response.status}`);
          return response.json();
        }));
        const popularPages = await Promise.all([1, 2].map(async (page) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${encodeURIComponent(apiKey)}&language=en-US&region=IN&page=${page}`
          );
          if (!response.ok) throw new Error(`TMDB returned ${response.status}`);
          return response.json();
        }));

        const genreNames = {
          28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
          80: "Crime", 18: "Drama", 14: "Fantasy", 27: "Horror",
          878: "Sci-Fi", 53: "Thriller"
        };
        const catalog = [...hindiPages, ...popularPages].flatMap((page) => page.results || [])
          .filter((movie, index, list) => list.findIndex((item) => item.id === movie.id) === index)
          .map((movie) => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
          rating: Number(movie.vote_average || 0).toFixed(1),
          genre: movie.original_language === "hi"
            ? "Hindi"
            : movie.genre_ids?.map((id) => genreNames[id]).find(Boolean) || "Movie",
          duration: "View details",
          image: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
            : movie.poster_path
              ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
              : "https://placehold.co/780x440/111111/ffffff/png?text=Rockflix",
          description: movie.overview || "No description available."
        }));
        setLiveMovies(catalog);
      } catch {
        setCatalogError("Live TMDB catalog could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  const catalog = liveMovies.length ? liveMovies : movies;
  const genres = ["All", ...new Set(catalog.map((movie) => movie.genre))];
  const filtered = useMemo(() => catalog.filter((movie) => {
    const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (genre === "All" || movie.genre === genre);
  }), [catalog, query, genre]);

  return (
    <div className="app">
      <header className="nav">
        <button className="brand" onClick={() => { setQuery(""); setGenre("All"); }}>ROCKFLIX</button>
        <nav className="nav-links" aria-label="Main navigation">
          <button className="active">Home</button>
          <button onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>Movies</button>
        </nav>
        <label className="search">
          <Icon name="search" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies"
            aria-label="Search movies"
          />
        </label>
      </header>

      <main>
        <section className="hero" style={{ "--hero": `url('${movies[0].image}')` }}>
          <div className="hero-content">
            <span className="eyebrow">ROCKFLIX ORIGINAL</span>
            <h1>DUNE <span>PART TWO</span></h1>
            <div className="meta">
              <strong><Icon name="star" size={16} /> 8.7</strong>
              <span>2024</span>
              <span>16+</span>
              <span>2h 46m</span>
            </div>
            <p>{movies[0].description}</p>
            <div className="hero-actions">
              <button className="primary" onClick={() => setSelected(movies[0])}><Icon name="play" size={18} /> Play</button>
              <button className="secondary" onClick={() => setSelected(movies[0])}><Icon name="plus" size={18} /> My List</button>
            </div>
          </div>
        </section>

        <section className="catalog" id="catalog">
          <div className="section-heading">
            <h2>Popular Movies</h2>
            <div className="filters" aria-label="Filter by genre">
              {genres.map((item) => (
                <button key={item} className={genre === item ? "selected" : ""} onClick={() => setGenre(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="empty">
              <h3>Loading movies...</h3>
            </div>
          ) : catalogError ? (
            <div className="empty">
              <h3>TMDB catalog unavailable</h3>
              <p>{catalogError}</p>
            </div>
          ) : filtered.length ? (
            <div className="movie-grid">
              {filtered.map((movie) => (
                <button className="movie-card" key={movie.id} onClick={() => setSelected(movie)}>
                  <img src={movie.image} alt="" />
                  <div className="card-shade" />
                  <div className="card-info">
                    <h3>{movie.title}</h3>
                    <div><span>{movie.year}</span><span>{movie.genre}</span><strong><Icon name="star" size={13} /> {movie.rating}</strong></div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>No movies found</h3>
              <p>Try another title or genre.</p>
            </div>
          )}
        </section>
      </main>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <article className="modal" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={(event) => event.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)} aria-label="Close details"><Icon name="close" /></button>
            <img src={selected.image} alt={selected.title} />
            <div className="modal-info">
              <span className="eyebrow">{selected.genre}</span>
              <h2>{selected.title}</h2>
              <div className="meta">
                <strong><Icon name="star" size={16} /> {selected.rating}</strong>
                <span>{selected.year}</span>
                <span>{selected.duration}</span>
              </div>
              <p>{selected.description}</p>
              <button className="primary"><Icon name="play" size={18} /> Play Now</button>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
