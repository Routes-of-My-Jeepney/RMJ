
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, MarkerF,DirectionsRenderer } from '@react-google-maps/api';
import  PlacesAutoComplete  from './PlacesAutoComplete';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


const containerStyle = {
  width: '100%',
  height: '100vh',
};

function MapContainer() {
  const mapRef = useRef();
  const [center, setCenter] = useState();
  const [MarkerPosition, setMarkerPosition] = React.useState();
  const [directions, setDirections] = useState(null);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(coords);
          setMarkerPosition(coords);
          mapRef.current.panTo(coords);
        },
        (error) => {
          console.log('Geolocation error', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);


  // useEffect(() => {
  //   console.log('MarkerPosition updated:', MarkerPosition);
  // }, [MarkerPosition])

  const onLoad = React.useCallback(map => (mapRef.current = map), []);
  
  return (
    <>
     <Container>
      <Box>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
          <PlacesAutoComplete />
          <GoogleMap
            id='map'
            ref={mapRef}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}>
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor: 'blue',
                    strokeOpacity: 0.8,
                    strokeWeight: 4,
                  },
                }}
              />
            )}
            <MarkerF position={MarkerPosition} />
          </GoogleMap>
        </LoadScript>
      </Box>
    </Container>
    </>
  );
}

export default MapContainer;