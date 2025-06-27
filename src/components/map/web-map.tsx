import { useEffect, useState, useRef } from "react";

// ArcGIS imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Track from "@arcgis/core/widgets/Track";
import "@arcgis/core/assets/esri/themes/light/main.css";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

// UI imports
import { OrchardDetailsMobile, OrchardDetailsDesktop } from "../orchard-details";
import InspectionControls from "../inspection-controls/inspection-controls";
import { OrchardDetailsProps, HiveDropDialogProps } from "../types";
import HiveDropDialog from "../hivedrop-dialog/hivedrop-dialog";

// Map utilities
import { createOrchardsLayer, createHiveDropsLayer, createPerimitersLayer } from "./layer-config";
import { handleOrchardFeatureSelection, handleDeselection, handleHiveDropFeatureSelection } from "./map-handlers";
import { createFeatureUpdater } from "./feature-updater";
import { LAYER_EXPRESSIONS, MAP_CONFIG, ORCHARD_FIELD_NAMES } from "@/constants";
import { ENV } from "@/utils/env-validation";
import { addHiveDrop } from "./add-hivedrop";

// Custom hooks
import { useMediaQuery } from "@/hooks";

// context
import { useInspectionData } from "@/context/inspectionData/useInspectionData";
import { useOrchardDetailsData } from "@/context/orchardDetailsData/useOrchardDetailsData";

// Environment setup with validation
config.apiKey = ENV.VITE_ARCGIS_LAYER_API_KEY;

