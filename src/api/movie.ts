/**
 * Calling API to get the movie details by ID
 * @param id
 * @returns data
 */
export async function getMovieByID(id?: string) {
  const API_URL = `${
    import.meta.env.VITE_API_URL + import.meta.env.VITE_API_KEY
  }`;
  const response = await fetch(`${API_URL}&i=${id}`);
  const data = await response.json();
  return data;
}

/**
 * Calling API to get the movie list by title
 * @param query
 * @returns Promise<data>
 */
export async function getMovieList(query?: string) {
  const API_URL = `${
    import.meta.env.VITE_API_URL + import.meta.env.VITE_API_KEY
  }`;
  const response = await fetch(`${API_URL}&s=${query}`);
  return response.json();
}
