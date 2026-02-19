const STORAGE_KEY = "browseState";

export function getBrowseState() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    mode: "popular",
    query: "",
    genreId: null,
    viewMode: "grid"   
  };
}

export function setBrowseState(updates) {
  const current = getBrowseState();

  const newState = {
    ...current,
    ...updates
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
}