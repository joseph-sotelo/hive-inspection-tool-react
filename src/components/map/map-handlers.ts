// Map interaction handlers separated for better organization
// This pattern makes event handling logic easier to test and maintain
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import { MobileSheetProps } from "../types";
import { MAP_CONFIG, FIELD_NAMES, LAYER_EXPRESSIONS } from "@/constants";

// Handle feature selection and layer visibility
export const handleFeatureSelection = (
  feature: __esri.Graphic,
  orchardLayer: FeatureLayer,
  hiveDropsLayer: FeatureLayer,
  perimitersLayer: FeatureLayer,
  view: MapView,
  setMobileSheetProps: (props: MobileSheetProps) => void,
  setIsMobileSheetOpen: (open: boolean) => void,
  updateFeature: (formData: any) => void
) => {
  // Show details for selected feature and hide everything else
  orchardLayer.visible = false;
  hiveDropsLayer.definitionExpression = `${FIELD_NAMES.F_RECORD_ID} = '${feature.attributes[FIELD_NAMES.F_RECORD_ID]}'`;
  perimitersLayer.definitionExpression = `${FIELD_NAMES.CLIENT} = '${feature.attributes[FIELD_NAMES.CLIENT]}'`;
  hiveDropsLayer.visible = true;
  perimitersLayer.visible = true;
  hiveDropsLayer.refresh();
  perimitersLayer.refresh();
  
  // Zoom to selected feature with padding for mobile sheet
  view.goTo({
    target: feature.geometry,
    zoom: MAP_CONFIG.FEATURE_ZOOM,
    padding: MAP_CONFIG.ZOOM_PADDING
  });
  
  // Create mobile sheet props from feature attributes
  const mobileSheetContent: MobileSheetProps = {
    client: feature.attributes[FIELD_NAMES.CLIENT],
    F_status: feature.attributes[FIELD_NAMES.F_STATUS],
    fieldmap_id_primary: feature.attributes[FIELD_NAMES.FIELDMAP_ID_PRIMARY],
    partdeliv_yn: feature.attributes[FIELD_NAMES.PARTDELIV_YN],
    hives_contracted: feature.attributes[FIELD_NAMES.HIVES_CONTRACTED],
    beekeeper: feature.attributes[FIELD_NAMES.BEEKEEPER],
    bee_broker: feature.attributes[FIELD_NAMES.BEE_BROKER],
    average: feature.attributes[FIELD_NAMES.AVERAGE],
    minimum: feature.attributes[FIELD_NAMES.MINIMUM],
    grower: feature.attributes[FIELD_NAMES.GROWER],
    fieldmap_id_auxiliary: feature.attributes[FIELD_NAMES.FIELDMAP_ID_AUXILIARY],
    crossroads: feature.attributes[FIELD_NAMES.CROSSROADS],
    team_leader: feature.attributes[FIELD_NAMES.TEAM_LEADER],
    assistants: feature.attributes[FIELD_NAMES.ASSISTANTS],
    onMarkComplete: updateFeature
  };

  setMobileSheetProps(mobileSheetContent);
  setIsMobileSheetOpen(true);
};

// Handle deselection (clicking empty space)
export const handleDeselection = (
  orchardLayer: FeatureLayer,
  hiveDropsLayer: FeatureLayer,
  perimitersLayer: FeatureLayer,
  setIsMobileSheetOpen: (open: boolean) => void
) => {
  setIsMobileSheetOpen(false);
  // Return map to showing all orchards
  orchardLayer.visible = true;
  hiveDropsLayer.visible = false;
  hiveDropsLayer.definitionExpression = LAYER_EXPRESSIONS.HIDE_ALL;
  perimitersLayer.visible = false;
  perimitersLayer.definitionExpression = LAYER_EXPRESSIONS.HIDE_ALL;
};