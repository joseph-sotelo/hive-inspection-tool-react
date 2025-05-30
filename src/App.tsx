import './App.css';
import Map from './pages/map/map';
import Clients from './pages/clients/Clients';
import Account from './pages/account/account';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SidebarInset, SidebarProvider} from "@/components/ui/sidebar"
import { AppSidebar } from './components/app-sidebar/app-sidebar';
import { MobileMenu } from './components/mobile-menu/mobile-menu';

function App() {
  return (    
    <BrowserRouter>
    <MobileMenu />
      <SidebarProvider>
        <AppSidebar />
          <SidebarInset>
            <main>              
              <Routes>
                <Route path="/map" element={<Map />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/account" element={<Account />} />
                <Route path="/" element={<Map />} />
              </Routes>
            </main>
          </SidebarInset>       
      </SidebarProvider>  
    </BrowserRouter>
  );
}

export default App;