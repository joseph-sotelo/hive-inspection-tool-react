// ArcGIS imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import "@arcgis/core/assets/esri/themes/light/main.css";

// Map utilities
import { createOrchardsLayer } from "@/components/map/layer-config";
import { MAP_CONFIG } from "@/constants";
import { ENV } from "@/utils/env-validation";
import { useEffect } from "react";

// Environment setup with validation
config.apiKey = ENV.VITE_ARCGIS_LAYER_API_KEY;

// context
import { useClientsData } from "@/context/clientsData/useClientsData";

export default function ClientDetailsMap() {

    const { definitionExpression } = useClientsData();

    

    useEffect(() => {    
        
        const orchardLayer = createOrchardsLayer(definitionExpression);

        const map = new ArcGISMap({
            layers: [orchardLayer],
            basemap: "arcgis/imagery"      
          });
      
          // Create map view
          const view = new MapView({
            container: "viewDiv",
            map: map,
            center: MAP_CONFIG.DEFAULT_CENTER,
            zoom: MAP_CONFIG.DEFAULT_ZOOM,
          });
      
          view.ui.move("zoom", "bottom-right");

        // Cleanup on unmount
        return () => {
            if (view) {
            view.destroy();
            }
        };
    
    }, [definitionExpression]);

    return (
        <div id="viewDiv" className="w-full h-[300px]" />
    )
}