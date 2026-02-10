import createElement from "../utils/createElement.js";
import MovieCard from "./MovieCard.js";
import Loading from "./Loading.js";
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

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" }
];

export default function Browse() {
  const container = createElement("div");

  const { mode, query, genreId } = getBrowseState();

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

  const resultsContainer = createElement("div", {
    className: "main-content"
  });
  async function renderMovies(fetchFn) {
  resultsContainer.innerHTML = "";
  resultsContainer.append(Loading());

  const movies = await fetchFn();
  const watchlist = getWatchlist();

  const watchlistIds = new Set(watchlist.map(m => m.id));

  resultsContainer.innerHTML = "";

  movies
    .filter(movie => !watchlistIds.has(movie.id))
    .forEach(movie => {
      resultsContainer.append(MovieCard(movie));
    });
}
  // 🔴 EVENT LISTENERS COME AFTER DECLARATION

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

  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const value = searchInput.value.trim();

      if (value) {
        setBrowseState({ mode: "search", query: value, genreId: null });
        renderMovies(() => searchMovies(value));
      } else {
        setBrowseState({ mode: "popular", query: "", genreId: null });
        renderMovies(getPopularMovies);
      }
    }
  });

  container.append(
    popularBtn,
    genreSelect,
    searchInput,
    resultsContainer
  );

  // 🔵 RESTORE STATE
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