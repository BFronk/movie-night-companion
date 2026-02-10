const STORAGE_KEY = "watchlist";

export function getWatchlist() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addToWatchlist(movie) {
  const watchlist = getWatchlist();

  // prevent duplicates
  if (watchlist.some(item => item.id === movie.id)) return;

  watchlist.push(movie);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
}

export function removeFromWatchlist(movieId) {
  const watchlist = getWatchlist().filter(
    movie => movie.id !== movieId
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
}