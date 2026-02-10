const STORAGE_KEY = "browse-state";

export function getBrowseState() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data
    ? JSON.parse(data)
    : { mode: "popular", query: "" };
}

export function setBrowseState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearBrowseState() {
  localStorage.removeItem(STORAGE_KEY);
}