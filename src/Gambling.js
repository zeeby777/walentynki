import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Button, Dialog, DialogTitle, DialogContent, Box,  DialogActions } from '@mui/material';
import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import MovieCard from './MovieCard';

const defaultMovie = {
    "adult": false,
    "backdrop_path": "/9Ebn8atCcGk5OZrx4xmoTobAxoh.jpg",
    "genre_ids": [
        35,
        10749
    ],
    "id": 1581,
    "original_language": "en",
    "original_title": "The Holiday",
    "overview": "Two women, one from the United States and one from the United Kingdom, swap homes at Christmas time after bad breakups with their boyfriends. Each woman finds romance with a local man but realizes that the imminent return home may end the relationship.",
    "popularity": 26.489,
    "poster_path": "/h1ITOpvJN3Tw4Sy60w2QTfYMvdd.jpg",
    "release_date": "2006-12-05",
    "title": "The Holiday",
    "video": false,
    "vote_average": 7.093,
    "vote_count": 5199
}

function Gambling({movies}){
    const [gamblingOpen, setGamblingOpen] = useState(false)
    const [isSpinning, setIsSpinning] = useState(false)
    const [winningMovie, setWinningMovie] = useState({})
    const [displayedMovie, setDisplayedMovie] = useState(defaultMovie)
    const [prizeNumber, setPrizeNumber] = useState()



    const movieLabels = movies.map((movie) => {
        const parsed = JSON.parse(movie)
        return {
            option: parsed.original_title
        }
    })

    function handleGamblingOpen(){
        setGamblingOpen(true)
    }

    function handleGamblingClose(){
        setGamblingOpen(false)
    }

    function handleSpinStart(){
        const winningIndex = Math.floor(Math.random() * movies.length);
        setWinningMovie(JSON.parse(movies[winningIndex]))
        setPrizeNumber(winningIndex)
        console.log(movieLabels)
        setIsSpinning(true)
    }

    return(
        <>
            <Button sx={{ backgroundColor: "#2196F3", 
                '&:hover': { backgroundColor: "#1976D2" },
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '0.8rem 1.5rem', 
                borderRadius: '8px',
                fontWeight: 'bold',}}
                onClick={handleGamblingOpen}
                >
                <RocketLaunchIcon sx={{ marginRight: '8px' }} />
                Kliknij, aby gambling
            </Button>

            <Dialog open={gamblingOpen} onClose={handleGamblingClose}>
                <DialogTitle>Mmmmmmm... losowość</DialogTitle>
                <DialogContent>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{display: 'flex', overflow: 'hidden'}}>
                            <Wheel
                            prizeNumber={prizeNumber}
                            data={movieLabels}
                            mustStartSpinning={isSpinning}
                            perpendicularText={true}
                            onStopSpinning={() => {
                                console.log(winningMovie)
                                setDisplayedMovie(winningMovie)
                                setIsSpinning(false)
                            }} />
                        </Box>
                        <Box>
                            <MovieCard movie={displayedMovie} />
                        </Box>

                        
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                    sx={{backgroundColor: "#2196F3", 
                    '&:hover': { backgroundColor: "#1976D2" }}} 
                    onClick={handleSpinStart}>Wybierz</Button>
                </DialogActions>
            </Dialog>

            
        </>
    )
}

export default Gambling