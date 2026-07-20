import type { Movie } from "../types/movie";
import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_TOKEN;

interface SearchResponse {
  results: Movie[];
  total_pages: number;
}

async function fetchMovies(query: string, page: number): Promise<SearchResponse> {
  const response = await axios.get<SearchResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: query,
        page: page,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    },
  );
  const movieData: Movie[] = response.data.results;

  return {
    results: movieData,
    total_pages: response.data.total_pages
  }
}

export default fetchMovies;
