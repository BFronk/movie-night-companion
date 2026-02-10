import createElement from "../utils/createElement.js";
import {
  addToWatchlist,
  removeFromWatchlist
} from "../services/watchlist.js";

export default function MovieCard(movie, options = {}) {
  const poster = createElement("img", {
    src: movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "",
    alt: movie.title,
    className: "movie-poster"
  });

  const title = createElement("h2", {
    textContent: movie.title,
    className: "movie-title"
  });

  const rating = createElement("p", {
    textContent: `⭐ ${movie.vote_average}`,
    className: "movie-rating"
  });

  const button = createElement("button", {
    className: "watchlist-btn"
  });

  let card;

  if (options.removable) {
    button.textContent = "Remove from Watchlist";
    button.addEventListener("click", () => {
      removeFromWatchlist(movie.id);
      card.remove();
    });
  } else {
    button.textContent = "Add to Watchlist";
    button.addEventListener("click", () => {
      addToWatchlist(movie);
      button.textContent = "Added ✓";
      button.disabled = true;
    });
  }

  card = createElement(
    "div",
    { className: "movie-card" },
    poster,
    title,
    rating,
    button
  );

  return card;
}