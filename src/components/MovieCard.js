// import createElement from "../utils/createElement.js";
// import { rerenderApp } from "../utils/rerender.js";
// import {
//   addToWatchlist,
//   removeFromWatchlist
// } from "../services/watchlist.js";

// export default function MovieCard(movie, setAppState, options = {}) {
//   const isList = options.viewMode === "list";

//   const poster = createElement("img", {
//     src: movie.poster_path
//       ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
//       : "",
//     alt: movie.title,
//     className: "movie-poster"
//   });

//   const title = createElement("h2", {
//     textContent: movie.title,
//     className: "movie-title"
//   });

//   const rating = createElement("span", {
//     textContent: `⭐ ${movie.vote_average}`,
//     className: "movie-rating"
//   });

//   const titleRow = createElement(
//     "div",
//     { className: "movie-title-row" },
//     title,
//     rating
//   );

//   let overviewPreview = null;

//   if (isList && movie.overview) {
//     overviewPreview = createElement("p", {
//       textContent: movie.overview.slice(0, 140) + "...",
//       className: "movie-overview-preview"
//     });
//   }

//   const textColumn = createElement(
//     "div",
//     { className: "movie-details-text" },
//     titleRow,
//     overviewPreview
//   );

//   const button = createElement("button", {
//     className: "watchlist-btn"
//   });

//   if (options.removable) {
//     button.textContent = "Remove from Watchlist";
//     button.onclick = e => {
//       e.stopPropagation();
//       removeFromWatchlist(movie.id);
//       rerenderApp();
//     };
//   } else {
//     button.textContent = "Add to Watchlist";
//     button.onclick = e => {
//       e.stopPropagation();
//       addToWatchlist(movie);
//       rerenderApp();
//     };
//   }

//   const card = createElement(
//     "div",
//     {
//       className: `movie-card ${isList ? "list-card" : ""}`,
//       onclick: () => {
//         if (!setAppState) return;
//         setAppState({
//           view: "details",
//           selectedMovieId: movie.id
//         });
//       }
//     },
//     poster,
//     textColumn,
//     button
//   );

//   return card;
// }

import createElement from "../utils/createElement.js";
import { rerenderApp } from "../utils/rerender.js";
import {
  addToWatchlist,
  removeFromWatchlist
} from "../services/watchlist.js";

export default function MovieCard(movie, setAppState, options = {}) {
  const isList = options.viewMode === "list";

  /* ---------- Poster ---------- */
  const poster = createElement("img", {
    src: movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "",
    alt: movie.title,
    className: "movie-poster"
  });

  /* ---------- Title ---------- */
  const title = createElement("h2", {
    textContent: movie.title,
    className: "movie-title"
  });

  /* ---------- Rating ---------- */
  const rating = createElement("span", {
    textContent: `⭐ ${movie.vote_average}`,
    className: "movie-rating"
  });

  const titleBar = createElement(
    "div",
    { className: "movie-title-bar" },
    title,
    rating
  );

  /* ---------- Overview (LIST ONLY) ---------- */
  let overview = null;

  if (isList && movie.overview) {
    overview = createElement("p", {
      textContent: movie.overview.slice(0, 160) + "...",
      className: "movie-overview"
    });
  }

  const textColumn = createElement(
    "div",
    { className: "movie-text-column" },
    titleBar,
    overview
  );

  /* ---------- Watchlist Button ---------- */
  const button = createElement("button", {
    className: "watchlist-btn"
  });

  if (options.removable) {
    button.textContent = "Remove from Watchlist";
    button.onclick = e => {
      e.stopPropagation();
      removeFromWatchlist(movie.id);
      rerenderApp();
    };
  } else {
    button.textContent = "Add to Watchlist";
    button.onclick = e => {
      e.stopPropagation();
      addToWatchlist(movie);
      rerenderApp();
    };
  }

  /* ---------- Card ---------- */
  const card = createElement(
    "div",
    {
      className: `movie-card ${isList ? "list-card" : ""}`,
      onclick: () => {
        if (!setAppState) return;
        setAppState({
          view: "details",
          selectedMovieId: movie.id
        });
      }
    },
    poster,
    textColumn,
    button
  );

  return card;
}