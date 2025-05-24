// Feature update logic separated for better maintainability
// This makes database operations easier to test and debug
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { FormData } from "../types";
import { FIELD_NAMES } from "@/constants";

// Handle feature updates to ArcGIS server
export const createFeatureUpdater = (orchardLayer: FeatureLayer, featureObjectIdRef: { current: number }) => {
  return (formData: FormData) => {
    // Package form data for ArcGIS applyEdits
    const updates = new Graphic({
      attributes: {
        [FIELD_NAMES.OBJECT_ID]: featureObjectIdRef.current,
        [FIELD_NAMES.FIELDMAP_ID_PRIMARY]: formData.fieldmap_id_primary,
        [FIELD_NAMES.PARTDELIV_YN]: formData.partdeliv_yn,
        [FIELD_NAMES.HIVES_CONTRACTED]: formData.hives_contracted,
        [FIELD_NAMES.BEEKEEPER]: formData.beekeeper,
        [FIELD_NAMES.BEE_BROKER]: formData.bee_broker,
        [FIELD_NAMES.AVERAGE]: formData.average,
        [FIELD_NAMES.MINIMUM]: formData.minimum,
        [FIELD_NAMES.CLIENT]: formData.client,
        [FIELD_NAMES.GROWER]: formData.grower,
        [FIELD_NAMES.FIELDMAP_ID_AUXILIARY]: formData.fieldmap_id_auxiliary,
        [FIELD_NAMES.CROSSROADS]: formData.crossroads,
        [FIELD_NAMES.TEAM_LEADER]: formData.team_leader,
        [FIELD_NAMES.ASSISTANTS]: formData.assistants
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