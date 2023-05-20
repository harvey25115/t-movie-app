import {
  Grid,
  Image,
  Text,
  Group,
  Badge,
  Title,
  SimpleGrid,
  Button,
  Center,
  List,
  Container,
} from "@mantine/core";
import { MdFavoriteBorder, MdOpenInNew, MdStars } from "react-icons/md";
import { redirect, useLoaderData } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import CardList from "../components/CardList";
import useFavorites from "../util/useFavorites";
import useStyles from "../util/useStyles";
import { getMovieByID } from "../api/movie";

// data type
type Movie = {
  imdbID: string;
  Title: string;
  Genre: string;
  Actors: string;
  Ratings: { Source: string; Value: string }[];
  Runtime: string;
  Poster: string;
  Rated: string;
  Plot: string;
  Director: string;
  Website: string;
};

/**
 * Calling helper functions to get data
 * @param param0
 * @returns data
 */
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
  const data = await getMovieByID(params.id);
  // if no data found
  if (data.Response == "False") {
    return redirect("/not-found");
  }
  return data;
}

/**
 * Displays the detail of the movie
 * @returns React.ReactNode
 */
export default function MovieDetail() {
  const data = useLoaderData() as Movie;
  const { classes } = useStyles();

  // generate list of genres
  const genreList = getStringList(data.Genre).map((genre, idx) => {
    return <Badge key={`${genre + idx}`}>{genre}</Badge>;
  });

  // check if there is an official website
  const hasOfficialWebsite = data.Website && data.Website !== "N/A";

  // generate list of cast
  const castList = getStringList(data.Actors).map((actor, idx) => {
    return <List.Item key={`${actor + idx}`}>{actor}</List.Item>;
  });

  // generate list of ratings
  const ratingsList = data.Ratings.map((rating, idx) => {
    return (
      <List.Item
        key={`${rating.Source + idx}`}
      >{`${rating.Source}: ${rating.Value}`}</List.Item>
    );
  });

  // favorite event handler
  const { state, dispatch } = useFavorites();
  const isFavorite = state.favorites && state.favorites[data.imdbID];
  const handleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE", payload: { id: data.imdbID } });
    } else {
      dispatch({
        type: "ADD",
        payload: { favorite: { [data.imdbID]: data.Title } },
      });
    }
  };

  return (
    <>
      {/* movie detail */}
      <Grid.Col span={12} sm={9}>
        <Container px="xl">
          <Grid mt="xl" gutter="xl">
            <Grid.Col span={12} xs={4}>
              <Image
                src={data.Poster}
                radius="md"
                alt={`${data.Title} poster`}
                className={classes.imagePad}
              />

              <Center mt="xl">
                <Button
                  leftIcon={<MdFavoriteBorder />}
                  onClick={handleFavorite}
                  color={isFavorite ? "red" : ""}
                >
                  {isFavorite ? "Remove favorite" : "Add to favorite"}
                </Button>
              </Center>
            </Grid.Col>
            <Grid.Col span={12} xs={8}>
              <SimpleGrid spacing="sm">
                <Title order={1} mb="xl">
                  {data.Title}
                </Title>
                <Text>Runtime: {data.Runtime}</Text>
                <Text>Rated: {data.Rated}</Text>
                <Text italic>{data.Plot}</Text>
                <Text>Directed by: {data.Director}</Text>
                <Group>{genreList}</Group>
                {hasOfficialWebsite ? (
                  <Button
                    component="a"
                    // href={}
                    target="_blank"
                    leftIcon={<MdOpenInNew />}
                    variant="white"
                    mt="xl"
                  >
                    Official Website
                    {data.Website}
                  </Button>
                ) : null}
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        </Container>
      </Grid.Col>
      {/* casts and ratings */}
      <Grid.Col span={12} sm={3}>
        <CardList listItems={castList} title="Main Cast" />
        <CardList listItems={ratingsList} title="Ratings" icon={<MdStars />} />
      </Grid.Col>
    </>
  );
}

/**
 * Get splitted strings
 * @param string
 * @returns string[]
 */
function getStringList(string: string) {
  return string.split(", ");
}
