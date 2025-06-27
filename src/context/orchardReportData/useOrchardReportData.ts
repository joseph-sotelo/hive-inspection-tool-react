import { useContext } from "react";
import { OrchardReportDataContext } from "./OrchardReportData";

export const useOrchardReportData = () => useContext(OrchardReportDataContext);