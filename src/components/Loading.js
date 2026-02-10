import createElement from "../utils/createElement.js";

export default function Loading(message = "Loading...") {
  return createElement("p", {
    textContent: message,
    className: "loading"
  });
}