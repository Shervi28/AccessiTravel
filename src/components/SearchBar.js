import React, { useState } from 'react';
import { Box, InputBase, styled } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#038cfc",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search/${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Search sx={{
        borderRadius: '10px',
        backgroundColor: '#f3f2f7',
        width: '70%',
        maxWidth: '900px',
      }}>
        <InputBase
          placeholder='Create a trip plan using AI'
          sx={{
            width: '100%',
            color:'black'
          }}
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </Search>
    </Box>
  );
}

export default SearchBar;