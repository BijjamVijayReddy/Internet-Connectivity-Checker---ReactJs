import React, { useState } from 'react';
import "./App.css";
import { Alert, Snackbar, } from "@mui/material";

const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isStatus, setIsStatus] = useState(() => {
    if (navigator.onLine) {
      return true
    } else {
      return false
    }
  })

  // React Title function.
  React.useEffect(() => {
    if (!isStatus) {
      document.title = "You are currently offline.:("
    } else {
      document.title = "You are currently connected to the internet."
    }
  }, [isStatus])

  React.useEffect(() => {
    window.ononline = () => {
      setIsStatus(true)
    };
    window.onoffline = () => {
      console.log("You are currently offline.");
      setIsStatus(false)
    }
  }, [isStatus])

  const alertHandler = () => {
    setIsOpen(true)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };

  return (
    <div className='App-header'>
      <h2 className='App'>Detect Internet Network Status</h2>
      <button className='btn' onClick={alertHandler}>Check</button>

      {isStatus ? (<Snackbar open={isOpen} sx={{ maxWidth: "90%", margin: "0 auto" }} autoHideDuration={4000} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }} onClose={handleClose}>
        <Alert variant="filled" severity="success" onClose={handleClose}>
        Great! You're now connected to the internet.
        </Alert>
      </Snackbar>) : (<Snackbar open={isOpen} sx={{ maxWidth: "90%", margin: "0 auto" }} autoHideDuration={4000} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }} onClose={handleClose}>
        <Alert variant="filled" severity="error" onClose={handleClose}>
          Looks like you're not connected to the internet. Please verify your connection.
         </Alert>
      </Snackbar>)}

    </div>
  )
}

export default App