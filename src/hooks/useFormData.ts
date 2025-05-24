// Custom hook for form data management
// Extracting form logic makes it testable and reusable
import { useState, useEffect } from "react";
import { MobileSheetProps } from "@/components/types";

export const useFormData = (props: MobileSheetProps) => {
  const [formData, setFormData] = useState({
    client: props.client,
    F_status: props.F_status,
    fieldmap_id_primary: props.fieldmap_id_primary,
    partdeliv_yn: props.partdeliv_yn,
    hives_contracted: props.hives_contracted,
    beekeeper: props.beekeeper,
    bee_broker: props.bee_broker,
    average: props.average,
    minimum: props.minimum,
    grower: props.grower,
    fieldmap_id_auxiliary: props.fieldmap_id_auxiliary,
    crossroads: props.crossroads,
    team_leader: props.team_leader,
    assistants: props.assistants
  });

  // Update form data when props change (new feature selected)
  // This handles null values by converting them to empty strings/arrays
  useEffect(() => { 
    setFormData({
      client: props.client,
      F_status: props.F_status,
      fieldmap_id_primary: props.fieldmap_id_primary,
      partdeliv_yn: props.partdeliv_yn,
      hives_contracted: props.hives_contracted === null ? "" : props.hives_contracted,
      beekeeper: props.beekeeper === null ? "" : props.beekeeper,
      bee_broker: props.bee_broker === null ? "" : props.bee_broker,
      average: props.average === null ? "" : props.average,
      minimum: props.minimum === null ? "" : props.minimum,
      grower: props.grower === null ? "" : props.grower,
      fieldmap_id_auxiliary: props.fieldmap_id_auxiliary === null ? "" : props.fieldmap_id_auxiliary,
      crossroads: props.crossroads === null ? "" : props.crossroads,
      team_leader: props.team_leader === null ? "" : props.team_leader,
      assistants: props.assistants === null ? [] : props.assistants
    });
  }, [props.client, props.F_status, props.fieldmap_id_primary]);

  // Form data update handler
  const handleChange = (key: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    console.log(formData);
  };

  return {
    formData,
    handleChange
  };
};