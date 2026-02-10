import App from "../app.js";

export function rerenderApp() {
  const root = document.getElementById("root");
  root.replaceChildren(App());
}