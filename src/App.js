import './App.css';
import { useState, useRef, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

const MOVIEDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjZhZTIwY2M0MDcxN2NjOWE4ZWQwZDhhYzllMjU2NSIsIm5iZiI6MTczODEwNDQzOC4yNzQsInN1YiI6IjY3OTk1ZTc2ODNkN2FhZTJmMDI3OTJkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ji_VaAopq1aYSnb4hrs2Oixwl_nDAiksvQUDBRAem34'

const requestOptions = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${MOVIEDB_API_KEY}`
  }
};



function App() {
  const [searchVal, setSearchVal] = useState("");
  const [options, setOptions] = useState([])
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer); 
      timer = setTimeout(() => func(...args), delay); 
    };
  }


  const debouncedFetchResults = useRef(
    debounce((value) => {
      if(value === ""){
        setOptions([])
        return
      }
      console.log("API Call with:", value); 
      axios.get(`https://api.themoviedb.org/3/search/movie?query=${value}`, requestOptions).then((res) => {
        const results = res.data.results
        let preparedResults = []
        results.map((movie) => {
          preparedResults.push(movie.title)
        })
        setOptions(preparedResults)
      })
    }, 500) 
  ).current;

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchVal(value); 
    debouncedFetchResults(value); 
  }


  return (
    <div>
      <Autocomplete
        options={options}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Movie"
            onChange={handleSearchChange}
            value={searchVal}
          />
        )}
      />
    </div>
  );
}

export default App;
