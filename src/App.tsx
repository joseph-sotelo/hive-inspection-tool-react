import "./App.css";
import "@arcgis/core/assets/esri/themes/dark/main.css";
import Map from "./components/map";
import IndicationDataProvider from "./context/IndicationData";

function App() {
  return (
    <IndicationDataProvider>
      <Map />
    </IndicationDataProvider>
  );
}

export default App;
