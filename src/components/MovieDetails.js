import createElement from "../utils/createElement.js";
import Loading from "./Loading.js";
import { getMovieDetails } from "../services/tmdb.js";
import { addToWatchlist, getWatchlist } from "../services/watchlist.js";
import { rerenderApp } from "../utils/rerender.js";

export default function MovieDetails(movieId, setAppState) {
  const container = createElement("div", { className: "movie-details" });

  container.append(Loading());

  getMovieDetails(movieId).then(movie => {
    container.innerHTML = "";

    /* ---------- Back Button ---------- */
    const backBtn = createElement(
      "button",
      {
        className: "back-btn",
        onclick: () => setAppState({ view: "browse", selectedMovieId: null })
      },
      "← Back to Browse"
    );

    /* ---------- Poster ---------- */
    const poster = createElement("img", {
      src: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      alt: movie.title
    });

    const posterWrapper = createElement(
      "div",
      { className: "details-poster-wrapper" },
      poster
    );

    /* ---------- Text ---------- */
    const title = createElement("h2", {
      textContent: movie.title,
      className: "details-title"
    });

    const meta = createElement("p", {
      textContent: `${movie.release_date?.slice(0, 4)} • ${movie.runtime} min • ⭐ ${movie.vote_average}`,
      className: "details-meta"
    });

    const overview = createElement("p", {
      textContent: movie.overview,
      className: "details-overview"
    });

    const cast = movie.credits?.cast
      ?.slice(0, 5)
      .map(actor => actor.name)
      .join(", ");

    const castEl = createElement("p", {
      textContent: cast ? `Cast: ${cast}` : ""
    });

    /* ---------- Watchlist Button ---------- */
    const inWatchlist = getWatchlist().some(m => m.id === movie.id);

    const watchlistBtn = createElement(
      "button",
      {
        className: "watchlist-btn",
        disabled: inWatchlist,
        onclick: () => {
          addToWatchlist(movie);
          rerenderApp();
        }
      },
      inWatchlist ? "✓ In Watchlist" : "Add to Watchlist"
    );

    /* ---------- Layout ---------- */
    const content = createElement(
      "div",
      { className: "details-content" },
      posterWrapper,
      title,
      meta,
      overview,
      castEl,
      watchlistBtn
    );

    container.append(
      createElement(
        "div",
        { className: "details-view" },
        backBtn,
        content
      )
    );
  });

  return container;
}