import { useState, useMemo, useCallback, useRef } from "react"
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api"
import PlacesAutoComplete from "./PlacesAutoComplete"

import './Home.css'

function Home() {
  const mapRef = useRef()
  // const center = useMemo(() => ({lat:43.87617871491531, lng:-79.29985301659707}), [])
  const [center, setCenter] = useState({lat:43.87617871491531, lng:-79.29985301659707})
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false
  }))
  const onLoad = useCallback(map => (mapRef.current = map), [])

  const [selected, setSelected] = useState(null)
  const [places, setPlaces] = useState([])


  return (
    <div className='Home'>
      <div className='controls'>
        <h1>Search</h1>
        <PlacesAutoComplete setSelected={setSelected} setCenter={setCenter} setPlaces={setPlaces}/>
      </div>
      <GoogleMap id='map'
        zoom={16} 
        center={center} 
        mapContainerClassName='map-container'
        options={options}
        onLoad={onLoad}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  )
}

export default Home