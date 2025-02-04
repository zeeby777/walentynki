import SearchBar from "./SearchBar";
import theme from "./theme";
import { ThemeProvider, createTheme, CssBaseline, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

const sampleMovie = {
    "adult": false,
    "backdrop_path": "/n3pJwYuPnkw7JX7tOMbH0GRfBPn.jpg",
    "genre_ids": [
        14,
        16,
        10751
    ],
    "id": 408,
    "original_language": "en",
    "original_title": "Snow White and the Seven Dwarfs",
    "overview": "A beautiful girl, Snow White, takes refuge in the forest in the house of seven dwarfs to hide from her stepmother, the wicked Queen. The Queen is jealous because she wants to be known as \"the fairest in the land,\" and Snow White's beauty surpasses her own.",
    "popularity": 78.126,
    "poster_path": "/3VAHfuNb6Z7UiW12iYKANSPBl8m.jpg",
    "release_date": "1938-01-14",
    "title": "Snow White and the Seven Dwarfs",
    "video": false,
    "vote_average": 7.122,
    "vote_count": 7468
}

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1E88E5",
        },
        background: {
            default: "#1E1E1E",
            paper: "#252525",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#B0BEC5",
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
        h6: {
            fontWeight: 600,
        },
        body1: {
            fontSize: "1rem",
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#FFFFFF", // White text
                },
            },
        },
    },
});

function App(){
    return(
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Typography variant="h1">Walentynki!</Typography>
            <SearchBar />
            <MovieCard movie={sampleMovie} />
        </ThemeProvider>
    )
}

export default App