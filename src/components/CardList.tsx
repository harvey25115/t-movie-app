import { Card, Title, List } from "@mantine/core";
import useStyles from "../util/useStyles";

// component props type
type CardListI = {
  title: string;
  listItems: React.ReactNode[];
  icon?: React.ReactNode;
};

/**
 *
 * @param param0
 * @returns
 */
export default function CardList({ title, listItems, icon }: CardListI) {
  const { classes } = useStyles();

  return (
    <Card m="md" className={classes.centerMQ}>
      <Title order={3} mb="xl">
        {title}
      </Title>
      <List spacing="xs" size="sm" center icon={icon}>
        {listItems}
      </List>
    </Card>
  );
}
