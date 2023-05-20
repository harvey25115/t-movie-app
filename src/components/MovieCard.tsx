import { Text, Card, Group, Image, Badge } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Movie } from "../pages/MovieList";

// component props type
type MovieCardI = {
  movie: Movie;
};

/**
 * Display the movie card information
 * @param param0
 * @returns React.ReactNode
 */
export default function MovieCard({ movie }: MovieCardI) {
  return (
    <Card component={Link} to={`/movie/${movie.imdbID}`} radius="md">
      <Card.Section>
        <Image
          src={movie.Poster}
          radius="md"
          alt={`${movie.Title} poster`}
          height={250}
          withPlaceholder
        />
      </Card.Section>
      <Card.Section>
        <Text truncate>{movie.Title}</Text>
        <Group position="apart">
          <Text size="xs" color="gray.5">
            {movie.Year}
          </Text>
          <Badge>{movie.Type}</Badge>
        </Group>
      </Card.Section>
    </Card>
  );
}
