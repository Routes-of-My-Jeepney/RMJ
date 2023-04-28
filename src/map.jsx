import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

 
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 123.8854,
  lng: 10.3157,
};

// 
const Map = () => {
    //
  const [response, setResponse] = useState(null);
  const directionsCallback = (res) => {
    if (res !== null) {
      setResponse(res);
    }
  };

  const origin = "8W74+P42, Cardinal Rosales Ave, Cebu City, 6000 Cebu";
  const destination = "8W94+27 Cebu City, Cebu  ";
  const travelMode = "DRIVING";

  return (
    <LoadScript googleMapsApiKey="AIzaSyBfizejlk9RrRv3_O_44iBeZlcz93LzHUw">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={defaultCenter}>
        {origin && destination && (
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              travelMode: travelMode,
            }}
            callback={directionsCallback}
          />
        )}

        {response !== null && <DirectionsRenderer options={{ directions: response }} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;