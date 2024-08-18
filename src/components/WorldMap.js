import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, Drawer, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const MapContainerStyled = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '85%',
  height: '75vh',
  margin: 'auto',
}));

const StyledMapContainer = styled(MapContainer)({
  width: '100%',
  height: '100%',
});

const SidebarContent = styled(Box)(({ theme }) => ({
  width: 350,
  padding: theme.spacing(2),
}));

const RecommendationText = styled(Typography)({
  whiteSpace: 'pre-line', // Preserve spaces and line breaks
});

const WorldMap = ({ geoJsonData }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState('');
  const [visitReason, setVisitReason] = useState('');

  const onEachCountry = (country, layer) => {
    layer.on({
      mouseover: (e) => {
        layer.setStyle({
          fillColor: '#ff7800',
          fillOpacity: 0.7,
        });
      },
      mouseout: (e) => {
        layer.setStyle({
          fillColor: '#3388ff',
          fillOpacity: 0.2,
        });
      },
      click: (e) => {
        setSelectedCountry(country.properties.name);
        getVisitReason(country.properties.name);
        getPlaces(country.properties.name);
        setSidebarOpen(true);
      },
    });
  };

  const getVisitReason = async (countryName) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/why-visit/', { // Full URL for the FastAPI server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          place: countryName // Payload matching FastAPI route requirements
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVisitReason(data.reason); // Set the visit reason text
    } catch (error) {
      console.error('Error fetching visit reason:', error);
      setVisitReason(''); // Clear the content in case of error
    }
  };

  const getPlaces = async (countryName) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/recommend/', { // Full URL for the FastAPI server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          place: countryName // Payload matching FastAPI route requirements
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPlaces(data.recommendations); // Directly set the recommendations text
    } catch (error) {
      console.error('Error fetching places:', error);
      setPlaces(''); // Clear the content in case of error
    } finally {
      setLoading(false);
    }
  };

  return (
    <MapContainerStyled>
      <StyledMapContainer center={[20, 0]} zoom={2}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON data={geoJsonData} onEachFeature={onEachCountry} />
      </StyledMapContainer>
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <SidebarContent>
          {selectedCountry && (
            <>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{selectedCountry}</Typography>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt:'2rem' }}>Why you should visit {selectedCountry}</Typography>
                  <RecommendationText variant="body1" sx={{  }}>{visitReason}</RecommendationText> {/* Display visit reason */}
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt:'2rem' }}>Top Places to Visit {selectedCountry}</Typography>
                  <RecommendationText variant="body1">{places}</RecommendationText> {/* Display places */}
                </>
              )}
            </>
          )}
        </SidebarContent>
      </Drawer>
    </MapContainerStyled>
  );
};

export default WorldMap;
