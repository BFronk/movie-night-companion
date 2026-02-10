import createElement from "./utils/createElement.js";
import Watchlist from "./components/Watchlist.js";

export default function App() {
  const header = createElement("h1", {
    textContent: "My Watchlist",
    className: "app-title"
  });

  const main = createElement(
    "main",
    { className: "main-content" },
    Watchlist()
  );

  return createElement("div", { className: "app" }, header, main);
}

