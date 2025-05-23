import './App.css';
import Map from './components/map';
import { InspectionDataProvider } from './data/inspectionDataContext';

const defaultInspectionData = {
  isInspectionModeActive: true
}

function App() {

  return (
    <InspectionDataProvider>
      <Map />
    </InspectionDataProvider>
  );
}

export default App;