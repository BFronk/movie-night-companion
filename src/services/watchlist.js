const STORAGE_KEY = "watchlist";

export function getWatchlist() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function addToWatchlist(movie) {
  const watchlist = getWatchlist();

  // prevent duplicates
  const exists = watchlist.some(item => item.id === movie.id);
  if (exists) return;

  watchlist.push(movie);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
}