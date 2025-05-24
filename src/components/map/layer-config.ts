// Centralized layer configuration for better maintainability
// By separating layer configs, we make the code easier to test and modify
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { symbolAlert, symbolFail, symbolLow, symbolPass, symbolHiveDrop } from "@/assets/symbols";

// Environment variables for layer URLs
const orchardsLayerURL = import.meta.env.VITE_ARCGIS_ORCHARDS_LAYER_API_URL as string;
const hiveDropsLayerURL = import.meta.env.VITE_ARCGIS_HIVEDROPS_LAYER_API_URL as string;
const perimitersLayerURL = import.meta.env.VITE_ARCGIS_PERIMITERS_LAYER_API_URL as string;

// Create orchards layer with proper field mapping
export const createOrchardsLayer = () => {
  const layer = new FeatureLayer({
    url: orchardsLayerURL,
    outFields: [
      "F_status", 
      "fieldmap_id_primary", 
      "client",
      "partdeliv_yn",
      "hives_contracted",
      "beekeeper",
      "bee_broker",
      "average",
      "minimum",
      "grower",
      "fieldmap_id_auxiliary",
      "crossroads",
      "team_leader",
      "assistants",
      "F_record_id"
    ]
  });

  // Apply status-based symbology
  layer.renderer = {
    type: "unique-value",
    field: "F_status",
    uniqueValueInfos: [
      { value: "nodata_fulldeliv", symbol: symbolAlert },
      { value: "nodata_partdeliv", symbol: symbolAlert },
      { value: "fail_comp", symbol: symbolFail },
      { value: "fail_incomp", symbol: symbolFail },
      { value: "low_comp", symbol: symbolLow },
      { value: "low_incomp", symbol: symbolLow },
      { value: "pass_comp", symbol: symbolPass },
      { value: "pass_incomp", symbol: symbolPass }
    ]
  };

  return layer;
};

// Create hive drops layer (initially hidden)
export const createHiveDropsLayer = () => {
  const layer = new FeatureLayer({
    url: hiveDropsLayerURL,
    outFields: ["F_record_id"],
    definitionExpression: "1=0" // Hide by default
  });

  layer.renderer = {
    type: "simple",
    symbol: symbolHiveDrop
  };

  return layer;
};

// Create perimeters layer (initially hidden)
export const createPerimitersLayer = () => {
  const layer = new FeatureLayer({
    url: perimitersLayerURL,
    outFields: ["client"],
    definitionExpression: "1=0" // Hide by default
  });

  layer.renderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: [211, 247, 5, 0.3],
      style: "solid",
      outline: {
        color: [211, 247, 5, 1],
        width: 3
      }
    }
  };

  return layer;
};