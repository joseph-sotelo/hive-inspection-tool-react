import { useEffect, useState } from "react";

// arcgis imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import "@arcgis/core/assets/esri/themes/light/main.css";

// env setup
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;
const featureLayerURL = import.meta.env
  .VITE_ARCGIS_MOCK_LAYER_API_URL as string;

// ui imports
import MobileSheet from "./mobile-sheet";
import { useIndicationData } from "@/context/IndicationData";
import MyTest from "./test";

export default function Map() {
  type OrchardFeature = {
    F_title: string;
    F_status: string;
    x: number;
    y: number;
  };

  type MobileSheetProps = {
    F_title: string;
    F_status: string;
  };

  const [selectedFeature, setSelectedFeature] = useState<OrchardFeature | null>(
    null
  );
  const [mobileSheetProps, setMobileSheetProps] =
    useState<MobileSheetProps | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const { isShown } = useIndicationData();

  // useEffect endures DOM is loaded for arcGIS core elements before they are created
  useEffect(() => {
    // creates featurelayer showing all orchards
    const orchardLayer = new FeatureLayer({
      url: featureLayerURL,
      outFields: ["F_title", "F_status"],
    });

    // creates map showing all layers
    const map = new ArcGISMap({
      basemap: "arcgis/outdoor",
      layers: [orchardLayer],
    });

    // renders the map
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-119.4179, 36.7783],
      zoom: 10,
    });

    view.on("click", async (event) => {
      // get the feature that the user clicked
      const response = await view.hitTest(event);
      // make sure the feature is the right type - a graphic
      const feature = response.results.find(
        (result): result is __esri.MapViewGraphicHit =>
          result.type === "graphic"
      );
      // get attributes from the selected feature and store them in state so they can be reflected in the popup
      if (feature) {
        // get the geometry of the feature to access the x and y coordinates
        const mapPoint = feature.graphic.geometry as __esri.Point;
        let x = 0;
        let y = 0;
        // if statement for safety
        if (mapPoint) {
          // convert mercador coords to pixel coords
          const screenPoint = view.toScreen(mapPoint);
          // if statement for safety
          if (screenPoint) {
            x = screenPoint.x;
            y = screenPoint.y;
          }
        }
        // create an object to store in state
        const selectedFeatureContent = {
          F_title: feature.graphic.attributes.F_title,
          F_status: feature.graphic.attributes.F_status,
          x: x,
          y: y,
        };

        const mobileSheetContent = {
          F_title: feature.graphic.attributes.F_title,
          F_status: feature.graphic.attributes.F_status,
        };
        // store the object in state
        setSelectedFeature(selectedFeatureContent);
        setMobileSheetProps(mobileSheetContent);
        setIsSelected(true);
      } else {
        // causes popover to disappear when user clicks away
        setSelectedFeature(null);
      }
    });

    // cleanup function to prevent memory leaks and clear event listeners
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  console.log("does map component render?");
  console.log("is it shown?", isShown);

  // returns the rendered map
  return (
    <div>
      {isSelected && mobileSheetProps && (
        <MobileSheet props={mobileSheetProps} />
      )}
      <MyTest />
      DOES THIS RENDER
      {isShown ? <div>this only renders if isShown</div> : null}
      {/* <div id="viewDiv" className="w-full h-screen">
        {" "}
      </div> */}
    </div>
  );
}
