import { useContext } from "react";
import { OverviewReportDataContext } from "./OverviewReportData";

export const useOverviewReportData = () => useContext(OverviewReportDataContext);