export default function Map() { 

  const { 
    totalHivesContracted, 
    setTotalHivesContracted, 
    setHivesCounted, 
    setHivesGraded, 
    setAverage, 
    setIsHiveDropDialogOpen,
    setUserLocation,
    applyHiveDrop,
    setRecordId,
    hiveDropIndex,
    hiveDropHiveGrades,
    notes,
    recordId,
    userLocation,
    hivesCounted,
    average,
    hivesGraded,
    setIsShown
  } = useInspectionData();

  // Responsive breakpoint detection - Tailwind's 'md' is 768px
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // State for mobile sheet
  const [orchardDetailsProps, setOrchardDetailsProps] = useState<OrchardDetailsProps | null>(null);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const { isDesktopSheetOpen, setIsDesktopSheetOpen } = useOrchardDetailsData();

  // State for hive drop dialog
  const [hiveDropDialogProps, setHiveDropDialogProps] = useState<HiveDropDialogProps | null>(null);
  
  // Use ref for feature ID to avoid stale closure issues
  const featureObjectIdRef = useRef<number>(0);
  const hiveDropsLayerRef = useRef<FeatureLayer | null>(null);

  useEffect(() => {
    // Create all feature layers using extracted functions
    const orchardLayer = createOrchardsLayer(LAYER_EXPRESSIONS.SHOW_ALL);
    const hiveDropsLayer = createHiveDropsLayer();
    const perimitersLayer = createPerimitersLayer(LAYER_EXPRESSIONS.HIDE_ALL);
    hiveDropsLayerRef.current = hiveDropsLayer;

    // Create map with all layers
    const map = new ArcGISMap({
      layers: [perimitersLayer, orchardLayer, hiveDropsLayer],
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

    // Add GPS tracking widget
    const track = new Track({
      view: view
    });
    view.ui.add(track, "bottom-right");

    track.start();    

    // Listen for location updates
    track.on("track", (event) => {
      const location = event.position;
      console.log("Track widget location update:", location);
      // The position object has coords property with latitude and longitude
      setUserLocation([location.coords.longitude, location.coords.latitude]);
    });

    // Immediately fetch initial location before waiting on "track" events
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Initial geolocation:", { latitude, longitude });
          setUserLocation([longitude, latitude]); // match your format
        },
        (error) => {
          console.warn("Geolocation not available:", error.message);
          // Set a default location (e.g., Central Valley, CA)
          setUserLocation(MAP_CONFIG.CMD_CENTER);
        },
        {
          enableHighAccuracy: true
        }
      );
    } else {
      // Set default location if geolocation is not supported
      setUserLocation(MAP_CONFIG.DEFAULT_CENTER);
    }

    // Create function for updating orchard features
    const updateFeature = createFeatureUpdater(orchardLayer, featureObjectIdRef);

    // Handle map clicks
    view.on("click", async (event) => {
      // Check if click is within inspection controls
      const inspectionControls = document.getElementById('inspection-controls-wrapper');
      if (inspectionControls && inspectionControls.contains(event.native.target)) {
        return; // Exit early if click is within inspection controls
      }

      // Test for feature hits
      const response = await view.hitTest(event);      
      
      // Find a valid feature (must be from orchardLayer or hiveDropsLayer)
      const feature = response.results.find((result): result is __esri.MapViewGraphicHit => 
        result.type === "graphic" && 
        (result.graphic.layer === orchardLayer || result.graphic.layer === hiveDropsLayer)
      );

      // Handle feature selection or deselection
      if (feature?.graphic) {
        if (feature.graphic.layer === orchardLayer && feature.graphic.attributes[ORCHARD_FIELD_NAMES.FIELDMAP_ID_PRIMARY] != undefined) {
          // Store feature ID for updates
          featureObjectIdRef.current = feature.graphic.attributes[ORCHARD_FIELD_NAMES.OBJECT_ID];

          setIsDesktopSheetOpen(!isDesktopSheetOpen);
          
          handleOrchardFeatureSelection(
            feature.graphic,
            orchardLayer,
            hiveDropsLayer,
            perimitersLayer,
            view,
            setOrchardDetailsProps,
            setIsMobileSheetOpen,            
            updateFeature,
            setHivesCounted,
            setHivesGraded,
            setAverage,          
            setRecordId,
            setTotalHivesContracted
          );

          setTotalHivesContracted(feature.graphic.attributes[ORCHARD_FIELD_NAMES.HIVES_CONTRACTED]);
        } else if (feature.graphic.layer === hiveDropsLayer) {
          setIsHiveDropDialogOpen(true);
          handleHiveDropFeatureSelection(
            feature.graphic,            
            setHiveDropDialogProps,   
            setIsHiveDropDialogOpen,
          );
        }
      } else {

        setIsDesktopSheetOpen(false);

        handleDeselection(
          orchardLayer,
          hiveDropsLayer,
          perimitersLayer,
          setIsMobileSheetOpen,
          setIsShown
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

  // Create function for adding hive drop features
  useEffect(() => {    
    if (applyHiveDrop > 0 && hiveDropsLayerRef.current) {
      addHiveDrop(
        hiveDropsLayerRef.current,
        hiveDropIndex,
        hivesCounted,
        hiveDropHiveGrades,
        notes,
        recordId,
        userLocation,
        average,
        hivesGraded
      );
    }
  }, [applyHiveDrop]);  

  return (
    <div>
      {isMobileSheetOpen && orchardDetailsProps && !isDesktop && ( 

            <OrchardDetailsMobile 
              props={orchardDetailsProps} 
              key={orchardDetailsProps.fieldmap_id_primary}
            />          
      )}
      {isDesktopSheetOpen && orchardDetailsProps && isDesktop && (
            <OrchardDetailsDesktop
              props={orchardDetailsProps} 
              key={orchardDetailsProps.fieldmap_id_primary}
            />
      )}
      
      {/* Conditionally render hive drop dialog */}
      {hiveDropDialogProps && (
        <HiveDropDialog 
          props={hiveDropDialogProps}           
          key={hiveDropDialogProps.record_id}          
        />
      )}
      
      <InspectionControls totalHivesContracted={totalHivesContracted} />
      
      <div id="viewDivWrapper" className="w-full h-screen overflow-hidden">
        <div 
          id="viewDiv" 
          className="w-full h-full relative" 
          style={{ 
            width: '101%', 
            height: '101%', 
            margin: '-0.5%',            
          }} 
        />
      </div>      
    </div>
  );
}