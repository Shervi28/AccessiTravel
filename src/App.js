import React, { useState } from 'react';
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WorldMapSection from './components/WorldMapSection';
import SearchBar from './components/SearchBar';
import SearchResultPage from './SearchResultPage';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...(darkMode && {
        background: {
          default: '#1e1e1e',
          paper: '#2e2e2e',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b0b0b0',
        },
      }),
    },
  });

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className='App'>
          <Navbar darkMode={darkMode} handleDarkModeToggle={handleDarkModeToggle} />
          <Routes>
            <Route path="/" element={
              <Stack spacing={2}>
                <WorldMapSection />
                <SearchBar />
              </Stack>
            } />
            <Route path="/search/:query" element={<SearchResultPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;