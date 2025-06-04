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
  setAverage: (arg: string) => void
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
  setAverage: () => {}
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
      setAverage
    }}>
      {children}
    </OrchardReportDataContext.Provider>
  );
};

export default OrchardReportDataProvider;