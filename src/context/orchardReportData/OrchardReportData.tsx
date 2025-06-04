import React from "react";

interface ContextType {
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
  setLongitude: (arg: number) => void
}

export const OrchardReportDataContext = React.createContext<ContextType>({
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
  setLongitude: () => {}
});

interface Props {
  children: React.ReactNode;
}
const OrchardReportDataProvider = ({ children }: Props) => {

  const [recordId, setRecordId] = React.useState<string>("");
  const [fieldmapIdPrimary, setFieldmapIdPrimary] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [hiveCount, setHiveCount] = React.useState<number>(0);
  const [average, setAverage] = React.useState<string>("");
  const [teamLeader, setTeamLeader] = React.useState<string>("");
  const [inspectionDate, setInspectionDate] = React.useState<string>("");
  const [latitude, setLatitude] = React.useState<number>(0);
  const [longitude, setLongitude] = React.useState<number>(0);
  return (
    <OrchardReportDataContext.Provider value={{
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
      setLongitude
    }}>
      {children}
    </OrchardReportDataContext.Provider>
  );
};

export default OrchardReportDataProvider;