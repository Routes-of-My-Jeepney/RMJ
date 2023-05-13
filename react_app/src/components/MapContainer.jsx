import React , {useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { map } from 'lodash';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

function MapContainer() {
  const mapRef = useRef();
  const [center, setCenter] = useState();
  const [MarkerPosition, setMarkerPosition] = React.useState();

  React.useEffect(() => {
    if (navigator.geolocation){
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
  
  useEffect(() => {
    console.log('MarkerPosition updated:', MarkerPosition);
  }, [MarkerPosition])

  const onLoad = React.useCallback(map => (mapRef.current = map), []);

    

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap 
      ref={mapRef}
      mapContainerStyle={containerStyle} 
      center={center} 
      zoom={10}
      onLoad={onLoad}
      >
        <MarkerF position={MarkerPosition}/>
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;