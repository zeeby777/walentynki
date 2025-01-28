import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

function App() {
  const [searchVal, setSearchVal] = useState("");
  const options = [
    { label: 'Eyes Wide Shut', id: 1 }
  ];

  return (
    <div>
      <Autocomplete
        options={options} 
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Movie"
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            value={searchVal}
          />
        )}
      />
    </div>
  );
}

export default App;
