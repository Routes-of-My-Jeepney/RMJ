import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MapContainer() {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Additional map components can be placed here */}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;