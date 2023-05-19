import { Input } from "postcss";
import React, { useRef, useEffect, useState } from "react";
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
      // console.log('success')
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

      // console.log('success');
      handlePlaceDestinationId(place_destination.place_id);
   })

   const startRoute = () => {
      if (inputValue1 && inputValue2) {
         // const origin = originRef.current.value;
         // const destination = destRef.current.value;

         // console.log(typeof placeOriginId);
         // console.log(typeof placeDestinationId);
         var directionsService = new google.maps.DirectionsService();
         var directionsRenderer = new google.maps.DirectionsRenderer();
         var distanceMatrixservice = new google.maps.DistanceMatrixService();

         var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            // center: { lat: 41.85, lng: -87.65 }
         });
         var infoWindow = new google.maps.InfoWindow(); // InfoWindowを作成
         var directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
         // directionsRenderer.setMap(map);
         var request = {
            origin: { placeId: placeOriginId },
            destination: { placeId: placeDestinationId },
            travelMode: "DRIVING"
         }

         // ルート取得
         // setLocation(request.origin, request.destination);
         setLocation(request.origin.placeId, request.destination.placeId);

         function setLocation(originPlaceId, destinationPlaceId) {
            // 所要時間取得
            distanceMatrixservice.getDistanceMatrix({
               origins: [{ placeId: originPlaceId }], // 出発地
               destinations: [{ placeId: destinationPlaceId }], // 目的地
               travelMode: request.travelMode, // 移動手段
            }, timeRequired)
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function (result, status) {
               if (status == "OK") {
                  directionsRenderer.setDirections(result);
                  var bounds = new google.maps.LatLngBounds();
                  var legs = result.routes[0].legs;
                  for (var i = 0; i < legs.length; i++) {
                     var steps = legs[i].steps;
                     for (var j = 0; j < steps.length; j++) {
                        var path = steps[j].path;
                        for (var k = 0; k < path.length; k++) {
                           bounds.extend(path[k]);
                        }
                     }
                  }
                  map.fitBounds(bounds);
                  var distance = legs[0].distance.text;
                  var duration = legs[0].duration.text;

                  // 吹き出しの内容を更新
                  infoWindow.setContent("距離：" + distance + "<br>所要時間：" + duration);
                  // ルートの中心座標に吹き出しを表示
                  infoWindow.setPosition(result.routes[0].overview_path[Math.floor(result.routes[0].overview_path.length / 2)]);
                  // 吹き出しを開く
                  infoWindow.open(map);
               }
            });
         }

         function timeRequired(response, status) {
            if (status == "OK") {
               var origins = response.originAddresses;
               var destinations = response.destinationAddresses;
               for (var i = 0; i < origins.length; i++) {
                  var results = response.rows[i].elements;
                  for (var j = 0; j < results.length; j++) {
                     var element = results[j];
                     if (element.status === "OK") {
                        var distance = element.distance.text;
                        var duration = element.duration.text;
                        var from = origins[i];
                        var to = destinations[j];
                        // console.log("距離: " + distance);
                        // console.log("所要時間: " + duration);
                     } else {
                        // console.log("距離と所要時間の取得に失敗しました。");
                     }
                  }
               }      
               infoWindow.open(map);
            } else {
               // console.log("距離と所要時間の取得に失敗しました。ステータス: " + status);
            }

         }
      };
   }

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
         <div><p id="route-distance"></p></div>
         <div><p id="route-time"></p></div>
      </div>
   );
}

export default PlacesAutoComplete;
