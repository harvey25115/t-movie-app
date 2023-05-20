import {
  MantineProvider,
  TextInput,
  Group,
  Grid,
  ActionIcon,
} from "@mantine/core";
import { Outlet, Link, Form, useSearchParams } from "react-router-dom";
import { MdSearch, MdHome } from "react-icons/md";
import useStyles from "../util/useStyles";

/**
 * Displays the main layout and handles the theming
 * @returns React.ReactNode
 */
export default function Layout() {
  const { classes } = useStyles();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        colors: {
          // override dark colors to change them for all components
          dark: ["#fff"],
        },
        breakpoints: {
          sm1: "33em",
        },
      }}
    >
      <Grid gutter={0} mb="xl">
        <Grid.Col span={12}>
          {/* search bar */}
          <Group align="center" position="center" spacing="xl" my="lg">
            <ActionIcon
              component={Link}
              to="/"
              reloadDocument
              size="xl"
              variant="transparent"
            >
              <MdHome size="2rem" />
            </ActionIcon>
            <Form
              reloadDocument
              role="search"
              className={classes.searchInputWidth}
            >
              <TextInput
                placeholder="Search"
                icon={<MdSearch />}
                size="md"
                name="q"
                defaultValue={query}
                required
                styles={{
                  input: {
                    border: "none",
                  },
                }}
                radius="xl"
              />
            </Form>
          </Group>
        </Grid.Col>
        {/* outlet for child components */}
        <Outlet />
      </Grid>
    </MantineProvider>
  );
}
