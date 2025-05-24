import React from "react";

interface ContextType {
  isShown: boolean;
  setIsShown: (arg: boolean) => void;
}

export const InspectionDataContext = React.createContext<ContextType>({
  isShown: false,
  setIsShown: () => {},
});

interface Props {
  children: React.ReactNode;
}
const InspectionDataProvider = ({ children }: Props) => {
  const [isShown, setIsShown] = React.useState<boolean>(false);

  return (
    <InspectionDataContext.Provider value={{ isShown, setIsShown }}>
      {children}
    </InspectionDataContext.Provider>
  );
};

export default InspectionDataProvider;