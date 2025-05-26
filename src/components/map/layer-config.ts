// Centralized layer configuration for better maintainability
// By separating layer configs, we make the code easier to test and modify
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { symbolAlert, symbolFail, symbolLow, symbolPass, symbolHiveDrop } from "@/assets/symbols";
import { ORCHARD_FIELD_NAMES, LAYER_EXPRESSIONS, HIVEDROP_FIELD_NAMES } from "@/constants";

// Validated environment variables - ensures all required config is present
import { ENV } from "@/utils/env-validation";

// Create orchards layer with proper field mapping
export const createOrchardsLayer = () => {
  const layer = new FeatureLayer({
    url: ENV.VITE_ARCGIS_ORCHARDS_LAYER_API_URL,
    outFields: [
      ORCHARD_FIELD_NAMES.F_STATUS,
      ORCHARD_FIELD_NAMES.FIELDMAP_ID_PRIMARY,
      ORCHARD_FIELD_NAMES.CLIENT,
      ORCHARD_FIELD_NAMES.PARTDELIV_YN,
      ORCHARD_FIELD_NAMES.HIVES_CONTRACTED,
      ORCHARD_FIELD_NAMES.BEEKEEPER,
      ORCHARD_FIELD_NAMES.BEE_BROKER,
      ORCHARD_FIELD_NAMES.AVERAGE,
      ORCHARD_FIELD_NAMES.MINIMUM,
      ORCHARD_FIELD_NAMES.GROWER,
      ORCHARD_FIELD_NAMES.FIELDMAP_ID_AUXILIARY,
      ORCHARD_FIELD_NAMES.CROSSROADS,
      ORCHARD_FIELD_NAMES.TEAM_LEADER,
      ORCHARD_FIELD_NAMES.ASSISTANTS,
      ORCHARD_FIELD_NAMES.F_RECORD_ID
    ]
  });

  // Apply status-based symbology
  layer.renderer = {
    type: "unique-value",
    field: ORCHARD_FIELD_NAMES.F_STATUS,
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
    url: ENV.VITE_ARCGIS_HIVEDROPS_LAYER_API_URL,
    outFields: [HIVEDROP_FIELD_NAMES.F_RECORD_ID, HIVEDROP_FIELD_NAMES.HIVES_COUNTED, HIVEDROP_FIELD_NAMES.HIVES_GRADED, HIVEDROP_FIELD_NAMES.AVERAGE],
    definitionExpression: LAYER_EXPRESSIONS.HIDE_ALL // Hide by default
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
    url: ENV.VITE_ARCGIS_PERIMITERS_LAYER_API_URL,
    outFields: [ORCHARD_FIELD_NAMES.CLIENT],
    definitionExpression: LAYER_EXPRESSIONS.HIDE_ALL // Hide by default
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