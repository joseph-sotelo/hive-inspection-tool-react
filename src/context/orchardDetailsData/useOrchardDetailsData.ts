import { useContext } from "react";
import { OrchardDetailsDataContext } from "./OrchardDetailsData";

export const useOrchardDetailsData = () => useContext(OrchardDetailsDataContext);