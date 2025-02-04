import { Card, CardHeader, Typography, CardMedia, Box, CardContent, Paper } from "@mui/material"

const genres = [
        {
          "id": 28,
          "name": "Akcja"
        },
        {
          "id": 12,
          "name": "Przygodowy"
        },
        {
          "id": 16,
          "name": "Animacja"
        },
        {
          "id": 35,
          "name": "Komedia"
        },
        {
          "id": 80,
          "name": "Kryminał"
        },
        {
          "id": 99,
          "name": "Dokumentalny"
        },
        {
          "id": 18,
          "name": "Dramat"
        },
        {
          "id": 10751,
          "name": "Familijny"
        },
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 36,
          "name": "Historyczny"
        },
        {
          "id": 27,
          "name": "Horror"
        },
        {
          "id": 10402,
          "name": "Muzyczny"
        },
        {
          "id": 9648,
          "name": "Tajemnica"
        },
        {
          "id": 10749,
          "name": "Romans"
        },
        {
          "id": 878,
          "name": "Sci-Fi"
        },
        {
          "id": 10770,
          "name": "film TV"
        },
        {
          "id": 53,
          "name": "Thriller"
        },
        {
          "id": 10752,
          "name": "Wojenny"
        },
        {
          "id": 37,
          "name": "Western"
        }
]



function MovieCard({movie}){
    console.log(movie)
    function generateGenresString(){
        if(!movie){
            return
        }
        let genreNames = ""
        movie.genre_ids.map((val, index) => {
            genreNames += genres.find((genre) => genre.id === val).name + "/"
        })
        return genreNames.slice(0, -1)
    }
    return (
        <Paper sx={{ maxWidth: 1200, backgroundColor: "#1E1E1E", color: "#fff", borderRadius: 2, boxShadow: 3, padding: 2, fontFamily: 'Roboto, sans-serif' }}>
            <CardHeader title={movie?.title} sx={{ textAlign: "center", color: "#1E88E5", fontFamily: 'Roboto, sans-serif' }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <CardMedia
                    component='img'
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    sx={{ width: 150, borderRadius: 2 }}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" component="span" color="primary" sx={{ fontFamily: 'Roboto, sans-serif' }}>Gatunki: </Typography>
                    <Typography variant="body1" component="span" sx={{ fontFamily: 'Roboto, sans-serif' }}>{generateGenresString()}</Typography>
                    <br />
                    <Typography variant="h6" component="span" color="primary" sx={{ fontFamily: 'Roboto, sans-serif' }}>Opis: </Typography>
                    <Typography variant="body1" component="span" sx={{ fontFamily: 'Roboto, sans-serif' }}>{movie?.overview}</Typography>
                    <br />
                    <Typography variant="h6" component="span" color="primary" sx={{ fontFamily: 'Roboto, sans-serif' }}>Data wydania: </Typography>
                    <Typography variant="body1" component="span" sx={{ fontFamily: 'Roboto, sans-serif' }}>{new Date(movie?.release_date).toLocaleDateString()}</Typography>
                </CardContent>
            </Box>
        </Paper>
    );
}

export default MovieCard