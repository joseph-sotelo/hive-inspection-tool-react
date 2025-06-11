// data to be disolayed in the orhcard report

import React from "react";
import { HiveDropData } from "@/components/types";

interface ContextType {
  clientName: string,
  setClientName: (arg: string) => void,
  recordId: string,
  setRecordId: (arg: string) => void,
  fieldmapIdPrimary: string,
  setFieldmapIdPrimary: (arg: string) => void,
  status: string,
  setStatus: (arg: string) => void,
  hiveCount: number,
  setHiveCount: (arg: number) => void,
  average: string,
  setAverage: (arg: string) => void,
  teamLeader: string,
  setTeamLeader: (arg: string) => void,
  inspectionDate: string,
  setInspectionDate: (arg: string) => void,
  latitude: number,
  setLatitude: (arg: number) => void,
  longitude: number,
  setLongitude: (arg: number) => void,
  fieldmapIdAuxiliary: string,
  setFieldmapIdAuxiliary: (arg: string) => void,
  partdeliv_yn: string,
  setPartdeliv_yn: (arg: string) => void,
  beeBroker: string,
  setBeeBroker: (arg: string) => void,
  deliveryDate: string,
  setDeliveryDate: (arg: string) => void,
  beekeeper: string,
  setBeekeeper: (arg: string) => void,
  avgContracted: number,
  setAvgContracted: (arg: number) => void,
  minimum: number,
  setMinimum: (arg: number) => void,
  assistants: string,
  setAssistants: (arg: string) => void,
  hiveDropData: HiveDropData[],
  setHiveDropData: (arg: HiveDropData[]) => void
}

export const OrchardReportDataContext = React.createContext<ContextType>({
  clientName: "",
  setClientName: () => {},
  recordId: "",
  setRecordId: () => {},
  fieldmapIdPrimary: "",
  setFieldmapIdPrimary: () => {},
  status: "",
  setStatus: () => {},
  hiveCount: 0,
  setHiveCount: () => {},
  average: "",
  setAverage: () => {},
  teamLeader: "",
  setTeamLeader: () => {},
  inspectionDate: "",
  setInspectionDate: () => {},
  latitude: 0,
  setLatitude: () => {},
  longitude: 0,
  setLongitude: () => {},
  fieldmapIdAuxiliary: "",
  setFieldmapIdAuxiliary: () => {},
  partdeliv_yn: "",
  setPartdeliv_yn: () => {},
  beeBroker: "",
  setBeeBroker: () => {},
  deliveryDate: "",
  setDeliveryDate: () => {},
  beekeeper: "",
  setBeekeeper: () => {},
  avgContracted: 0,
  setAvgContracted: () => {},
  minimum: 0,
  setMinimum: () => {},
  assistants: "",
  setAssistants: () => {},
  hiveDropData: [],
  setHiveDropData: () => {}
});

interface Props {
  children: React.ReactNode;
}
const OrchardReportDataProvider = ({ children }: Props) => {

  const [clientName, setClientName] = React.useState<string>("");
  const [recordId, setRecordId] = React.useState<string>("");
  const [fieldmapIdPrimary, setFieldmapIdPrimary] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [hiveCount, setHiveCount] = React.useState<number>(0);
  const [average, setAverage] = React.useState<string>("");
  const [teamLeader, setTeamLeader] = React.useState<string>("");
  const [inspectionDate, setInspectionDate] = React.useState<string>("");
  const [latitude, setLatitude] = React.useState<number>(0);
  const [longitude, setLongitude] = React.useState<number>(0);
  const [fieldmapIdAuxiliary, setFieldmapIdAuxiliary] = React.useState<string>("");
  const [partdeliv_yn, setPartdeliv_yn] = React.useState<string>("");
  const [beeBroker, setBeeBroker] = React.useState<string>("");
  const [deliveryDate, setDeliveryDate] = React.useState<string>("");
  const [beekeeper, setBeekeeper] = React.useState<string>("");
  const [avgContracted, setAvgContracted] = React.useState<number>(0);
  const [minimum, setMinimum] = React.useState<number>(0);
  const [assistants, setAssistants] = React.useState<string>("");
  const [hiveDropData, setHiveDropData] = React.useState<HiveDropData[]>([]);
  return (
    <OrchardReportDataContext.Provider value={{
      clientName,
      setClientName,
      recordId,
      setRecordId,
      fieldmapIdPrimary,
      setFieldmapIdPrimary,
      status,
      setStatus,
      hiveCount,
      setHiveCount,
      average,
      setAverage,
      teamLeader,
      setTeamLeader,
      inspectionDate,
      setInspectionDate,
      latitude,
      setLatitude,
      longitude,
      setLongitude,
      fieldmapIdAuxiliary,
      setFieldmapIdAuxiliary,
      partdeliv_yn,
      setPartdeliv_yn,
      beeBroker,
      setBeeBroker,
      deliveryDate,
      setDeliveryDate,
      beekeeper,
      setBeekeeper,
      avgContracted,
      setAvgContracted,
      minimum,
      setMinimum,
      assistants,
      setAssistants,
      hiveDropData,
      setHiveDropData
    }}>
      {children}
    </OrchardReportDataContext.Provider>
  );
};

export default OrchardReportDataProvider;