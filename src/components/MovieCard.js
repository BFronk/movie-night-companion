import createElement from "../utils/createElement.js";
import { rerenderApp } from "../utils/rerender.js";
import {
  addToWatchlist,
  removeFromWatchlist
} from "../services/watchlist.js";

export default function MovieCard(movie, setAppState, options = {}) {
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
    button.addEventListener("click", e => {
    e.stopPropagation();
    removeFromWatchlist(movie.id);
    card.remove();
    rerenderApp();
});
  } else {
    button.textContent = "Add to Watchlist";
    button.addEventListener("click", e => {
    e.stopPropagation();
    addToWatchlist(movie);
    rerenderApp();
});
  }

  card = createElement(
  "div",
  {
    className: "movie-card",
    onclick: () => {
        if (!setAppState) return;


      setAppState({
        view: "details",
        selectedMovieId: movie.id
      })
    }
  },
  poster,
  title,
  rating,
  button
);

  return card;
}