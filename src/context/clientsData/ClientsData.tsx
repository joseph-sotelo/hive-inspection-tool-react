// data pertaining to a single client. Data is displayed in client-details.tsx based on what client was selected. Data is also displayed in some parts of the client report.

import React from "react";

interface ContextType {  
  index: number,
  setIndex: (arg: number) => void
  name: string;
  setName: (arg: string) => void,
  phone: string,
  setPhone: (arg: string) => void,
  email: string,
  setEmail: (arg: string) => void,
  statuses: string[],
  setStatuses: (arg: string[]) => void,
  hiveCounts: number[],
  setHiveCounts: (arg: number[]) => void,
  orchardGrades: string[],
  setOrchardGrades: (arg: string[]) => void,
  definitionExpression: string,
  setDefinitionExpression: (arg: string) => void,
  fieldmapIdPrimary: string[],
  setFieldmapIdPrimary: (arg: string[]) => void,
  showReportGenerator: boolean,
  setShowReportGenerator: (arg: boolean) => void
}

export const ClientsDataContext = React.createContext<ContextType>({
  index: 0,
  setIndex: () => {},
  name: "",
  setName: () => {},
  phone: "",
  setPhone: () => {},
  email: "",
  setEmail: () => {},
  statuses: [],
  setStatuses: () => {},
  hiveCounts: [],
  setHiveCounts: () => {},
  orchardGrades: [],
  setOrchardGrades: () => {},
  definitionExpression: "",
  setDefinitionExpression: () => {},
  fieldmapIdPrimary: [],
  setFieldmapIdPrimary: () => {},
  showReportGenerator: false,
  setShowReportGenerator: () => {}
});

interface Props {
  children: React.ReactNode;
}
const ClientsDataProvider = ({ children }: Props) => {
  const [index, setIndex] = React.useState<number>(0);
  const [name, setName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [statuses, setStatuses] = React.useState<string[]>([]);
  const [hiveCounts, setHiveCounts] = React.useState<number[]>([]);
  const [orchardGrades, setOrchardGrades] = React.useState<string[]>([]);
  const [definitionExpression, setDefinitionExpression] = React.useState<string>("");
  const [fieldmapIdPrimary, setFieldmapIdPrimary] = React.useState<string[]>([]);
  const [showReportGenerator, setShowReportGenerator] = React.useState<boolean>(false);
  return (
    <ClientsDataContext.Provider value={{
      index,
      setIndex,
      name,
      setName,
      phone,
      setPhone,
      email,
      setEmail,
      statuses,
      setStatuses,
      hiveCounts,
      setHiveCounts,
      orchardGrades,
      setOrchardGrades,
      definitionExpression,
      setDefinitionExpression,
      fieldmapIdPrimary,
      setFieldmapIdPrimary,
      showReportGenerator,
      setShowReportGenerator
    }}>
      {children}
    </ClientsDataContext.Provider>
  );
};

export default ClientsDataProvider;