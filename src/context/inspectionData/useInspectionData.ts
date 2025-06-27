import { useContext } from "react";
import { InspectionDataContext } from "./InspectionData";

export const useInspectionData = () => useContext(InspectionDataContext);