import createElement from "./utils/createElement.js";
import Watchlist from "./components/Watchlist.js";
import Browse from "./components/Browse.js";
import Nav from "./components/Nav.js";

let currentView = "browse";

export default function App() {
  const header = createElement("h1", {
    textContent: "Movie Night Companion",
    className: "app-title"
  });

  const navContainer = createElement("div");
  const main = createElement("main");

  function render() {
    navContainer.replaceChildren(
      Nav(navigate, currentView)
    );

    main.replaceChildren(
      currentView === "watchlist"
        ? Watchlist()
        : Browse()
    );
  }

  function navigate(view) {
    currentView = view;
    render();
  }

  render();

  return createElement(
    "div",
    { className: "app" },
    header,
    navContainer,
    main
  );
}