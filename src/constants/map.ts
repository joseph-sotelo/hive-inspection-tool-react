// Map-related constants - centralizing magic numbers and strings
// This makes the code more maintainable and reduces duplication
export const MAP_CONFIG = {
  // Default map center (Central Valley, CA)
  DEFAULT_CENTER: [-119.4179, 36.7783] as [number, number],
  DEFAULT_ZOOM: 10,
  
  // Feature selection zoom level
  FEATURE_ZOOM: 15,
  
  // Padding for feature zoom (accounts for mobile sheet)
  ZOOM_PADDING: {
    top: 25,
    bottom: 200, // Space for mobile sheet
    left: 50,
    right: 50
  }
} as const;

// Layer definition expressions
export const LAYER_EXPRESSIONS = {
  HIDE_ALL: "1=0", // Expression to hide all features
} as const;

// ArcGIS field names - centralizing to prevent typos
export const FIELD_NAMES = {
  // Orchard layer fields
  F_STATUS: "F_status",
  FIELDMAP_ID_PRIMARY: "fieldmap_id_primary", 
  CLIENT: "client",
  PARTDELIV_YN: "partdeliv_yn",
  HIVES_CONTRACTED: "hives_contracted",
  BEEKEEPER: "beekeeper",
  BEE_BROKER: "bee_broker",
  AVERAGE: "average",
  MINIMUM: "minimum",
  GROWER: "grower",
  FIELDMAP_ID_AUXILIARY: "fieldmap_id_auxiliary",
  CROSSROADS: "crossroads",
  TEAM_LEADER: "team_leader",
  ASSISTANTS: "assistants",
  F_RECORD_ID: "F_record_id",
  OBJECT_ID: "ObjectId"
} as const;