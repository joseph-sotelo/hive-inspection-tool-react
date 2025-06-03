import React from "react";

interface ContextType {
  recordId: string,
  setRecordId: (arg: string) => void,
  fieldmapIdPrimary: string,
  setFieldmapIdPrimary: (arg: string) => void
}

export const OrchardReportDataContext = React.createContext<ContextType>({
  recordId: "",
  setRecordId: () => {},
  fieldmapIdPrimary: "",
  setFieldmapIdPrimary: () => {}
});

interface Props {
  children: React.ReactNode;
}
const OrchardReportDataProvider = ({ children }: Props) => {

  const [recordId, setRecordId] = React.useState<string>("");
  const [fieldmapIdPrimary, setFieldmapIdPrimary] = React.useState<string>("");

  return (
    <OrchardReportDataContext.Provider value={{
      recordId,
      setRecordId,
      fieldmapIdPrimary,
      setFieldmapIdPrimary
    }}>
      {children}
    </OrchardReportDataContext.Provider>
  );
};

export default OrchardReportDataProvider;