import { useState } from "react";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster, toast } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setIsError(false);
    setMovies([]);
    try {
      const resData: Movie[] = await fetchMovies(query);
      if (resData.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(resData);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieSelection = (movie: Movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  };
  return (
    <div className={css.app}>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid onSelect={handleMovieSelection} movies={movies} />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMovie(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
