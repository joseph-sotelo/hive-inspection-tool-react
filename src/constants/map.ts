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
  SHOW_ALL: "1=1" // Expression to show all features
} as const;

// ArcGIS field names - centralizing to prevent typos
export const ORCHARD_FIELD_NAMES = {
  // Orchard layer fields
  F_STATUS: "F_status",
  FIELDMAP_ID_PRIMARY: "fieldmap_id_primary", 
  CLIENT: "client",
  PARTDELIV_YN: "partdeliv_yn",
  HIVES_CONTRACTED: "hives_contracted",
  BEEKEEPER: "beekeeper",
  BEE_BROKER: "bee_broker",
  AVERAGE: "mean_frameshive",
  MINIMUM: "minimum",
  GROWER: "grower",
  FIELDMAP_ID_AUXILIARY: "fieldmap_id_auxiliary",
  CROSSROADS: "crossroads",
  TEAM_LEADER: "team_leader",
  ASSISTANTS: "assistants",
  F_RECORD_ID: "F_record_id",
  OBJECT_ID: "ObjectId",
  INSPECTION_DATE: "inspection_date",
  LATITUDE: "F_latitude",
  LONGITUDE: "F_longitude",
  DATE_PARTDELIV: "date_partdeliv",
  DATE_FULLDELIV: "date_fulldeliv",
  AVG_CONTRACTED: "average",
} as const;

export const HIVEDROP_FIELD_NAMES = {
  OBJECT_ID: "ObjectId",
  F_RECORD_ID: "F_record_id",
  HIVES_COUNTED: "hives_counted",
  HIVES_GRADED: "hives_graded",
  AVERAGE: "avg_",
  GRADES: [
    "grade1",
    "grade2",
    "grade3",
    "grade4",
    "grade5",
    "grade6",
    "grade7",
    "grade8",
    "grade9",
    "grade10",
    "grade11",
    "grade12",
    "grade13",
    "grade14",
    "grade15",
    "grade16",
    "grade17",
    "grade18",
    "grade19",
    "grade20",
    "grade21",
    "grade22",
    "grade23",
    "grade24"
  ],
  NOTES: "notes",
  INDEX: "F_index"
}

export const PERIMITERS_FIELD_NAMES = {
  MAP_ID: "mapId"
}

export const PERIMITERS_LAYER_SYMBOL = {  
  FILL_COLOR: [211, 247, 5, 0.3],  
  OUTLINE_COLOR: [211, 247, 5, 1],
  OUTLINE_WIDTH: 3
}

export const PERIMITERS_LAYER_SYMBOL_BLUE = {  
  FILL_COLOR: [7, 229, 250, 0.3],  
  OUTLINE_COLOR: [7, 229, 250, 1],
  OUTLINE_WIDTH: 3
}