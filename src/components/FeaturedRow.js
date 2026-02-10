import createElement from "../utils/createElement.js";
export default function FeaturedRow(cards = []) {
  if (!cards.length) return null;

  const row = createElement("div", {
    className: "featured-row"
  });

  cards.forEach(card => row.append(card));

  return row;
}