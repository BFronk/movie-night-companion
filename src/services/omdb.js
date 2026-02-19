export async function getOMDbData(title, year) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=58f5a41e`
    );

    const data = await response.json();

    if (data.Response === "False") {
      return null;
    }

    return data;
  } catch (error) {
    console.error("OMDb fetch error:", error);
    return null;
  }
}