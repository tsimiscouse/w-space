import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const GoogleMaps = ({ onSelectSpace }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const markers = useRef([]);

  // Fetch spaces from the API
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/spaces/');
        const data = response.data.map(space => ({
          ...space,
          lat: parseFloat(space.location.lat), // Ensure lat is a number
          lng: parseFloat(space.location.lng), // Ensure lng is a number
        }));
        setSpaces(data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    fetchSpaces();
  }, []);

  // Load Google Maps and initialize map with user's current location
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBCEuYE1K305HMaIW2BSbx-76rNMxOl8YU&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const loadMap = (position) => {
        const initialPosition = position || { lat: -6.2250, lng: 106.8169 };

        const googleMap = new window.google.maps.Map(mapRef.current, {
          zoom: 15,
          center: initialPosition,
          mapTypeId: 'roadmap',
          styles: [
            { elementType: 'labels', stylers: [{ visibility: 'off' }] },
            { featureType: 'road', elementType: 'geometry', stylers: [{ visibility: 'on' }] },
            { featureType: 'building', stylers: [{ visibility: 'simplified' }] },
            { featureType: 'poi', stylers: [{ visibility: 'off' }] }
          ],
        });

        setMap(googleMap);
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          loadMap(userPos);
        },
        () => loadMap() // Fallback to default position if geolocation fails
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Add markers to the map whenever spaces or map changes
  useEffect(() => {
    if (!map || spaces.length === 0) return;

    // Clear previous markers
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    // Create a simple icon URL
    const iconUrl = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
    const hoverIconUrl = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'; // Icon for hover effect

    // Add a marker for each space
    spaces.forEach(space => {
      if (space.lat && space.lng) {
        const marker = new window.google.maps.Marker({
          position: { lat: space.lat, lng: space.lng },
          map: map,
          title: space.name,
          icon: {
            url: iconUrl,
            scaledSize: new window.google.maps.Size(24, 24),
          },
        });

        // Add event listeners for marker hover and click
        marker.addListener('mouseover', () => {
          marker.setIcon({ url: hoverIconUrl, scaledSize: new window.google.maps.Size(48, 48) });
        });

        marker.addListener('mouseout', () => {
          marker.setIcon({ url: iconUrl, scaledSize: new window.google.maps.Size(36, 36) });
        });

        marker.addListener('click', () => {
          onSelectSpace(space); // Pass the selected space to the parent component
        });

        markers.current.push(marker);
      } else {
        console.warn("Space missing position:", space);
      }
    });

    // Center map on user's location or first space
    if (userLocation) {
      map.setCenter(userLocation); // Center on user's location
    } else if (spaces.length > 0) {
      map.setCenter({ lat: spaces[0].lat, lng: spaces[0].lng }); // Center on the first space
    }
  }, [map, spaces, userLocation, onSelectSpace]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div ref={mapRef} className="w-full h-[550px]"></div>
    </div>
  );
};

export default GoogleMaps;
