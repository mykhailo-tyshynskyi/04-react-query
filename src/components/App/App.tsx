import { useState, useEffect } from "react";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster, toast } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
function App() {

const [currentPage, setCurrentPage] = useState(1);
const [query, setQuery] = useState("")
const {data, isLoading,isError,isSuccess} = useQuery({
  queryKey:['title', query, currentPage],
  queryFn: ()=>fetchMovies(query,currentPage),
  enabled: query.trim()!=="",
  placeholderData: keepPreviousData,
})

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

useEffect(() => {
  if (data && data.results.length === 0) {
    toast.error("No movies found for your request.");
  }
}, [data]);

const totalPages = data?.total_pages ?? 0;

  const handleSearch = (query: string) => {
    setQuery(query)
    setCurrentPage(1)
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
   {isSuccess && totalPages>1 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}/>}
      {isSuccess && (
        <MovieGrid onSelect={handleMovieSelection} movies={data.results??[]} />
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
