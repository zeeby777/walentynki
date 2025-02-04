import './SearchBar.css';
import { useState, useRef, useEffect } from 'react';
import MovieCard from './MovieCard';
import { Autocomplete, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Icon  } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ThemeProvider from '@mui/material';
import axios from 'axios';

const MOVIEDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjZhZTIwY2M0MDcxN2NjOWE4ZWQwZDhhYzllMjU2NSIsIm5iZiI6MTczODEwNDQzOC4yNzQsInN1YiI6IjY3OTk1ZTc2ODNkN2FhZTJmMDI3OTJkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ji_VaAopq1aYSnb4hrs2Oixwl_nDAiksvQUDBRAem34'

const requestOptions = {
  headers: {
    accept: 'SearchBarlication/json',
    Authorization: `Bearer ${MOVIEDB_API_KEY}`
  }
};



function SearchBar() {
  const [searchVal, setSearchVal] = useState(null);
  const [searchInputVal, setsearchInputVal] = useState(null);
  const [inputIsValidValue, setInputIsValidValue] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [options, setOptions] = useState([])
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer); 
      timer = setTimeout(() => func(...args), delay); 
    };
  }


  const suggestMovies = useRef(
    debounce((value) => {
      if (!value) {
        setOptions([]);
        return;
      }
      
      console.log("API Call with:", value);
      axios
        //https://developer.themoviedb.org/reference/search-movie
        .get(`https://api.themoviedb.org/3/search/movie?query=${value}`, requestOptions)
        .then((res) => {
          let results = res.data.results;
          results.sort((a, b) => {
            return b.popularity - a.popularity
          })
          setOptions(results);
        });
    }, 500)
  ).current;



  useEffect(() => {
    if (inputIsValidValue && searchInputVal != "") {
      setDialogOpen(true)
      return;
    }
  
    suggestMovies(searchInputVal);
  }, [searchInputVal, searchVal]);

  function handleDialogClose(){
    setDialogOpen(false)
  }



  return (
    <div className='SearchBar'>
      <Autocomplete
        options={options}

        inputValue={searchInputVal}
        onInputChange={(e, newInputValue) => {
          setsearchInputVal(newInputValue)
          setInputIsValidValue(false)
        }}

        value={searchVal}
        onChange={(e, newValue) => {
          setSearchVal(newValue)
          setInputIsValidValue(true)
        }}

        getOptionLabel={(movie) => {
          const title = movie.title
          const yearReleased = new Date(movie.release_date).getFullYear()
          return `${title} (${yearReleased})`
        }}
        getOptionKey={(movie) => movie.id}
        isOptionEqualToValue={(selectedOption, value) => selectedOption.id == value.id}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Wyszukaj film po tytule!"
          />
        )}
      />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Dodaj film</DialogTitle>
                <DialogContent>
                    <MovieCard movie={searchVal} />
                </DialogContent>
                <DialogActions>
                    <Button  
                        variant="contained" 
                        sx={{ backgroundColor: "#4CAF50", '&:hover': { backgroundColor: "#45A049" } }} 
                        startIcon={<CheckIcon />}>
                        Dodaj
                    </Button>
                    <Button 
                        onClick={handleDialogClose} 
                        variant="contained" 
                        sx={{ backgroundColor: "#616161", '&:hover': { backgroundColor: "#757575" } }} 
                        startIcon={<CloseIcon />}>
                        Anuluj
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
  );
}

export default SearchBar;
