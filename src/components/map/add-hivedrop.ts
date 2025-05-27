import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { HIVEDROP_FIELD_NAMES } from "@/constants";

// Handle feature updates to ArcGIS server
export const addHiveDrop = (
  hiveDropLayer: FeatureLayer,
  hiveDropIndex: number,
  // hiveDropLocations: number[][],
  hiveDropHiveGrades: number[],
  notes: string[],
  recordId: string,
  userLocation: number[]
) => {  
 
  const newHiveDrop = new Graphic({
    geometry: {
      type: "point",
      x: userLocation[0],
      y: userLocation[1]
    },
    attributes: {
      [HIVEDROP_FIELD_NAMES.OBJECT_ID]: hiveDropIndex,
      ...HIVEDROP_FIELD_NAMES.GRADES.reduce((acc, grade, index) => ({
        ...acc,
        [grade]: hiveDropHiveGrades[index]
      }), {}),
      [HIVEDROP_FIELD_NAMES.NOTES]: notes[hiveDropIndex],
      [HIVEDROP_FIELD_NAMES.F_RECORD_ID]: recordId,
      "F_latitude": userLocation[1],
      "F_longitude": userLocation[0]
    }
  });

  // Apply updates to server
  hiveDropLayer
    .applyEdits({ addFeatures: [newHiveDrop] })
    .then((result) => {
      console.log("Update result: ", result);
    })
    .catch((error) => {
      console.error("Error applying edits: ", error);
    });
};