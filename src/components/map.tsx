import { useEffect, useState } from "react";

// arcgis imports
import config from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Graphic from "@arcgis/core/Graphic";
import "@arcgis/core/assets/esri/themes/light/main.css";

// map symbols
import { symbolAlert, symbolFail, symbolLow, symbolPass } from "@/assets/symbols";

// env setup
config.apiKey = import.meta.env.VITE_ARCGIS_LAYER_API_KEY as string;
const featureLayerURL = import.meta.env.VITE_ARCGIS_MOCK_LAYER_API_URL as string;

// ui imports
import MobileSheet from "./mobile-sheet";

// types
import { FormData, MobileSheetProps } from "./types";

export default function Map() {

  // will be used as a key for selected features
  let featureObjectId = 0;

  // state that will be passed to the mobile sheet for prefilling form fields
  const [mobileSheetProps, setMobileSheetProps] = useState<MobileSheetProps | null>(null);

  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  // useEffect ensures DOM is loaded before arcGIS core elements are created
  useEffect(() => {
    // creates a feature layer showing all orchards
    const orchardLayer = new FeatureLayer({
      url: featureLayerURL,
      outFields: [
        "F_status", 
        "fieldmap_id_primary", 
        "client",
        "partdeliv_yn",
        "hives_contracted"
      ]
    });

    // creates map showing all layers
    const map = new ArcGISMap({
      basemap: "arcgis/outdoor",
      layers: [orchardLayer]
    });

    // renders the map
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-119.4179, 36.7783],
      zoom: 10,
    });

    // applies custom symbols to the map features based on their status
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
    // pases user input (formData) to applyEdits() to update feautures on the server
    const updateFeature = (formData: FormData) => {

      // packages formData so it can be passed to applyEdits()
      const updates = new Graphic({
        attributes: {
          ObjectId: featureObjectId,
          fieldmap_id_primary: formData.fieldmap_id_primary,
          partdeliv_yn: formData.partdeliv_yn
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

    // listens for user click and opens the mobile sheet if a feature is clicked
    view.on("click", async (event) => {
      // get the feature that the user clicked
      const response = await view.hitTest(event);

      // for typescript - make sure the feature is the right type - a graphic
      const feature = response.results.find((result): result is __esri.MapViewGraphicHit => result.type ==="graphic");

      // // create an object from the attributes of the selected feature so it can be passed to the mobile sheet
      if (feature?.graphic.attributes.fieldmap_id_primary != undefined) {
        const mobileSheetContent = {
          client: feature.graphic.attributes.client,
          F_status: feature.graphic.attributes.F_status,
          fieldmap_id_primary: feature.graphic.attributes.fieldmap_id_primary,
          partdeliv_yn: feature.graphic.attributes.partdeliv_yn,
          hives_contracted: feature.graphic.attributes.hives_contracted,
          onMarkComplete: updateFeature,
        }

        // // used as a key for the mobile sheet and for applyEdits
        featureObjectId = feature.graphic.attributes.ObjectId;
        // // store the object in state
        setMobileSheetProps(mobileSheetContent);

        console.log(mobileSheetProps)
        // // since a feature was selected, open the mobile sheet
        setIsMobileSheetOpen(true);
      } else {
        // since no feature was selected, close the mobile sheet
        setIsMobileSheetOpen(false);
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
      {/* if the user has selected a feature, the mobile sheet will be rendered displaying that feature's data */}
      {isMobileSheetOpen && mobileSheetProps && (<MobileSheet props={mobileSheetProps} key={mobileSheetProps.fieldmap_id_primary}/>)}
      <div id="viewDiv" className="w-full h-screen"> </div>
    </div>
  );
}