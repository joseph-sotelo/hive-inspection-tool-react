import { useEffect, useState } from "react";

// arcgis imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Track from "@arcgis/core/widgets/Track";
import Graphic from "@arcgis/core/Graphic";
import "@arcgis/core/assets/esri/themes/light/main.css";

// map symbols
import { symbolAlert, symbolFail, symbolLow, symbolPass, symbolHiveDrop } from "@/assets/symbols";

// env setup
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;
const orchardsLayerURL = import.meta.env.VITE_ARCGIS_MOCK_ORCHARDS_LAYER_API_URL as string;
const hiveDropsLayerURL = import.meta.env.VITE_ARCGIS_HIVEDROPS_LAYER_API_URL as string;
const perimitersLayerURL = import.meta.env.VITE_ARCGIS_PERIMITERS_LAYER_API_URL as string;

// ui imports
import MobileSheet from "./mobile-sheet";

// types
import { FormData, MobileSheetProps } from "./types";

// context
import { useInspectionDataContext } from "@/data/inspectionDataContext";

export default function Map() {

  const inspectionData = useInspectionDataContext()

  // will be used as a key for selected features
  let featureObjectId = 0;

  // used for prefilling form fields, also has an onclick function for editing the map in this file
  const [mobileSheetProps, setMobileSheetProps] = useState<MobileSheetProps | null>(null);

  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  // useEffect ensures DOM is loaded before arcGIS core elements are created inside
  useEffect(() => {
    // creates a feature layer showing all orchards
    const orchardLayer = new FeatureLayer({
      url: orchardsLayerURL,
      outFields: [
        "F_status", 
        "fieldmap_id_primary", 
        "client",
        "partdeliv_yn",
        "hives_contracted",
        "beekeeper",
        "bee_broker",
        "average",
        "minimum",
        "grower",
        "fieldmap_id_auxiliary",
        "crossroads",
        "team_leader",
        "assistants",
        "F_record_id"
      ]
    });

    // creates a feature layer showing all hive-drops
    const hiveDropsLayer = new FeatureLayer({
      url: hiveDropsLayerURL,
      outFields: ["F_record_id"],
      definitionExpression: "1=0"
    });

    // creates a feature layer showing the perimiters of the orchards
    const perimitersLayer = new FeatureLayer({
      url: perimitersLayerURL,
      outFields: ["client"],
      definitionExpression: "1=0"
    });

    // creates map showing all lfeature layers
    const map = new ArcGISMap({
      basemap: "arcgis/imagery",
      layers: [perimitersLayer, orchardLayer, hiveDropsLayer]
    });

    // renders the map
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-119.4179, 36.7783],
      zoom: 10,
    });

    // adds a location tracker to the map view
    const track = new Track({
      view: view
    })
    view.ui.add(track, "top-left");
    track.start();

    // applies custom symbols to the orchard layer features based on their status
    orchardLayer.renderer = {
      type: "unique-value",
      field: "F_status",
      uniqueValueInfos: [
        {
        value: "nodata_fulldeliv",
        symbol: symbolAlert
        },
        {
        value: "nodata_partdeliv",
        symbol: symbolAlert
        },
        {
        value: "fail_comp",
        symbol: symbolFail
        },
        {
          value: "fail_incomp",
          symbol: symbolFail
        },
        {
        value: "low_comp",
        symbol: symbolLow
        },
        {
          value: "low_incomp",
          symbol: symbolLow
        },
        {
        value: "pass_comp",
        symbol: symbolPass
        },
        {
        value: "pass_incomp",
        symbol: symbolPass
        }
      ]
    }

    // applies a custom symbol to the hive-drop symbols
    hiveDropsLayer.renderer = {
      type: "simple",
      symbol: symbolHiveDrop
    }

    // applies custom styles to the perimiters layer
    perimitersLayer.renderer = {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: [211, 247, 5, 0.3],
        style: "solid",
        outline: {
          color: [211, 247, 5, 1],
          width: 2
        }
      }
    }

    // pases user input (formData) to applyEdits() to update feautures on the server
    const updateFeature = (formData: FormData) => {

      // packages formData so it can be passed to applyEdits()
      const updates = new Graphic({
        attributes: {
          ObjectId: featureObjectId,
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
      })

      // applies the updates
      orchardLayer
      .applyEdits({ updateFeatures: [updates]})
      .then((result) => {
        console.log("Update result: ", result);
      })
      .catch((error) => {
        console.error("Error applying edits: ", error);
      })
    }

    // handles when a user clicks or taps on the map
    view.on("click", async (event) => {

      console.log(inspectionData)

      // get the feature that the user clicked
      const response = await view.hitTest(event);

      // for typescript - make sure the feature is the right type - a graphic
      const feature = response.results.find((result): result is __esri.MapViewGraphicHit => result.type ==="graphic");

      // handles what happens if a feature was clicked
      if (feature?.graphic.attributes.fieldmap_id_primary != undefined) {
        // show details for the feature that was selected and hide everything else
        orchardLayer.visible = false;
        hiveDropsLayer.definitionExpression = `F_record_id = '${feature.graphic.attributes.F_record_id}'`;
        perimitersLayer.definitionExpression = `client = '${feature.graphic.attributes.client}'`;
        hiveDropsLayer.visible = true;
        perimitersLayer.visible = true;
        hiveDropsLayer.refresh();
        perimitersLayer.refresh();
        
        // zooms in on the details of the feature that was selected
        view.goTo({
          target: feature.graphic.geometry,
          zoom: 15,
          padding: {
            top: 25,
            bottom: 200,
            left: 50,
            right: 50
          }
        });
        
        // creates an object based on the selected feature's attributes to be passed to the mobile sheet to prefill fields. onMarkComplete is used for applying edits
        const mobileSheetContent = {
          client: feature.graphic.attributes.client,
          F_status: feature.graphic.attributes.F_status,
          fieldmap_id_primary: feature.graphic.attributes.fieldmap_id_primary,
          partdeliv_yn: feature.graphic.attributes.partdeliv_yn,
          hives_contracted: feature.graphic.attributes.hives_contracted,
          beekeeper: feature.graphic.attributes.beekeeper,
          bee_broker: feature.graphic.attributes.bee_broker,
          average: feature.graphic.attributes.average,
          minimum: feature.graphic.attributes.minimum,
          grower: feature.graphic.attributes.grower,
          fieldmap_id_auxiliary: feature.graphic.attributes.fieldmap_id_auxiliary,
          crossroads: feature.graphic.attributes.crossroads,
          team_leader: feature.graphic.attributes.team_leader,
          assistants: feature.graphic.attributes.assistants,
          onMarkComplete: updateFeature
        }

        // // used as a key for the mobile sheet and for applyEdits
        featureObjectId = feature.graphic.attributes.ObjectId;
        // // store the object in state
        setMobileSheetProps(mobileSheetContent);
        // // since a feature was selected, open the mobile sheet
        setIsMobileSheetOpen(true);
      } else {
        // since no feature was selected, close the mobile sheet
        setIsMobileSheetOpen(false);
        // return the map to showing all orchards
        orchardLayer.visible = true;
        hiveDropsLayer.visible = false;
        hiveDropsLayer.definitionExpression = "1=0";
        perimitersLayer.visible = false;
        perimitersLayer.definitionExpression = "1=0";
      }
      
    });

    // cleanup function
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  // returns the rendered map
  return (
    <div>
        {isMobileSheetOpen && mobileSheetProps && (<MobileSheet props={mobileSheetProps} key={mobileSheetProps.fieldmap_id_primary}/>)}
        <div id="viewDiv" className="w-full h-screen"> </div>
    </div>
  );
}