import { Container, Alert } from "@mantine/core";

/**
 * 404 page
 * @returns
 */
export default function NotFound() {
  return (
    <Container>
      <Alert>Movie not found. Please try again.</Alert>
    </Container>
  );
}
