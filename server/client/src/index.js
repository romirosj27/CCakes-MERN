import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d65a58', // You can choose any color you prefer
    },
    secondary: {
      main: '#d65a58',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Default MUI font
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
