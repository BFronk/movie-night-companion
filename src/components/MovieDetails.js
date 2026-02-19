import createElement from "../utils/createElement.js";
import Loading from "./Loading.js";
import MovieCard from "./MovieCard.js";
import { getOMDbData } from "../services/omdb.js";
import {
  getMovieDetails,
  getSimilarMovies
} from "../services/tmdb.js";
import {
  addToWatchlist,
  getWatchlist
} from "../services/watchlist.js";

export default function MovieDetails(movieId, setAppState) {
  const container = createElement("div", {
    className: "movie-details"
  });

  container.append(Loading());

  getMovieDetails(movieId).then(movie => {
    container.innerHTML = "";

    /* Back Button */
    const backBtn = createElement(
      "button",
      {
        className: "back-btn",
        onclick: () =>
          setAppState({
            view: "browse",
            selectedMovieId: null
          })
      },
      "← Back to Browse"
    );

    /* Poster */
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

    /* Text */
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

    /* Watchlist Button */
    const watchlistIds = new Set(
      getWatchlist().map(m => m.id)
    );

    const watchlistBtn = createElement(
      "button",
      {
        className: "watchlist-btn",
        disabled: watchlistIds.has(movie.id),
        onclick: () => {
          addToWatchlist(movie);
          watchlistBtn.textContent = "Added ✓";
          watchlistBtn.disabled = true;
        }
      },
      watchlistIds.has(movie.id)
        ? "In Watchlist"
        : "Add to Watchlist"
    );

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
    /* ---------- OMDb Extra Data ---------- */
    getOMDbData(movie.title, movie.release_date?.slice(0, 4))
        .then(extra => {
            if (!extra) return;

            const imdb = createElement("p", {
            className: "details-extra",
            textContent: `IMDb Rating: ${extra.imdbRating || "N/A"}`
            });

            const awards = createElement("p", {
            className: "details-extra",
            textContent: `Awards: ${extra.Awards || "N/A"}`
            });

            content.insertBefore(imdb, watchlistBtn);
            content.insertBefore(awards, watchlistBtn);
    });

    const detailsView = createElement(
      "div",
      { className: "details-view" },
      backBtn,
      content
    );

    container.append(detailsView);

    /* Related Movies */
    getSimilarMovies(movie.id).then(related => {
      if (!related.length) return;

      const filtered = related
        .filter(m => m.id !== movie.id)
        .slice(0, 10);

      if (!filtered.length) return;

      const carousel = createElement(
        "div",
        { className: "related-carousel fade-in" },
        ...filtered.map(m =>
          MovieCard(m, setAppState)
        )
      );

      const leftBtn = createElement(
        "button",
        { className: "carousel-btn left" },
        "‹"
      );

      const rightBtn = createElement(
        "button",
        { className: "carousel-btn right" },
        "›"
      );

      leftBtn.onclick = () =>
        carousel.scrollBy({
          left: -320,
          behavior: "smooth"
        });

      rightBtn.onclick = () =>
        carousel.scrollBy({
          left: 320,
          behavior: "smooth"
        });

      function updateButtons() {
        const {
          scrollLeft,
          scrollWidth,
          clientWidth
        } = carousel;

        if (scrollLeft <= 5) {
          leftBtn.style.opacity = "0";
          leftBtn.style.pointerEvents = "none";
        } else {
          leftBtn.style.opacity = "1";
          leftBtn.style.pointerEvents = "auto";
        }

        if (
          scrollLeft + clientWidth >=
          scrollWidth - 5
        ) {
          rightBtn.style.opacity = "0";
          rightBtn.style.pointerEvents = "none";
        } else {
          rightBtn.style.opacity = "1";
          rightBtn.style.pointerEvents = "auto";
        }
      }

      carousel.addEventListener(
        "scroll",
        updateButtons
      );

      setTimeout(updateButtons, 50);

      const wrapper = createElement(
        "div",
        { className: "carousel-wrapper" },
        leftBtn,
        carousel,
        rightBtn
      );

      const section = createElement(
        "section",
        {},
        createElement(
          "h3",
          { className: "related-title" },
          "Related Movies"
        ),
        wrapper
      );

      container.append(section);
    });
  });

  return container;
}