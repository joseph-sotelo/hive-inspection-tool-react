// ArcGIS imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import "@arcgis/core/assets/esri/themes/light/main.css";

// Map utilities
import { HIVEDROP_FIELD_NAMES, MAP_CONFIG } from "@/constants";
import { ENV } from "@/utils/env-validation";
import { useEffect } from "react";

// Environment setup with validation
config.apiKey = ENV.VITE_ARCGIS_LAYER_API_KEY;

// context
import { symbolHiveDrop } from "@/assets/symbols";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";

export default function ReportMap() {

    const { recordId } = useOrchardReportData();

    useEffect(() => {    
        
        // const hiveDropsLayer = createHiveDropsLayer();

        const createHiveDropsLayer = () => {
            const layer = new FeatureLayer({
              url: ENV.VITE_ARCGIS_HIVEDROPS_LAYER_API_URL,
              outFields: [
              ],
              definitionExpression: `${HIVEDROP_FIELD_NAMES.F_RECORD_ID} = '775a2e79-6f71-45e0-b9db-499c03be585b'`  
            });
          
            layer.renderer = {
              type: "simple",
              symbol: symbolHiveDrop
            };
          
            return layer;
          };
        
        const hiveDropsLayer = createHiveDropsLayer();

        const map = new ArcGISMap({
            layers: [hiveDropsLayer],
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
    
    }, [recordId]);

    return (
        <div id="viewDiv" className="w-full h-full" />
    )
}