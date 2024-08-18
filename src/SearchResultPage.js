import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Card, CardContent, CardMedia, Rating, CircularProgress } from '@mui/material';
import axios from 'axios';

function SearchResultPage() {
  const { query } = useParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roadmapImage, setRoadmapImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const params = {
          api_key: "",
          engine: "google_hotels",
          q: query || "Bali Resorts",
          hl: "en",
          gl: "uk",
          check_in_date: "2024-08-19",
          check_out_date: "2024-08-20",
          currency: "USD",
          sort_by: "3",
          amenities: "53"
        };

        const response = await axios.get('https://serpapi.com/search.json', { params });
        console.log('Hotel API Response:', response.data);

        if (response.data.properties) {
          setHotels(response.data.properties.slice(0, 10));
        } else {
          setError('No hotel results found in the API response');
        }
      } catch (err) {
        console.error('Hotel API Error:', err);
        setError(`Failed to fetch hotel data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchRoadmap = async () => {
      try {
        const response = await axios.post('http://localhost:8000/create-trip-plan', { place: query }, { responseType: 'blob' });
        
        if (response.status === 200) {
          // Create an object URL from the blob
          const imageUrl = URL.createObjectURL(response.data);
          console.log('Roadmap Image URL:', imageUrl); // Debug: log the image URL
          setRoadmapImage(imageUrl);
          setImageUrl(imageUrl); // Save image URL for download link
        } else {
          setError('Failed to fetch roadmap image');
        }
      } catch (err) {
        console.error('Roadmap API Error:', err);
        setError(`Failed to fetch roadmap image: ${err.message}`);
      }
    };

    fetchHotels();
    fetchRoadmap();
  }, [query]);

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '1rem' }}>
        <Box sx={{ width: '35%', marginLeft: '3rem' }}>
          <Box textAlign='center' sx={{ padding: 1, border: '1px dashed grey', marginBottom: '1rem' }}>
            <Typography variant="h4" gutterBottom>
              Search Results for: {decodeURIComponent(query || "Bali Resorts")}
            </Typography>
            <Typography variant="body1">
              Here are the top 10 hotels for "{decodeURIComponent(query || "Bali Resorts")}".
            </Typography>
          </Box>
          {roadmapImage ? (
            <Box textAlign='center' mt='2rem'>
              <Typography variant="h5">Trip Plan:</Typography>
              <img src={roadmapImage} alt="Roadmap" style={{ maxWidth: '90%', height: 'auto' }} /> 
              <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <a href={imageUrl} download="trip_plan.png">
                  <Button variant="contained" color="primary">Download Roadmap</Button>
                </a>
                <Button variant="contained" color="success" onClick={handleClick}>Go Home</Button>
              </Box>
            </Box>
          ) : (
            <Typography textAlign='center' mt='2rem'>Loading roadmap...</Typography>
          )}
        </Box>
        
        <Box sx={{ width: '40%', marginRight: '3rem' }}>
          {loading ? (
            <Box textAlign='center'>
              <CircularProgress />
              <Typography>Loading...</Typography>
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Box>
              {hotels.map((hotel, index) => (
                <Card key={index} sx={{ display: 'flex', marginBottom: '1rem', border:'1px solid #ccc' }}>
                  {hotel.images && hotel.images.length > 0 && (
                    <CardMedia
                      component="img"
                      sx={{ width: 150 }} 
                      image={hotel.images[0].thumbnail}
                      alt={hotel.name}
                    />
                  )}
                  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent>
                      <Typography variant="h6">{hotel.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${hotel.rate_per_night.extracted_before_taxes_fees}
                      </Typography>
                      {hotel.overall_rating && (
                        <Box mt={1}>
                          <Rating name={`rating-${index}`} value={hotel.overall_rating} readOnly precision={0.1} />
                          <Typography component="span" ml={1}>
                            {hotel.overall_rating}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Box>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SearchResultPage;
