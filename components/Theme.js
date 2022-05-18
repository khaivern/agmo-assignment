import { createTheme } from "@mui/material";

const agmoLightBlue = "#bcd4e6";
const agmoMainBlue = "#1976d2";

const theme = createTheme({
  palette: {
    common: {
      lightBlue: agmoLightBlue,
      mainBlue: agmoMainBlue,
    },
  },
  typography: {
    fontFamily: "Roboto Flex",
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#000",
          fontSize: "1rem",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "#000",
          fontWeight: 300,
        },
        underline: {
          "&:before": {
            borderBottom: `1px solid #ccc`,
          },
          "&&:hover:before": {
            borderBottom: `1px solid #ccc`,
          },
        },
      },
    },
  },
});

export default theme;
