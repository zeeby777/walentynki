import { List, ListItem, CircularProgress, Button, Box } from "@mui/material"; 
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Snackbar, Alert } from "@mui/material";
import MovieCard from "./MovieCard";
import Delete from "@mui/icons-material/Delete";
import Close from "@mui/icons-material/Close";
import DirectionsRun from "@mui/icons-material/DirectionsRun";
import { useState } from "react";
import axios from "axios";

function MovieList({ movies, fetchMovies }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState({});
  const notificationTemplate = {
    open: false,
    message: "",
    severity: 'success'
  }
  const [notification, setNotification] = useState(notificationTemplate)

  if (!movies) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  let parsedMovies = movies.map((value) => {
    return JSON.parse(value);
  });

  function handleDeleteOpen(movie) {
    setDeleteOpen(true);
    setMovieToDelete(movie);
  }

  function handleDeleteClose() {
    setDeleteOpen(false);
  }

  function handleSnackbarClose(){
    setNotification(notificationTemplate)
  }


  function handleDelete(){
    axios.post("https://movieapi.piotrkleban.com/delete.php", {id: movieToDelete.id}).then((res) => {
        if(res.data.success){
            setNotification({
              open: true,
              message: "Film został usunięty z listy! Mam nadzieję, że nam się spodobał :D",
              severity: 'success'
            })
            handleDeleteClose()
            fetchMovies()
          } else{
            setNotification({
              open: true,
              message: res.data.error,
              severity: 'error'
            })
          }
    })
  }

  return (
    <List>
      {parsedMovies.map((movie, index) => {
        return (
          <ListItem key={index} sx={{ display: 'flex', alignItems: 'stretch' }}>
            <MovieCard movie={movie} />
            <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
              <Button 
                sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => handleDeleteOpen(movie)}
              >
                <Delete sx={{ height: '3rem', width: '3rem' }} />
              </Button>
            </Box>
          </ListItem>
        );
      })}
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogContent>
          <DialogTitle sx={{textAlign: 'center'}}>Czy na pewno chcesz usunąć: <br /> <i>{movieToDelete.title}</i>?</DialogTitle>
        </DialogContent>
        <DialogActions>
                    <Button  
                        onClick={handleDelete}
                        variant="contained" 
                        sx={{ backgroundColor: "#F44336", '&:hover': { backgroundColor: "#D32F2F" } }}

                        startIcon={<Delete />}>
                        Usuń (nieprzywracalne!)
                    </Button>
                    <Button 
                        onClick={handleDeleteClose} 
                        variant="contained" 
                        sx={{ backgroundColor: "#616161", '&:hover': { backgroundColor: "#757575" } }} 
                        startIcon={<DirectionsRun />}>
                        Nie usuwaj
                    </Button>
                </DialogActions>
      </Dialog>
            
      {notification.open && (
      <Snackbar 
        open={notification.open} 
        onClose={handleSnackbarClose}
        autoHideDuration={5000}>
        <Alert 
          onClose={handleSnackbarClose}
          severity={notification.severity}
          variant='filled'
          sx={{color: 'white'}}>
          {notification.message}
        </Alert>
      </Snackbar>
      )}
    </List>
  );
}

export default MovieList;
