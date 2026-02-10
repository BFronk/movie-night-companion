import createElement from "../utils/createElement.js";
import MovieCard from "./MovieCard.js";
import Loading from "./Loading.js";
import { getWatchlist } from "../services/watchlist.js";
import {
  getPopularMovies,
  searchMovies
} from "../services/tmdb.js";
import {
  getBrowseState,
  setBrowseState
} from "../services/browseState.js";

export default function Browse() {
  const container = createElement("div");

  const { mode, query } = getBrowseState();

  const searchInput = createElement("input", {
    type: "search",
    placeholder: "Search movies...",
    className: "search-input",
    value: query
  });

  const resultsContainer = createElement("div", {
    className: "main-content"
  });

  container.append(searchInput, resultsContainer);

  function renderMovies(promise) {
    resultsContainer.replaceChildren(
    Loading("Fetching movies…")
    );

    promise
        .then(movies => {
            const watchlistIds = new Set(
                getWatchlist().map(movie => movie.id)
            );

            const filteredMovies = movies.filter(
                movie => !watchlistIds.has(movie.id)
            );

            if (filteredMovies.length === 0) {
                resultsContainer.replaceChildren(
                createElement("p", {
                    textContent: "All results are already in your watchlist.",
                    className: "empty-state"
                })
                );
                return;
            }

            resultsContainer.replaceChildren(
                ...filteredMovies.map(movie => MovieCard(movie))
            );
      })
      .catch(() => {
        resultsContainer.replaceChildren(
            createElement("p", {
                textContent: "Could not load movies. Please try again.",
                className: "empty-state"
            })
        );
      });
  }

  // Initial load: popular movies
  if (mode === "search" && query) {
  renderMovies(searchMovies(query));
} else {
  renderMovies(getPopularMovies());
}

  searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const value = searchInput.value.trim();

    if (value) {
      setBrowseState({ mode: "search", query: value });
      renderMovies(searchMovies(value));
    } else {
      setBrowseState({ mode: "popular", query: "" });
      renderMovies(getPopularMovies());
    }
  }
});

  return container;
}