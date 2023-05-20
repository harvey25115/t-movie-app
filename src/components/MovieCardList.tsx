import { SimpleGrid, Alert, Text } from "@mantine/core";
import { useAsyncValue, useSearchParams } from "react-router-dom";
import type { Movie, SearchResult } from "../pages/MovieList/MovieList";
import MovieCard from "./MovieCard";
import { useState } from "react";

export default function MovieCardList() {
  const { Search } = useAsyncValue() as SearchResult;
  const [result] = useState(Search);

  // generate message
  const [searchParams] = useSearchParams();
  let message = "You can search movies by title!";
  if (searchParams.get("q")) {
    message = "No movies found. Please try again.";
  }
  // generate list of movies
  let movieList: React.ReactNode[] = [];
  if (result && result.length) {
    movieList = result.map((movie: Movie) => {
      return <MovieCard movie={movie} key={movie.imdbID}></MovieCard>;
    });
  }
  return (
    <>
      {movieList.length ? (
        <>
          <SimpleGrid
            cols={5}
            spacing="xl"
            breakpoints={[
              { maxWidth: "lg", cols: 4, spacing: "lg" },
              { maxWidth: "md", cols: 3, spacing: "md" },
              { maxWidth: "sm", cols: 3, spacing: "sm" },
              { maxWidth: "xs", cols: 2, spacing: "xs" },
            ]}
          >
            {movieList}
          </SimpleGrid>
          <Alert mt="xl" variant="outline">
            Cannot find what you are looking for? Try to narrow down your
            search.
          </Alert>
        </>
      ) : (
        <Alert>
          <Text align="center">{message}</Text>
        </Alert>
      )}
    </>
  );
}
