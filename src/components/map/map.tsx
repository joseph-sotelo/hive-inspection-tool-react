import { useEffect, useState, useRef } from "react";

// ArcGIS imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Track from "@arcgis/core/widgets/Track";
import "@arcgis/core/assets/esri/themes/light/main.css";

// UI imports
import { MobileSheet } from "../mobile-sheet";
import InspectionControls from "../inspection-controls/inspection-controls";
import { MobileSheetProps } from "../types";

// Map utilities
import { createOrchardsLayer, createHiveDropsLayer, createPerimitersLayer } from "./layer-config";
import { handleFeatureSelection, handleDeselection } from "./map-handlers";
import { createFeatureUpdater } from "./feature-updater";
import { MAP_CONFIG, ORCHARD_FIELD_NAMES } from "@/constants";
import { ENV } from "@/utils/env-validation";

// context
import { useInspectionData } from "@/context/inspectionData/useInspectionData";

// Environment setup with validation
config.apiKey = ENV.VITE_ARCGIS_LAYER_API_KEY;

export default function Map() { 

  const { setHivesCounted, setHivesGraded, setAverage, hivesCounted, hivesGraded, average } = useInspectionData();

  // State for mobile sheet
  const [mobileSheetProps, setMobileSheetProps] = useState<MobileSheetProps | null>(null);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [totalHivesContracted, setTotalHivesContracted] = useState(0);
  
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
      center: MAP_CONFIG.DEFAULT_CENTER,
      zoom: MAP_CONFIG.DEFAULT_ZOOM,
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
      if (feature?.graphic.attributes[ORCHARD_FIELD_NAMES.FIELDMAP_ID_PRIMARY] != undefined) {
        // Store feature ID for updates
        featureObjectIdRef.current = feature.graphic.attributes[ORCHARD_FIELD_NAMES.OBJECT_ID];
        
        handleFeatureSelection(
          feature.graphic,
          orchardLayer,
          hiveDropsLayer,
          perimitersLayer,
          view,
          setMobileSheetProps,
          setIsMobileSheetOpen,
          updateFeature,
          setHivesCounted,
          setHivesGraded,
          setAverage,          
          hivesCounted,
          hivesGraded,
          average
        );

        setTotalHivesContracted(feature.graphic.attributes[ORCHARD_FIELD_NAMES.HIVES_CONTRACTED]);
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
      <InspectionControls totalHivesContracted={totalHivesContracted} />
      
      {/* Map container */}
      <div id="viewDiv" className="w-full h-screen" />
    </div>
  );
}