// map for orchards section of client-details.tsx
// TODO: consider merging this map with the other two maps in the UI for reusability

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

    // used to change the map's displayed features
    const { definitionExpression } = useClientsData();

    useEffect(() => {    
        
        const orchardLayer = createOrchardsLayer(definitionExpression);

        const map = new ArcGISMap({
            layers: [orchardLayer],
            basemap: "arcgis/outdoor"      
          });
      
          // Create map view
          const view = new MapView({
            container: "viewDiv",
            map: map,
            center: MAP_CONFIG.DEFAULT_CENTER,
            zoom: MAP_CONFIG.DEFAULT_ZOOM,
          });
      
          view.ui.move("zoom", "bottom-right");

          // Zoom to features when layer loads
          orchardLayer.when(() => {
            view.whenLayerView(orchardLayer).then((layerView) => {
              // Wait for layer view to finish updating
              layerView.when(() => {
                // Query the extent of visible features
                const query = orchardLayer.createQuery();
                query.where = definitionExpression || "1=1";
                
                orchardLayer.queryExtent(query).then((result) => {
                  if (result.extent && !result.extent.isEmpty) {
                    // Zoom to the extent with more padding
                    view.goTo(result.extent.expand(1.1));
                  }
                });
              });
            });
          });

        // Cleanup on unmount
        return () => {
            if (view) {
            view.destroy();
            }
        };
    
    }, [definitionExpression]);

    return (
        <div id="viewDiv" className="w-full border border-border rounded-md h-full overflow-hidden" />
    )
}