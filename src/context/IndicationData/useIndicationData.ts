import { useContext } from "react";
import { IndicationDataContext } from "./IndicationData";

export const useIndicationData = () => useContext(IndicationDataContext);
