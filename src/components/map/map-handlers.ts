import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import { MobileSheetProps } from "../types";
import { MAP_CONFIG, ORCHARD_FIELD_NAMES, LAYER_EXPRESSIONS, HIVEDROP_FIELD_NAMES } from "@/constants";

// hooks
import { useArrayPush } from "@/hooks";

// Handle feature selection and layer visibility
export const handleFeatureSelection = (
  feature: __esri.Graphic,
  orchardLayer: FeatureLayer,
  hiveDropsLayer: FeatureLayer,
  perimitersLayer: FeatureLayer,
  view: MapView,
  setMobileSheetProps: (props: MobileSheetProps) => void,
  setIsMobileSheetOpen: (open: boolean) => void,
  updateFeature: (formData: any) => void,
  setHivesCounted: (hivesCounted: number[]) => void,
  setHivesGraded: (hivesGraded: number[]) => void,
  setAverage: (average: number[]) => void,  
  hivesCounted: number[],
  hivesGraded: number[],
  average: number[]
) => {
  // Show details for selected feature and hide everything else
  orchardLayer.visible = false;
  hiveDropsLayer.definitionExpression = `${HIVEDROP_FIELD_NAMES.F_RECORD_ID} = '${feature.attributes[ORCHARD_FIELD_NAMES.F_RECORD_ID]}'`;
  perimitersLayer.definitionExpression = `${ORCHARD_FIELD_NAMES.CLIENT} = '${feature.attributes[ORCHARD_FIELD_NAMES.CLIENT]}'`;
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
    client: feature.attributes[ORCHARD_FIELD_NAMES.CLIENT],
    F_status: feature.attributes[ORCHARD_FIELD_NAMES.F_STATUS],
    fieldmap_id_primary: feature.attributes[ORCHARD_FIELD_NAMES.FIELDMAP_ID_PRIMARY],
    partdeliv_yn: feature.attributes[ORCHARD_FIELD_NAMES.PARTDELIV_YN],
    hives_contracted: feature.attributes[ORCHARD_FIELD_NAMES.HIVES_CONTRACTED],
    beekeeper: feature.attributes[ORCHARD_FIELD_NAMES.BEEKEEPER],
    bee_broker: feature.attributes[ORCHARD_FIELD_NAMES.BEE_BROKER],
    average: feature.attributes[ORCHARD_FIELD_NAMES.AVERAGE],
    minimum: feature.attributes[ORCHARD_FIELD_NAMES.MINIMUM],
    grower: feature.attributes[ORCHARD_FIELD_NAMES.GROWER],
    fieldmap_id_auxiliary: feature.attributes[ORCHARD_FIELD_NAMES.FIELDMAP_ID_AUXILIARY],
    crossroads: feature.attributes[ORCHARD_FIELD_NAMES.CROSSROADS],
    team_leader: feature.attributes[ORCHARD_FIELD_NAMES.TEAM_LEADER],
    assistants: feature.attributes[ORCHARD_FIELD_NAMES.ASSISTANTS],
    onMarkComplete: updateFeature
  };

  setMobileSheetProps(mobileSheetContent);
  setIsMobileSheetOpen(true);  

  // gets attributes from each visible hivedrop
  const loopThroughHiveDrops = async () => {
    const query = hiveDropsLayer.createQuery();
    query.where = `${HIVEDROP_FIELD_NAMES.F_RECORD_ID} = '${feature.attributes[ORCHARD_FIELD_NAMES.F_RECORD_ID]}'`;
    query.returnGeometry = false;
    query.outFields = [HIVEDROP_FIELD_NAMES.HIVES_COUNTED, HIVEDROP_FIELD_NAMES.HIVES_GRADED, HIVEDROP_FIELD_NAMES.AVERAGE];

    try {    
      const results = await hiveDropsLayer.queryFeatures(query);
      results.features.forEach((feature) => {
        setHivesCounted(useArrayPush({ array: hivesCounted, value: feature.attributes[HIVEDROP_FIELD_NAMES.HIVES_COUNTED] }));
        setHivesGraded(useArrayPush({ array: hivesGraded, value: feature.attributes[HIVEDROP_FIELD_NAMES.HIVES_GRADED] }));
        setAverage(useArrayPush({ array: average, value: feature.attributes[HIVEDROP_FIELD_NAMES.AVERAGE] }));

        console.log("hivesCounted: ", hivesCounted);
        console.log("hivesGraded: ", hivesGraded);
        console.log("average: ", average);
      });
    } catch (error) {
      console.error("Error querying hive drops:", error);
    }
  }

  loopThroughHiveDrops();
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