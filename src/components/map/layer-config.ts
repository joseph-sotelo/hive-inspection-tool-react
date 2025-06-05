// Centralized layer configuration for better maintainability
// By separating layer configs, we make the code easier to test and modify
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { symbolAlert, symbolFail, symbolLow, symbolPass, symbolHivePass, symbolHiveLow, symbolHiveFail, symbolHiveNoData } from "@/assets/symbols";
import { ORCHARD_FIELD_NAMES, LAYER_EXPRESSIONS, HIVEDROP_FIELD_NAMES, PERIMITERS_LAYER_SYMBOL, PERIMITERS_FIELD_NAMES, PERIMITERS_LAYER_SYMBOL_BLUE } from "@/constants";

// Validated environment variables - ensures all required config is present
import { ENV } from "@/utils/env-validation";

// Create orchards layer with proper field mapping
export const createOrchardsLayer = (definitionExpression: string) => {
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
    ],
    definitionExpression: definitionExpression
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
    outFields: [
      HIVEDROP_FIELD_NAMES.F_RECORD_ID, 
      HIVEDROP_FIELD_NAMES.HIVES_COUNTED, 
      HIVEDROP_FIELD_NAMES.HIVES_GRADED, 
      HIVEDROP_FIELD_NAMES.AVERAGE,
      HIVEDROP_FIELD_NAMES.NOTES,
      HIVEDROP_FIELD_NAMES.OBJECT_ID,
      ...HIVEDROP_FIELD_NAMES.GRADES,
      HIVEDROP_FIELD_NAMES.INDEX
    ],
    definitionExpression: LAYER_EXPRESSIONS.HIDE_ALL // Hide by default
  });

  layer.renderer = {
    type: "class-breaks",
    field: HIVEDROP_FIELD_NAMES.AVERAGE,
    defaultSymbol: symbolHiveNoData,
    defaultLabel: "No Data",
    classBreakInfos: [
      {
        minValue: 0,
        maxValue: 4.9,
        symbol: symbolHiveFail,
        label: "Low (0-5)"
      },
      {
        minValue: 5,
        maxValue: 6.9,
        symbol: symbolHiveLow,
        label: "Medium (5.01-7)"
      },
      {
        minValue: 7,
        maxValue: 24,
        symbol: symbolHivePass,
        label: "High (7.01-24)"
      }
    ]
  };

  return layer;
};

// Create perimeters layer (initially hidden)
export const createPerimitersLayer = (definitionExpression: string) => {
  const layer = new FeatureLayer({
    url: ENV.VITE_ARCGIS_PERIMITERS_LAYER_API_URL,
    outFields: [PERIMITERS_FIELD_NAMES.MAP_ID],
    definitionExpression: definitionExpression
  });

  layer.renderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      color: PERIMITERS_LAYER_SYMBOL.FILL_COLOR,
      style: "solid",
      outline: {
        color: PERIMITERS_LAYER_SYMBOL.OUTLINE_COLOR,
        width: PERIMITERS_LAYER_SYMBOL.OUTLINE_WIDTH
      }
    }
  };

  return layer;
};

export const updateDefinitionExpression = (layer: FeatureLayer, definitionExpression: string) => {
  layer.definitionExpression = definitionExpression;
}