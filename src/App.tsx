import './App.css';
import "@arcgis/core/assets/esri/themes/dark/main.css";
import { ArcgisMap } from '@arcgis/map-components-react';
import { defineCustomElements } from '@arcgis/map-components/dist/loader';

defineCustomElements();

function App() {

  return (
    <ArcgisMap itemID="e0a3f1236e3e446e980a5a48cd12af15" id="map"/>
  );
}

export default App;