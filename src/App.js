import SearchBar from "./SearchBar";
import { ThemeProvider, createTheme, CssBaseline, Typography, Box, Button } from "@mui/material";
import MovieCard from "./MovieCard";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import Gambling from "./Gambling";

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
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
            textAlign: 'center', // Centering the header text
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
                    backgroundColor: "#F44336", // Red background
                    '&:hover': {
                        backgroundColor: "#D32F2F", // Darker red for hover
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.8rem 1.5rem', // Padding to make the button look decent
                    borderRadius: '8px', // Rounded corners
                    fontWeight: 'bold',
                },
            },
        },
    },
});

const blankMovie = {
    original_title: "?",
    genre_ids: [],
    release_date: "1970-01-01",
    poster_path: ""
}

function App(){
    const fetchMovies = useCallback(() => {
        axios.get("https://movieapi.piotrkleban.com/listAll.php").then((res) => {
            console.log(res)
            let cleanedMovies = res.data.map((val) => {
                return val.details
            })
            setMovies(cleanedMovies)
        })
    })

    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetchMovies()
    }, [])

    return(
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '2rem' }}>
                    <Typography variant="h2">Walentynkowy wybieracz filmów™</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Gambling movies={movies} fetchMovies={fetchMovies}/>
                </Box>
            </Box>
            <SearchBar fetchMovies={fetchMovies} />
            <MovieList movies={movies} fetchMovies={fetchMovies} />
        </ThemeProvider>
    )
}

export default App;
