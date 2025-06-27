// displays a map of the orchard and hivedrops. Used within the orchard report

// ArcGIS imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import "@arcgis/core/assets/esri/themes/light/main.css";

// Map utilities
import { HIVEDROP_FIELD_NAMES, MAP_CONFIG, PERIMITERS_FIELD_NAMES } from "@/constants";
import { ENV } from "@/lib/utils/env-validation";
import { useEffect } from "react";

// Environment setup with validation
config.apiKey = ENV.VITE_ARCGIS_LAYER_API_KEY;

// ArcGIS
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

// for map building and customization
import { symbolHiveFail, symbolHiveLow, symbolHivePass, symbolHiveNoData } from "@/assets/symbols";
import { createPerimitersLayer } from "@/components/map/layer-config";

// Context
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";
import { getHiveDropData } from "@/components/map/map-handlers";

export default function MapSection() {
    // get relevant values and hooks from context. Used to control the map's definition expressions and set info from the map to be used elsewhere in the report
    const { recordId, fieldmapIdPrimary, setHiveDropData } = useOrchardReportData();

    // create the definition expression for the map
    const definitionExpression = `${HIVEDROP_FIELD_NAMES.F_RECORD_ID} = '${recordId}'`;

    // assemples the map components
    useEffect(() => {            

        // function used to create the hive drops featureLayer
        const createHiveDropsLayer = () => {
            const layer = new FeatureLayer({
              url: ENV.VITE_ARCGIS_HIVEDROPS_LAYER_API_URL,
              outFields: [],
              definitionExpression: definitionExpression  
            });
          
            // set custom symbology
            layer.renderer = {
              type: "class-breaks",
              field: HIVEDROP_FIELD_NAMES.AVERAGE,
              defaultSymbol: symbolHiveNoData,
              defaultLabel: "No Data",
              classBreakInfos: [
                {
                  minValue: 0,
                  maxValue: 4.9,
                  symbol: symbolHiveFail,
                  label: "Low (0-5)"
                },
                {
                  minValue: 5,
                  maxValue: 6.9,
                  symbol: symbolHiveLow,
                  label: "Medium (5.01-7)"
                },
                {
                  minValue: 7,
                  maxValue: 24,
                  symbol: symbolHivePass,
                  label: "High (7.01-24)"
                }
              ]
            };
          
            return layer;
          };

        // create the layers
        const perimitersLayer = createPerimitersLayer(`${PERIMITERS_FIELD_NAMES.MAP_ID} = '${fieldmapIdPrimary}'`);
        const hiveDropsLayer = createHiveDropsLayer();

        // data from the map will be used elsewhere in the report so this hook stores it in context
        getHiveDropData(hiveDropsLayer, setHiveDropData, definitionExpression);

        // create map from layers
        const map = new ArcGISMap({
            layers: [perimitersLayer, hiveDropsLayer],
            basemap: "arcgis/imagery"      
          });
      
          // Create map view
          const view = new MapView({
            container: "viewDiv",
            map: map,
            center: MAP_CONFIG.DEFAULT_CENTER,
            zoom: MAP_CONFIG.DEFAULT_ZOOM,
          });
      
          // remove the zoom widget because this map is for display only
          view.ui.remove("zoom");

          // Zoom to the perimeters layer once it loads
          if (recordId) {
            perimitersLayer.when(() => {
              perimitersLayer.queryExtent().then((result) => {
                if (result.extent) {
                  view.goTo(                  
                  {
                    target: result.extent.expand(1.1),
                    padding: MAP_CONFIG.ZOOM_PADDING
                  },
                {
                  animate: false
                },);
                }
              });
            });
          }

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