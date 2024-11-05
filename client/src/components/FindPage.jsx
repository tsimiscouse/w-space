import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import SpaceCard from './SpaceCard';
import GoogleMaps from './GoogleMaps'; 
import axios from 'axios';

// Haversine formula to calculate distance between two points on the earth
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const FindPage = () => {
  const [spaces, setSpaces] = useState([]); 
  const [query, setQuery] = useState(''); 
  const [filteredSpaces, setFilteredSpaces] = useState([]); 
  const [userLocation, setUserLocation] = useState({ lat: -7.7956, lng: 110.3688 }); // Default location (Yogyakarta)
  const [selectedSpace, setSelectedSpace] = useState(null); 

  // Fetch all spaces on component mount to display by default
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/spaces'); // Fetch all spaces
        setSpaces(response.data);
        setFilteredSpaces(getNearestSpaces(response.data)); // Initialize filtered spaces with nearest
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };

    fetchSpaces();
  }, []);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // Filter spaces by distance
  const getNearestSpaces = (spaces) => {
    const spacesWithDistance = spaces.map(space => {
      const distance = getDistance(userLocation.lat, userLocation.lng, space.location.lat, space.location.lng);
      return { ...space, distance };
    });

    // Sort spaces by distance and return the first 3
    return spacesWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
  };

  // Update filtered spaces when the query changes
  useEffect(() => {
    const fetchSpacesByQuery = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/spaces/search', {
          params: { query },
        });
        setFilteredSpaces(getNearestSpaces(response.data));
      } catch (error) {
        console.error('Error fetching spaces by query:', error);
      }
    };

    if (query.trim() === '') {
      // If query is empty, reset to all fetched spaces
      setFilteredSpaces(getNearestSpaces(spaces));
    } else {
      // Fetch spaces based on the query
      fetchSpacesByQuery();
    }
  }, [query, spaces, userLocation]);

  // Handle selecting a space
  const handleSelectSpace = (space) => {
    setSelectedSpace(space);
    setQuery(space.name);
  };

  // Function to handle input focus
  const handleInputFocus = async () => {
    setQuery(''); 
    setSelectedSpace(null); 
    const response = await axios.get('http://localhost:5000/api/spaces'); 
    setSpaces(response.data);
    setFilteredSpaces(getNearestSpaces(response.data)); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow mt-[83px]">
        <div className="w-1/2 p-4 flex flex-col">
          <h1 className="text-2xl font-bold mb-4 mx-5 mt-2">Find Your Rental Space</h1>
          <div className="relative mx-4">
            <input
              type="text"
              placeholder="Search by name, city, or category"
              value={query}
              onChange={(e) => setQuery(e.target.value)} 
              onFocus={handleInputFocus} 
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div 
            className="h-[510px] rounded-lg overflow-y-auto  bg-transparent"
            style={{
              scrollbarWidth: 'none',
            }}
          >
            <style>
              {`
                .overflow-y-auto::-webkit-scrollbar {
                  display: none; /* Hide scrollbar for WebKit browsers */
                }
              `}
            </style>
            <div className="p-4 space-y-4">
              {selectedSpace ? (
                <SpaceCard 
                  key={selectedSpace._id} 
                  name={selectedSpace.name} 
                  location={selectedSpace.location.city} 
                  description={selectedSpace.description} 
                  image={selectedSpace.images[0]?.url || 'default_image_url'}
                  price={selectedSpace.pricePerHour}
                />
              ) : (
                getNearestSpaces(filteredSpaces).map(space => (
                  <SpaceCard 
                    key={space._id} 
                    name={space.name} 
                    location={space.location.city} 
                    description={space.description} 
                    image={space.images[0]?.url || 'default_image_url'}
                    price={space.pricePerHour}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2 mr-[40px]">
          <GoogleMaps spaces={filteredSpaces} onSelectSpace={handleSelectSpace} /> 
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindPage;
