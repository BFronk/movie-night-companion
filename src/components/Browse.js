import createElement from "../utils/createElement.js";
import MovieCard from "./MovieCard.js";
import Loading from "./Loading.js";
import { getWatchlist } from "../services/watchlist.js";
import {
  getPopularMovies,
  searchMovies
} from "../services/tmdb.js";

export default function Browse() {
  const container = createElement("div");

  const searchInput = createElement("input", {
    type: "search",
    placeholder: "Search movies...",
    className: "search-input"
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
  renderMovies(getPopularMovies());

  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        renderMovies(searchMovies(query));
      } else {
        renderMovies(getPopularMovies());
      }
    }
  });

  return container;
}