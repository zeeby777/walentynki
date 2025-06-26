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



function MovieCard({ movie }) {
  function generateGenresString() {
    if (!movie) return "";
    return movie.genre_ids
      .map((val) => genres.find((genre) => genre.id === val)?.name)
      .filter(Boolean)
      .join('/');
  }

  return (
    <Paper
      sx={{
        width: '100%',
        backgroundColor: "#1E1E1E",
        color: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        padding: 2,
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <CardHeader
        title={movie?.title}
        sx={{
          textAlign: "left",
          color: "#1E88E5",
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bolder',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        {/* Image + Release Date (always vertical) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 150 }}>
          <CardMedia
            component="img"
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            sx={{ width: 150, borderRadius: 2 }}
          />
        </Box>

        {/* Text content */}
        <CardContent sx={{ flex: 1, padding: '0 !important' }}>
          <Typography variant="h6" component="span" color="primary">
            Gatunki:
          </Typography>{' '}
          <Typography variant="body1" component="span">
            {generateGenresString()}
          </Typography>
          <br />
          <Typography variant="h6" component="span" color="primary">
            Opis:
          </Typography>{' '}
          <Typography variant="body1" component="span">
            {movie?.overview}
          </Typography>
          <br />
          <Typography variant="h6" component="span" color="primary" sx={{ mt: 1 }}>
            Data wydania:
          </Typography>{' '}
          <Typography variant="body1" component="span">
            {new Date(movie?.release_date).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Box>
    </Paper>
  );
}

export default MovieCard