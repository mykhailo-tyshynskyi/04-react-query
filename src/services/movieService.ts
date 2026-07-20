import type { Movie } from "../types/movie";
import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_TOKEN;

interface SearchResponse{
  results: Movie[]
}

async function fetchMovies(query: string): Promise<Movie[]> {

        const response = await axios.get<SearchResponse>(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            query: query,
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );
      const movieData: Movie[] = response.data.results;

      return movieData;
   
  }
  

export default fetchMovies;
