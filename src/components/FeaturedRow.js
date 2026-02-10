import createElement from "../utils/createElement.js";
import { addToWatchlist } from "../services/watchlist.js";

export default function FeaturedRow(movies = []) {
  if (!movies.length) return null;

  const row = createElement("div", {
    className: "featured-row"
  });

  movies.slice(0, 6).forEach(movie => {
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";

    const card = createElement(
      "div",
      { className: "featured-card" },
      createElement("img", {
        src: imageUrl,
        alt: movie.title
      }),
      createElement(
        "div",
        { className: "featured-info" },
        createElement("h3", { textContent: movie.title }),
        createElement("p", {
          textContent: `⭐ ${movie.vote_average}`
        }),
        createElement(
          "button",
          {
            className: "watchlist-btn",
            onclick: () =>
              addToWatchlist({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average
              })
          },
          "Add to Watchlist"
        )
      )
    );

    row.append(card);
  });

  return row;
}