import "@arcgis/core/assets/esri/themes/light/main.css";

import { useEffect } from "react";

import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;
const featureLayerURL = import.meta.env.VITE_ARCGIS_MOCK_LAYER_API_URL as string;

export default function Map() {

  useEffect(() => {

    const layer = new FeatureLayer({
      url: featureLayerURL
    });

    const map = new ArcGISMap({
      basemap: "arcgis/outdoor",
      layers: [layer],
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-119.4179, 36.7783],
      zoom: 10,
    });

    // get feature attributes when the feature is clicked
    view.on("click", async (event) => {

      const response = await view.hitTest(event);
      // make sure the feature is the right type - a graphic
      const feature = response.results.find((result): result is __esri.MapViewGraphicHit => result.type ==="graphic")
        
      if (feature) {
        console.log(feature.graphic.attributes);
      }
      
    });

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return (
      <div id="viewDiv" style={{ height: "100vh", width: "100vw" }}></div>
  );
}