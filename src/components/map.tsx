import { useEffect, useState } from "react";

// arcgis imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import "@arcgis/core/assets/esri/themes/light/main.css";
import Graphic from "@arcgis/core/Graphic";


// env setup
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;
const featureLayerURL = import.meta.env.VITE_ARCGIS_MOCK_LAYER_API_URL as string;

// ui imports
import MobileSheet from "./mobile-sheet";

export default function Map() {

  let featureObjectId = 0;

  type FormData = {
    F_title: string,
    F_status: string,
    fieldmap_id_primary: string,
  }

  type MobileSheetProps = {
  F_title: string,
  F_status: string,
  fieldmap_id_primary: string,
  onMarkComplete: (formData: FormData) => void
  }

  const [mobileSheetProps, setMobileSheetProps] = useState<MobileSheetProps | null>(null);

  // useEffect endures DOM is loaded for arcGIS core elements before they are created
  useEffect(() => {
    // creates featurelayer showing all orchards
    const orchardLayer = new FeatureLayer({
      url: featureLayerURL,
      outFields: ["F_title", "F_status", "fieldmap_id_primary"]
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

    const testFunction = (formData: FormData) => {
      console.log(formData);

      const updates = new Graphic({
        attributes: {
          ObjectId: featureObjectId,
          fieldmap_id_primary: formData.fieldmap_id_primary,
        }
      })

      orchardLayer
        .applyEdits({ updateFeatures: [updates]})
        .then((result) => {
          console.log("Update result: ", result);
        })
        .catch((error) => {
          console.error("Error applying edits: ", error);
        })
  }

    view.on("click", async (event) => {

      // get the feature that the user clicked
      const response = await view.hitTest(event);
      // make sure the feature is the right type - a graphic
      const feature = response.results.find((result): result is __esri.MapViewGraphicHit => result.type ==="graphic");
      // get attributes from the selected feature and store them in state so they can be reflected in the sheet
      if (feature) {
        console.log(feature.graphic.attributes)
        const mobileSheetContent = {
          F_title: feature.graphic.attributes.F_title,
          F_status: feature.graphic.attributes.F_status,
          fieldmap_id_primary: feature.graphic.attributes.fieldmap_id_primary,
          onMarkComplete: testFunction,
        }
        featureObjectId = feature.graphic.attributes.ObjectId;
        // store the object in state
        setMobileSheetProps(mobileSheetContent)
      }
      
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
      {mobileSheetProps && <MobileSheet props={mobileSheetProps} />}
      <div id="viewDiv" className="w-full h-screen"> </div>
    </div>
  );
}