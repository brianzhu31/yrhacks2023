import { useLoadScript } from "@react-google-maps/api"
import Home from "./components/Home";
import './App.css';

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAEVzeo2kzQ-h8X0E9HIHPypPoyfzsVYbQ",
    libraries: ["places"]
  })

  if(!isLoaded) return <div>Loading...</div>

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
