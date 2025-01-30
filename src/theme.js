import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "dark", // Default to dark mode
    primary: {
      main: "#007FFF", // Modern blue
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF4081", // Pink accent
    },
    background: {
      default: "linear-gradient(to right, #37474F, #263238)", // Darker blue-gray gradient background
      paper: "#424242", // Darker card background
    },
    text: {
      primary: "#ECEFF1", // Light text to contrast with darker background
      secondary: "#B0BEC5", // Softer grey text
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h1: { fontWeight: 700, fontSize: "2.5rem" },
    h2: { fontWeight: 600, fontSize: "2rem" },
    h3: { fontWeight: 500, fontSize: "1.75rem" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: "bold",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
