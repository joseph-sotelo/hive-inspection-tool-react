import React from "react";

interface ContextType {
  // data pertaining to a single client
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
  setFieldmapIdPrimary: (arg: string[]) => void
}

export const ClientsDataContext = React.createContext<ContextType>({
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
  setFieldmapIdPrimary: () => {}
});

interface Props {
  children: React.ReactNode;
}
const ClientsDataProvider = ({ children }: Props) => {
  const [name, setName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [statuses, setStatuses] = React.useState<string[]>([]);
  const [hiveCounts, setHiveCounts] = React.useState<number[]>([]);
  const [orchardGrades, setOrchardGrades] = React.useState<string[]>([]);
  const [definitionExpression, setDefinitionExpression] = React.useState<string>("");
  const [fieldmapIdPrimary, setFieldmapIdPrimary] = React.useState<string[]>([]);
  return (
    <ClientsDataContext.Provider value={{
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
      setFieldmapIdPrimary
    }}>
      {children}
    </ClientsDataContext.Provider>
  );
};

export default ClientsDataProvider;