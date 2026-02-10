export default function App() {
  const container = document.createElement("div");
  const heading = document.createElement("h1");

  heading.textContent = "Movie Night Companion is working 🚀";
  container.append(heading);

  return container;
}