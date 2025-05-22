import './App.css';
import Map from './components/map';
import { InspectionDataContext } from './data/inspectionDataContext';

const defaultInspectionData = {
  isInspectionModeActive: true
}

function App() {

  return (
    <InspectionDataContext.Provider value={defaultInspectionData}>
      <Map />
    </InspectionDataContext.Provider>
  );
}

export default App;