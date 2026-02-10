import createElement from "./utils/createElement.js";
import Watchlist from "./components/Watchlist.js";
import Browse from "./components/Browse.js";
import Nav from "./components/Nav.js";
import MovieDetails from "./components/MovieDetails.js";

let appState = {
  view: "browse",
  selectedMovieId: null
};

export default function App() {
  const header = createElement("h1", {
    textContent: "Movie Night Companion",
    className: "app-title"
  });

  const navContainer = createElement("div");
  const main = createElement("main");

  function setAppState(newState) {
    appState = { ...appState, ...newState };
    render();
  }

  function navigate(view) {
    setAppState({ view });
  }

  function render() {
  navContainer.replaceChildren(
    Nav(navigate, appState.view)
  );

  if (appState.view === "details") {
    main.replaceChildren(
      MovieDetails(appState.selectedMovieId, setAppState)
    );
  } else if (appState.view === "watchlist") {
    main.replaceChildren(
      Watchlist(setAppState)
    );
  } else {
    // default: browse
    main.replaceChildren(
      Browse(setAppState)
    );
  }
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