import React from 'react';
import { Box } from "@mui/material";
import WorldMap from './WorldMap';
import geoJsonData from './countries.geo.json';

function WorldMapSection() {
  return (
    <Box sx={{ justifyContent: 'center' }}>
      <WorldMap geoJsonData={geoJsonData} />
    </Box>
  );
}

export default WorldMapSection;