// Refactored map component with separated concerns
// This approach makes the component easier to understand and maintain
import { useEffect, useState, useRef } from "react";

// ArcGIS imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Track from "@arcgis/core/widgets/Track";
import "@arcgis/core/assets/esri/themes/light/main.css";

// Local imports
import MobileSheet from "../mobile-sheet/mobile-sheet";
import InspectionControls from "../inspection-controls";
import { MobileSheetProps } from "../types";

// Map utilities (separated for better organization)
import { createOrchardsLayer, createHiveDropsLayer, createPerimitersLayer } from "./layer-config";
import { handleFeatureSelection, handleDeselection } from "./map-handlers";
import { createFeatureUpdater } from "./feature-updater";

// Environment setup
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;

export default function Map() {
  // State for mobile sheet
  const [mobileSheetProps, setMobileSheetProps] = useState<MobileSheetProps | null>(null);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  
  // Use ref for feature ID to avoid stale closure issues
  const featureObjectIdRef = useRef<number>(0);

  useEffect(() => {
    // Create all feature layers using extracted functions
    const orchardLayer = createOrchardsLayer();
    const hiveDropsLayer = createHiveDropsLayer();
    const perimitersLayer = createPerimitersLayer();

    // Create map with all layers
    const map = new ArcGISMap({
      basemap: "arcgis/imagery",
      layers: [perimitersLayer, orchardLayer, hiveDropsLayer]
    });

    // Create map view
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-119.4179, 36.7783],
      zoom: 10,
    });

    // Add GPS tracking widget
    const track = new Track({
      view: view
    });
    view.ui.add(track, "top-right");
    track.start();

    // Create feature updater function
    const updateFeature = createFeatureUpdater(orchardLayer, featureObjectIdRef);

    // Handle map clicks
    view.on("click", async (event) => {
      // Test for feature hits
      const response = await view.hitTest(event);
      const feature = response.results.find((result): result is __esri.MapViewGraphicHit => 
        result.type === "graphic"
      );

      // Handle feature selection or deselection
      if (feature?.graphic.attributes.fieldmap_id_primary != undefined) {
        // Store feature ID for updates
        featureObjectIdRef.current = feature.graphic.attributes.ObjectId;
        
        handleFeatureSelection(
          feature.graphic,
          orchardLayer,
          hiveDropsLayer,
          perimitersLayer,
          view,
          setMobileSheetProps,
          setIsMobileSheetOpen,
          updateFeature
        );
      } else {
        handleDeselection(
          orchardLayer,
          hiveDropsLayer,
          perimitersLayer,
          setIsMobileSheetOpen
        );
      }
    });

    // Cleanup on unmount
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return (
    <div>
      {/* Conditionally render mobile sheet */}
      {isMobileSheetOpen && mobileSheetProps && (
        <MobileSheet 
          props={mobileSheetProps} 
          key={mobileSheetProps.fieldmap_id_primary}
        />
      )}
      
      {/* Always render inspection controls */}
      <InspectionControls />
      
      {/* Map container */}
      <div id="viewDiv" className="w-full h-screen" />
    </div>
  );
}