import { Card, CardHeader, Typography, CardMedia } from "@mui/material"

function MovieCard({movie}){
    console.log(movie.title)
    return(
        <Card>
            <CardHeader title={movie.title}/>
            <div sx={{height: '50%'}}>
                <CardMedia
                component='img'
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            </div>
        </Card>
    )
}

export default MovieCard