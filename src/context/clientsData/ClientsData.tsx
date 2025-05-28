import React from "react";

interface ContextType {

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