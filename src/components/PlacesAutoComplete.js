import React, {useState, useEffect} from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css"
import $, { data } from 'jquery'


function PlacesAutoComplete(props) {

  const {
    ready,
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({address})
    const {lat, lng} = await getLatLng(results[0])
    props.setSelected({lat, lng})
    props.setCenter({lat:lat, lng:lng})

    const arrPlaces = []

    var pyrmont = new window.google.maps.LatLng(43.87622125174315, -79.2998422861067);

    var map;
    var service;
    var infowindow;

    map = new window.google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    var request = {
      location: pyrmont,
      radius: '1500',
      type: ['grocery_or_supermarket']
    };

    service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    props.setPlaces(arrPlaces)
  }

  function callback(results, status) {
    console.log(results)
  }

  return (
    <div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput 
          value={value} 
          onChange={e => setValue(e.target.value)} 
          disabled={!ready} 
          className='input' 
          placeholder='Search'
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' && data.map(({place_id, description})=> 
              <ComboboxOption key={place_id} value={description}/>)}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default PlacesAutoComplete




    // fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=-33.8670522%2C151.1957362&radius=1500&type=grocery_or_supermarket&key=AIzaSyAEVzeo2kzQ-h8X0E9HIHPypPoyfzsVYbQ')
    //   .then((resp) => {
    //     return resp.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch(err => console.error(err));