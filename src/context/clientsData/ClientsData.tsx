import React from "react";

interface ContextType {
  // data pertaining to all clients
}

export const ClientsDataContext = React.createContext<ContextType>({

});

interface Props {
  children: React.ReactNode;
}
const ClientsDataProvider = ({ children }: Props) => {
  return (
    <ClientsDataContext.Provider value={{ }}>
      {children}
    </ClientsDataContext.Provider>
  );
};

export default ClientsDataProvider;