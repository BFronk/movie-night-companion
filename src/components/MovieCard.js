import createElement from "../utils/createElement.js";
import { addToWatchlist } from "../services/watchlist.js";

export default function MovieCard(movie) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "";

  const poster = createElement("img", {
    src: imageUrl,
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
    textContent: "Add to Watchlist",
    className: "watchlist-btn",
    "data-movie-id": movie.id
  });

    button.addEventListener("click", () => {
    addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average
    });

    button.textContent = "Added ✓";
    button.disabled = true;
    });

  return createElement(
    "div",
    { className: "movie-card" },
    poster,
    title,
    rating,
    button
  );
}