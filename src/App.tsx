import './App.css';
import "@arcgis/core/assets/esri/themes/dark/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebMap from './pages/WebMap';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"



function App() {

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <BrowserRouter>
        <Routes>
          {/* <Route path = "/" element = {<PowerPlantsList />} /> */}
          <Route path = "/map/:slug" element = {<WebMap />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;