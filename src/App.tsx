import './App.css';
import Map from './components/map/map';
import { InspectionDataProvider } from './data/inspectionDataContext';

function App() {

  return (
    <InspectionDataProvider>
      <Map />
    </InspectionDataProvider>
  );
}

export default App;