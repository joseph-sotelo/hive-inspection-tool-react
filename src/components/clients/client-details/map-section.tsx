// Map that displays all orchards for a given client. USed in client-details.tsx

// ArcGIS imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import "@arcgis/core/assets/esri/themes/light/main.css";

// Map utilities
import { createOrchardsLayer } from "@/components/map/layer-config";
import { MAP_CONFIG } from "@/constants";
import { ENV } from "@/lib/utils/env-validation";
import { useEffect } from "react";

// Environment setup
config.apiKey = ENV.VITE_ARCGIS_LAYER_API_KEY;

// context
import { useClientsData } from "@/context/clientsData/useClientsData";

export default function MapSection() {

    const { definitionExpression } = useClientsData();

    useEffect(() => {   
        // create feature layer
        const orchardLayer = createOrchardsLayer(definitionExpression);
        // create map
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