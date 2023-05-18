import { Input } from "postcss";
import React, { useRef, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import usePlacesAutocomplete, {
   getGeocode,
   getLatLng,
} from "use-places-autocomplete";

function PlacesAutoComplete() {
   let placeIdOrigin = 'default';
   let placeIdDestination = 'default';
   const autoCompleteRef = useRef();
   const autoCompleteRef2 = useRef();
   const originRef = useRef();
   const destRef = useRef();
   const options = {
      componentRestrictions: { country: "ng" },
      fields: ["address_components", "geometry", "icon", "name"],
      types: ["establishment"]
   };
   const [inputValue1, setInputValue1] = useState(" ");
   const [inputValue2, setInputValue2] = useState(" ");
   const [placeOriginId, setPlaceOriginId] = useState(null);
   const [placeDestinationId, setPlaceDestinationId] = useState(null);


   const handleChange1 = (event) => {
      setInputValue1(event.target.value);
      console.log(inputValue1);
   };
   const handleChange2 = (event) => {
      setInputValue2(event.target.value);
      console.log(inputValue2);
   };

   const handlePlaceOriginId = (id) => {
      setPlaceOriginId(id);
      console.log(placeOriginId);
   }

   const handlePlaceDestinationId = (id) => {
      setPlaceDestinationId(id);
      console.log(placeDestinationId)
   }

   var input_origin = document.getElementById("origin");
   var autocomplete_origin = new google.maps.places.Autocomplete(input_origin);
   autocomplete_origin.addListener("place_changed", function () {
      var place_origin = autocomplete_origin.getPlace();

      if (!place_origin.place_id) {
         console.log('error');
         return;
      }
      console.log('success')
      handlePlaceOriginId(place_origin.place_id);
   })

   var input_destination = document.getElementById('destination');
   var autocomplete_destination = new google.maps.places.Autocomplete(input_destination);
   autocomplete_destination.addListener("place_changed", function () {
      var place_destination = autocomplete_destination.getPlace();

      if (!place_destination.place_id) {
         return;
         console.log('error');
      }

      console.log('success');
      handlePlaceDestinationId(place_destination.place_id);
   })

   const startRoute = () => {
      if (inputValue1 && inputValue2) {
         // const origin = originRef.current.value;
         // const destination = destRef.current.value;
         
         console.log(typeof placeOriginId);
         console.log(typeof placeDestinationId);
         var directionsService = new google.maps.DirectionsService();
         var directionsRenderer = new google.maps.DirectionsRenderer();

         var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: { lat: 41.85, lng: -87.65 }
         });
         directionsRenderer.setMap(map);
         var request = {
            origin: { placeId: placeOriginId },
            destination: { placeId: placeDestinationId },
            travelMode: "DRIVING"
         };


         directionsService.route(request, function (result, status) {
            if (status == "OK") {
               directionsRenderer.setDirections(result);
            }
         });
      };
   };



      useEffect(() => {
         autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            originRef.current,
            options
         );
         autoCompleteRef2.current = new window.google.maps.places.Autocomplete(
            destRef.current,
            options
         );
         // autoCompleteRef.current.addListener("place_changed", async function () {
         //  const place = await autoCompleteRef.current.getPlace();
         //  console.log({ place });
         // });
      }, []);

      return (
         <div>
            <label>出発地 :</label>
            <input id="origin" ref={originRef} onChange={handleChange1} />
            <br />
            <label>目的地 :</label>
            <input id="destination" ref={destRef} onChange={handleChange2} />
            <input type='submit' value="ルートを開始" onClick={startRoute} />
         </div>
      );
   }

   export default PlacesAutoComplete;
