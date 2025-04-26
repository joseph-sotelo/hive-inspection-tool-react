import './App.css';
import "@arcgis/core/assets/esri/themes/dark/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PowerPlantsList from './pages/PowerPlantsList';
import WebMap from './pages/map/[slug]/WebMap';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<PowerPlantsList />} />
        <Route path = "/map/:slug" element = {<WebMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;