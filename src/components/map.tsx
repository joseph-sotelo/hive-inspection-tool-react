import { useEffect, useState } from "react";

// arcgis imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import "@arcgis/core/assets/esri/themes/light/main.css";

// env setup
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;
const featureLayerURL = import.meta.env.VITE_ARCGIS_MOCK_LAYER_API_URL as string;

export default function Map() {

  type OrchardFeature = {
    F_title: string;
    F_status: string;
  }

  const [selectedFeature, setSelectedFeature] = useState<OrchardFeature | null>(null);

  // useEffect endures DOM is loaded for arcGIS core elements before they are created
  useEffect(() => {
    // creates featurelayer showing all orchards
    const orchardLayer = new FeatureLayer({
      url: featureLayerURL,
      outFields: ["*"]
    });

    // creates map showing all layers
    const map = new ArcGISMap({
      basemap: "arcgis/outdoor",
      layers: [orchardLayer]
    });

    // renders the map
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
        const selectedFeatureContent = {
          F_title: feature.graphic.attributes.F_title,
          F_status: feature.graphic.attributes.F_status
        }
        setSelectedFeature(selectedFeatureContent)
      }

      console.log("selectedFeature title: ", selectedFeature?.F_title);
      
    });

    // cleanup function to prevent memory leaks and clear event listeners
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  // returns the rendered map
  return (
    <div>
      {selectedFeature && (
        <div className="absolute top-0 left-0 z-10 bg-white p-4 m-4 rounded shadow">
          {selectedFeature.F_title}
        </div>
      )}
      <div id="viewDiv" style={{ height: "100vh", width: "100vw" }}>
      </div>
    </div>

  );
}