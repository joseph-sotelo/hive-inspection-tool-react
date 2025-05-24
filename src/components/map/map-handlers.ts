// Map interaction handlers separated for better organization
// This pattern makes event handling logic easier to test and maintain
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import { MobileSheetProps } from "../types";

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
  hiveDropsLayer.definitionExpression = `F_record_id = '${feature.attributes.F_record_id}'`;
  perimitersLayer.definitionExpression = `client = '${feature.attributes.client}'`;
  hiveDropsLayer.visible = true;
  perimitersLayer.visible = true;
  hiveDropsLayer.refresh();
  perimitersLayer.refresh();
  
  // Zoom to selected feature with padding for mobile sheet
  view.goTo({
    target: feature.geometry,
    zoom: 15,
    padding: {
      top: 25,
      bottom: 200, // Space for mobile sheet
      left: 50,
      right: 50
    }
  });
  
  // Create mobile sheet props from feature attributes
  const mobileSheetContent: MobileSheetProps = {
    client: feature.attributes.client,
    F_status: feature.attributes.F_status,
    fieldmap_id_primary: feature.attributes.fieldmap_id_primary,
    partdeliv_yn: feature.attributes.partdeliv_yn,
    hives_contracted: feature.attributes.hives_contracted,
    beekeeper: feature.attributes.beekeeper,
    bee_broker: feature.attributes.bee_broker,
    average: feature.attributes.average,
    minimum: feature.attributes.minimum,
    grower: feature.attributes.grower,
    fieldmap_id_auxiliary: feature.attributes.fieldmap_id_auxiliary,
    crossroads: feature.attributes.crossroads,
    team_leader: feature.attributes.team_leader,
    assistants: feature.attributes.assistants,
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
  hiveDropsLayer.definitionExpression = "1=0";
  perimitersLayer.visible = false;
  perimitersLayer.definitionExpression = "1=0";
};