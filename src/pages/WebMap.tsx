import "@arcgis/core/assets/esri/themes/light/main.css";

import { useEffect } from "react";

import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { useParams } from "react-router-dom";


config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;

export default function WebMap() {

    const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (!slug) return; // Don't run if slug is missing

    const layer = new FeatureLayer({
      url: "https://services3.arcgis.com/rejQdffKHRccBBY1/arcgis/rest/services/bee_inspector_2023/FeatureServer/0",
      definitionExpression: `client = '${decodeURI(slug)}'`,
    });

    const map = new ArcGISMap({
      basemap: "arcgis/outdoor",
      layers: [layer],
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-96.7969, 32.7767], // Optional: Dallas, TX
      zoom: 10,
    });

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [slug]);

  return (
    <div id="viewDiv" style={{ height: "100vh", width: "100vw" }}></div>
  );
}
