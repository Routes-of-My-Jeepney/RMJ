import { Input } from "postcss";
import React, { useRef, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

// const useStyles = makeStyles({
//    myComponent: {
//      position: 'relative', // or 'absolute', 'fixed', 'sticky'
//      zIndex: 1, // Set the z-index here
//    },
//  });

const PlacesAutoComplete = () => {
 const autoCompleteRef = useRef();
 const autoCompleteRef2 = useRef();
 const originRef = useRef();
 const destRef = useRef();
 const options = {
  componentRestrictions: { country: "ng" },
  fields: ["address_components", "geometry", "icon", "name"],
  types: ["establishment"]
 };

 const [inputValue1,setInputValue1]= useState(" ");
 const [inputValue2,setInputValue2]= useState(" ");
 const handleChange1 = (event) => {
    setInputValue1(event.target.value);
    console.log(inputValue1);
 };
 const handleChange2 = (event) => {
    setInputValue2(event.target.value);
    console.log(inputValue2);
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
   <TextField color='secondary' variant="filled" inputRef={originRef} onChange={handleChange1}/>
   <br />
   <label>目的地 :</label>
   <TextField color='success' variant="outlined" inputRef={destRef} onChange={handleChange2}/>

  </div>
 );
};
export default PlacesAutoComplete;