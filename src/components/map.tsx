import "@arcgis/core/assets/esri/themes/light/main.css";

import { useEffect } from "react";

import MobileSheet from "./mobile-sheet";

import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;

export default function Map() {

  useEffect(() => {

    const layer = new FeatureLayer({
      url: "https://services3.arcgis.com/rejQdffKHRccBBY1/arcgis/rest/services/bee_inspector_test_data/FeatureServer/0",
    //   definitionExpression: "",
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

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div id="viewDiv" style={{ height: "100vh", width: "100vw" }} className="absolute z-[-1]"></div>
      <MobileSheet />
    </div>
  );
}