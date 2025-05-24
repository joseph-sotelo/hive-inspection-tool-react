// Feature update logic separated for better maintainability
// This makes database operations easier to test and debug
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { FormData } from "../types";

// Handle feature updates to ArcGIS server
export const createFeatureUpdater = (orchardLayer: FeatureLayer, featureObjectIdRef: { current: number }) => {
  return (formData: FormData) => {
    // Package form data for ArcGIS applyEdits
    const updates = new Graphic({
      attributes: {
        ObjectId: featureObjectIdRef.current,
        fieldmap_id_primary: formData.fieldmap_id_primary,
        partdeliv_yn: formData.partdeliv_yn,
        hives_contracted: formData.hives_contracted,
        beekeeper: formData.beekeeper,
        bee_broker: formData.bee_broker,
        average: formData.average,
        minimum: formData.minimum,
        client: formData.client,
        grower: formData.grower,
        fieldmap_id_auxiliary: formData.fieldmap_id_auxiliary,
        crossroads: formData.crossroads,
        team_leader: formData.team_leader,
        assistants: formData.assistants
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