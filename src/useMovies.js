import { useState, useEffect } from "react";

const KEY = "e3bfa9d9";

export function useMoviies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      //   callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          // console.log(res);
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          // console.log(data);
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");

          // console.log(data.Search);
          /////////////
        } catch (err) {
          if (err.name !== "AborError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      // handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
