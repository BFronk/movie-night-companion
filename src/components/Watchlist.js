import createElement from "../utils/createElement.js";
import MovieCard from "./MovieCard.js";
import { getWatchlist } from "../services/watchlist.js";

export default function Watchlist() {
  const movies = getWatchlist();

  if (movies.length === 0) {
        return createElement("p", {
    textContent: "Your watchlist is empty. Start browsing movies!",
    className: "empty-state"
    });
  }

  return createElement(
    "div",
    { className: "main-content" },
    ...movies.map(movie => MovieCard(movie, { removable: true }))
  );
}