import createElement from "../utils/createElement.js";
import MovieCard from "./MovieCard.js";
import Loading from "./Loading.js";
import FeaturedRow from "./FeaturedRow.js";
import { getWatchlist } from "../services/watchlist.js";
import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre
} from "../services/tmdb.js";
import {
  getBrowseState,
  setBrowseState
} from "../services/browseState.js";

let searchTimeout;

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation (Kids)" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" }
];

export default function Browse(setAppState) {
  const container = createElement("div");

  const { mode, query, genreId } = getBrowseState();

  /* ---------- Controls ---------- */

  const popularBtn = createElement("button", {
    textContent: "Popular",
    className: "browse-btn"
  });

  const genreSelect = createElement("select", {
    className: "genre-select"
  });

  genreSelect.append(
    createElement("option", { value: "" }, "Browse by Genre")
  );

  GENRES.forEach(genre => {
    genreSelect.append(
      createElement("option", { value: genre.id }, genre.name)
    );
  });

  const searchInput = createElement("input", {
    type: "search",
    placeholder: "Search movies...",
    className: "search-input",
    value: query
  });

  const controls = createElement(
    "div",
    { className: "browse-controls" },
    popularBtn,
    genreSelect,
    searchInput
  );

  /* ---------- Containers ---------- */

  const featuredContainer = createElement("div", {
    className: "featured-wrapper"
  });

  const resultsContainer = createElement("div", {
    className: "main-content"
  });

  container.append(controls, featuredContainer, resultsContainer);

  /* ---------- Render Logic ---------- */

  async function renderMovies(fetchFn) {
    const { mode } = getBrowseState();
    const scrollY = window.scrollY;

    featuredContainer.innerHTML = "";
    resultsContainer.innerHTML = "";
    resultsContainer.append(Loading());

    const movies = await fetchFn();
    const watchlistIds = new Set(getWatchlist().map(m => m.id));

    let featuredMovies = [];

    if (mode !== "search") {
        if (mode === "popular") {
            featuredMovies = movies
            .filter(movie => !watchlistIds.has(movie.id))
            .slice(0, 6);
        }

        if (mode === "category") {
            featuredMovies = movies
            .filter(movie => !watchlistIds.has(movie.id))
            .slice(0, 4);
        }
    }

    const featuredIds = new Set(featuredMovies.map(m => m.id));

    if (featuredMovies.length) {
      const featuredCards = featuredMovies.map(movie =>
        MovieCard(movie, setAppState)
        );
        featuredContainer.append(
        createElement("div", { className: "featured-label" }, "Featured")
        );
        featuredContainer.append(FeaturedRow(featuredCards));
    }

    resultsContainer.innerHTML = "";

    movies
      .filter(
        movie =>
          !watchlistIds.has(movie.id) &&
          !featuredIds.has(movie.id)
      )
      .forEach(movie => {
        resultsContainer.append(MovieCard(movie, setAppState));
      });

    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY });
    });
  }

  /* ---------- Events ---------- */

  popularBtn.addEventListener("click", () => {
    setBrowseState({ mode: "popular", query: "", genreId: null });
    searchInput.value = "";
    renderMovies(getPopularMovies);
  });

  genreSelect.addEventListener("change", () => {
    const selectedGenre = genreSelect.value;
    if (!selectedGenre) return;

    setBrowseState({
      mode: "category",
      query: "",
      genreId: selectedGenre
    });

    searchInput.value = "";
    renderMovies(() => getMoviesByGenre(selectedGenre));
  });

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim();
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      if (!value) {
        setBrowseState({ mode: "popular", query: "", genreId: null });
        renderMovies(getPopularMovies);
        return;
      }

      setBrowseState({ mode: "search", query: value, genreId: null });
      renderMovies(() => searchMovies(value));
    }, 350);
  });

  /* ---------- Restore State ---------- */

  if (mode === "search" && query) {
    renderMovies(() => searchMovies(query));
  } else if (mode === "category" && genreId) {
    genreSelect.value = genreId;
    renderMovies(() => getMoviesByGenre(genreId));
  } else {
    renderMovies(getPopularMovies);
  }

  return container;
}