// UI-related constants for consistency across components
// Centralizing UI values prevents inconsistencies and makes theming easier
export const SHEET = {
  // Height values for different states
  POSITIONS: {
    HIDDEN: "h-0",
    COLLAPSED: "h-[108px]", 
    EXPANDED: "h-9/10",    
  },
  SIDEBAR_WIDTH: "w-[440px]",
  // Animation duration
  ANIMATION_DURATION: "duration-400"
} as const;

// Status-related constants
export const STATUS_CONFIG = {
  // Status display mappings
  DISPLAY_NAMES: {
    nodata: "no data"
  },
  
  // Delivery status text
  DELIVERY_STATUS: {
    COMPLETE: "complete",
    INCOMPLETE: "incomplete"
  }
} as const;

// Signature canvas configuration
export const SIGNATURE_CANVAS = {
  WIDTH: 270,
  HEIGHT: 200,
  PEN_COLOR: "black",
  BACKGROUND_COLOR: "rgba(255, 255, 255, 1)"
} as const;

export const CORNERS = {
  PARENT: "rounded-lg",
  CHILD: "rounded-md"
}
