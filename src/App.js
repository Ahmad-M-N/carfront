import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './components/Login';


function App() {

  return (

    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">CarList</Typography>
        </Toolbar>
      </AppBar>
      <Login/>
    </div>
    
  );
}
export default App;