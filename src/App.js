import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import AuthProvider from './context/AuthContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    background: {
      default: '#f1f9fb',
    },
    // other properties
  },
  // other settings
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <BrowserRouter>
				<Router />
			</BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
    
    
  )
}

export default App