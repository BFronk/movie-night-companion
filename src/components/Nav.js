import createElement from "../utils/createElement.js";
import { getWatchlist } from "../services/watchlist.js";

export default function Nav(onNavigate, currentView) {
  const count = getWatchlist().length;

  const browseBtn = createElement("button", {
    textContent: "Browse Movies",
    className:
      currentView === "browse" ? "nav-btn active" : "nav-btn"
  });

  const watchlistBtn = createElement(
    "button",
    {
      className:
        currentView === "watchlist"
          ? "nav-btn active"
          : "nav-btn"
    },
    "My Watchlist",
    count > 0
      ? createElement(
          "span",
          { className: "nav-badge" },
          count.toString()
        )
      : null
  );

  browseBtn.addEventListener("click", () =>
    onNavigate("browse")
  );
  watchlistBtn.addEventListener("click", () =>
    onNavigate("watchlist")
  );

  return createElement(
    "nav",
    { className: "nav" },
    browseBtn,
    watchlistBtn
  );
}