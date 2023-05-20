import { createStyles } from "@mantine/core";

// common styling
const useStyles = createStyles((theme) => ({
  centerMQ: {
    [theme.fn.smallerThan("sm")]: {
      textAlign: "center",
    },
  },
  searchInputWidth: {
    width: "60%",
  },
  imagePad: {
    [theme.fn.smallerThan("xs")]: {
      padding: "0 18%",
    },
  },
}));

export default useStyles;
