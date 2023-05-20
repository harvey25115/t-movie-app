import React from "react";
import {
  Card,
  Anchor,
  Grid,
  List,
  Title,
  Container,
  Loader,
  Center,
  Alert,
} from "@mantine/core";
import { MdStarRate } from "react-icons/md";
import { defer, Await, useLoaderData } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import MovieCardList from "../components/MovieCardList";
import useFavorites from "../util/useFavorites";
import useStyles from "../util/useStyles";
import { getMovieList } from "../api/movie";

// data type
export type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

export type SearchResult = {
  Search: Movie[];
};

type SearchResultPromise = {
  data: SearchResult;
};

/**
 * Calling helper functions to get data
 * @param param0
 * @returns data
 */
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  const data = getMovieList(query || "");
  return defer({ data });
}

/**
 * Displays the home page and list of movies
 * @returns React.ReactNode
 */
export default function MovieList() {
  const { data } = useLoaderData() as SearchResultPromise;
  const { classes } = useStyles();

  // getting favorites from storage
  const { state } = useFavorites();
  const favoriteList = [];
  if (state.favorites) {
    for (const id in state.favorites) {
      favoriteList.push(
        <List.Item key={id}>
          <Anchor href={`/movie/${id}`}>{state.favorites[id]}</Anchor>
        </List.Item>
      );
    }
  }

  return (
    <>
      {/* list of movies */}
      <Grid.Col span={12} sm={9}>
        <Container px="xl">
          <Title mb="xl" className={classes.centerMQ}>
            Movies
          </Title>
          {/* display loading indicator if the data is still on progress */}
          <React.Suspense
            fallback={
              <Center>
                <Loader variant="dots" />
              </Center>
            }
          >
            <Await
              resolve={data}
              errorElement={
                <Alert title="Server Error" color="red">
                  Error loading data. Please try again.
                </Alert>
              }
            >
              <MovieCardList />
            </Await>
          </React.Suspense>
        </Container>
      </Grid.Col>
      {/* list of favorite movies */}
      <Grid.Col span={12} sm={3}>
        <Card>
          <Title order={3} mb="xl" mt="xl" className={classes.centerMQ}>
            Favorites
          </Title>
          <List
            icon={<MdStarRate />}
            spacing="xs"
            size="sm"
            center
            className={classes.centerMQ}
          >
            {favoriteList.length ? favoriteList : "No favorites yet."}
          </List>
        </Card>
      </Grid.Col>
    </>
  );
}
