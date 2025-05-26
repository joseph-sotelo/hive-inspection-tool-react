import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { FormData } from "../types";
import { ORCHARD_FIELD_NAMES } from "@/constants";

// Handle feature updates to ArcGIS server
export const createFeatureUpdater = (orchardLayer: FeatureLayer, featureObjectIdRef: { current: number }) => {
  return (formData: FormData) => {
    // Package form data for ArcGIS applyEdits
    const updates = new Graphic({
      attributes: {
        [ORCHARD_FIELD_NAMES.OBJECT_ID]: featureObjectIdRef.current,
        [ORCHARD_FIELD_NAMES.FIELDMAP_ID_PRIMARY]: formData.fieldmap_id_primary,
        [ORCHARD_FIELD_NAMES.PARTDELIV_YN]: formData.partdeliv_yn,
        [ORCHARD_FIELD_NAMES.HIVES_CONTRACTED]: formData.hives_contracted,
        [ORCHARD_FIELD_NAMES.BEEKEEPER]: formData.beekeeper,
        [ORCHARD_FIELD_NAMES.BEE_BROKER]: formData.bee_broker,
        [ORCHARD_FIELD_NAMES.AVERAGE]: formData.average,
        [ORCHARD_FIELD_NAMES.MINIMUM]: formData.minimum,
        [ORCHARD_FIELD_NAMES.CLIENT]: formData.client,
        [ORCHARD_FIELD_NAMES.GROWER]: formData.grower,
        [ORCHARD_FIELD_NAMES.FIELDMAP_ID_AUXILIARY]: formData.fieldmap_id_auxiliary,
        [ORCHARD_FIELD_NAMES.CROSSROADS]: formData.crossroads,
        [ORCHARD_FIELD_NAMES.TEAM_LEADER]: formData.team_leader,
        [ORCHARD_FIELD_NAMES.ASSISTANTS]: formData.assistants
      }
    });

    // Apply updates to server
    orchardLayer
      .applyEdits({ updateFeatures: [updates] })
      .then((result) => {
        console.log("Update result: ", result);
      })
      .catch((error) => {
        console.error("Error applying edits: ", error);
      });
  };
};