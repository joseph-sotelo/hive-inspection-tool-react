import './App.css';
import { Map } from './components/map';
import InspectionDataProvider from './context/inspectionData/InspectionData';

function App() {

  return (
    <InspectionDataProvider>
      <Map />
    </InspectionDataProvider>
  );
}

export default App;