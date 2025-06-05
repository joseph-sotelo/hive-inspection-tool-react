import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import { HiveDropData, HiveDropDialogProps, OrchardDetailsProps } from "../types";
import { MAP_CONFIG, ORCHARD_FIELD_NAMES, LAYER_EXPRESSIONS, HIVEDROP_FIELD_NAMES, PERIMITERS_FIELD_NAMES } from "@/constants";

// Handle feature selection and layer visibility
export const handleOrchardFeatureSelection = (
  feature: __esri.Graphic,
  orchardLayer: FeatureLayer,
  hiveDropsLayer: FeatureLayer,
  perimitersLayer: FeatureLayer,
  view: MapView,
  setMobileSheetProps: (props: OrchardDetailsProps) => void,
  setIsMobileSheetOpen: (open: boolean) => void,
  updateFeature: (formData: any) => void,
  setHivesCounted: (hivesCounted: number[]) => void,
  setHivesGraded: (hivesGraded: number[]) => void,
  setAverage: (average: number[]) => void,    
  setRecordId: (recordId: string) => void,
  setTotalHivesContracted: (totalHivesContracted: number) => void
) => {
  // Show details for selected feature and hide everything else
  orchardLayer.visible = false;
  hiveDropsLayer.definitionExpression = `${HIVEDROP_FIELD_NAMES.F_RECORD_ID} = '${feature.attributes[ORCHARD_FIELD_NAMES.F_RECORD_ID]}'`;
  perimitersLayer.definitionExpression = `${PERIMITERS_FIELD_NAMES.MAP_ID} = '${feature.attributes[ORCHARD_FIELD_NAMES.FIELDMAP_ID_PRIMARY]}'`;
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
  const mobileSheetContent: OrchardDetailsProps = {
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

  setRecordId(feature.attributes[ORCHARD_FIELD_NAMES.F_RECORD_ID])

  setMobileSheetProps(mobileSheetContent);
  setTotalHivesContracted(feature.attributes[ORCHARD_FIELD_NAMES.HIVES_CONTRACTED]);
  setIsMobileSheetOpen(true);  

  // gets attributes from each visible hivedrop
  const loopThroughHiveDrops = async () => {

    setHivesCounted([]);
    setHivesGraded([]);
    setAverage([]);     
    // defines the query
    const query = hiveDropsLayer.createQuery();
    query.where = `${HIVEDROP_FIELD_NAMES.F_RECORD_ID} = '${feature.attributes[ORCHARD_FIELD_NAMES.F_RECORD_ID]}'`;
    query.returnGeometry = false;
    query.outFields = [
      HIVEDROP_FIELD_NAMES.HIVES_COUNTED, 
      HIVEDROP_FIELD_NAMES.HIVES_GRADED, 
      HIVEDROP_FIELD_NAMES.AVERAGE, 
      ...HIVEDROP_FIELD_NAMES.GRADES      
    ];

    try { 
      // performs query   
      const results = await hiveDropsLayer.queryFeatures(query);
      // initializes arrays that will be used to update the context
      const newHivesCounted: number[] = [];
      const newHivesGraded: number[] = [];
      const newAverage: number[] = [];        
      // loops through each visible hivedrop and updates the arrays
      results.features.forEach((feature) => {
        newHivesCounted.push(feature.attributes[HIVEDROP_FIELD_NAMES.HIVES_COUNTED]);
        newHivesGraded.push(feature.attributes[HIVEDROP_FIELD_NAMES.HIVES_GRADED]);
        newAverage.push(feature.attributes[HIVEDROP_FIELD_NAMES.AVERAGE]);                                     
      });
      // updates the context
      setHivesCounted(newHivesCounted);
      setHivesGraded(newHivesGraded);
      setAverage(newAverage);                

    } catch (error) {
      console.error("Error querying hive drops:", error);
    }
  }

  loopThroughHiveDrops();
};

// handle selection of hivedrop
export const handleHiveDropFeatureSelection = (
  feature: __esri.Graphic,  
  setHiveDropDialogProps: (props: HiveDropDialogProps) => void,  
  setIsHiveDropDialogOpen: (open: boolean) => void
) => {  

  let grades: number[] = [];
  
  for (const grade of HIVEDROP_FIELD_NAMES.GRADES) {    
    const value = feature.attributes[grade];
    if (value === null) break;
    grades.push(value);
  }          
  const hiveDropDialogProps: HiveDropDialogProps = {
    object_id: feature.attributes[HIVEDROP_FIELD_NAMES.OBJECT_ID],
    record_id: feature.attributes[HIVEDROP_FIELD_NAMES.F_RECORD_ID],
    count: feature.attributes[HIVEDROP_FIELD_NAMES.HIVES_COUNTED],
    grades: grades,
    notes: feature.attributes[HIVEDROP_FIELD_NAMES.NOTES],
    index: feature.attributes[HIVEDROP_FIELD_NAMES.INDEX]
  }
  setHiveDropDialogProps(hiveDropDialogProps);
  setIsHiveDropDialogOpen(true);
}

// Handle deselection (clicking empty space)
export const handleDeselection = (
  orchardLayer: FeatureLayer,
  hiveDropsLayer: FeatureLayer,
  perimitersLayer: FeatureLayer,
  setIsMobileSheetOpen: (open: boolean) => void,
  setIsShown: (shown: boolean) => void
) => {
  setIsMobileSheetOpen(false);
  setIsShown(false);
  // Return map to showing all orchards
  orchardLayer.visible = true;
  hiveDropsLayer.visible = false;
  hiveDropsLayer.definitionExpression = LAYER_EXPRESSIONS.HIDE_ALL;
  perimitersLayer.visible = false;
  perimitersLayer.definitionExpression = LAYER_EXPRESSIONS.HIDE_ALL;
};

export const getHiveDropData = async (
  hiveDropsLayer: FeatureLayer,  
  setHiveDropData: (arg: HiveDropData[]) => void,
  definitionExpression: string
) => {  

  const hiveDropDataArray: HiveDropData[] = [];

  const query = hiveDropsLayer.createQuery();
  query.where = definitionExpression;
  query.returnGeometry = false;
  query.outFields = [
    HIVEDROP_FIELD_NAMES.OBJECT_ID,    
    HIVEDROP_FIELD_NAMES.HIVES_COUNTED,
    HIVEDROP_FIELD_NAMES.AVERAGE,
    ...HIVEDROP_FIELD_NAMES.GRADES,
  ];

  try { 
    // performs query   
    const results = await hiveDropsLayer.queryFeatures(query);

    results.features.forEach((feature) => {
      const object_id = feature.attributes[HIVEDROP_FIELD_NAMES.OBJECT_ID];
      const count = feature.attributes[HIVEDROP_FIELD_NAMES.HIVES_COUNTED];      
      const average = feature.attributes[HIVEDROP_FIELD_NAMES.AVERAGE];

      let grades: number[] = [];
  
      for (const grade of HIVEDROP_FIELD_NAMES.GRADES) {    
        const value = feature.attributes[grade];
        if (value === null) break;
        grades.push(value);
      }  

      const hiveDropData: HiveDropData = { 
        object_id: object_id, 
        count: count, 
        grades: grades, 
        average: average 
      }
      if (grades[0] !== null) {
        hiveDropDataArray.push(hiveDropData);
      }
    });      

    setHiveDropData(hiveDropDataArray);

  } catch (error) {
    console.error("Error querying hive drops:", error);
  }
}