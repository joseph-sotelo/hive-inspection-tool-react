import './App.css';
import Map from './pages/map/map';
import Clients from './pages/clients/Clients';
import Account from './pages/account/account';
import { MobileMenu } from './components/mobile-menu/mobile-menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <MobileMenu />
      <Routes>
        <Route path="/map" element={<Map />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/account" element={<Account />} />
        <Route path="/" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;