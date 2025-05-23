import React from "react";

interface ContextType {
  isShown: boolean;
  setIsShown: (arg: boolean) => void;
}

export const IndicationDataContext = React.createContext<ContextType>({
  isShown: false,
  setIsShown: () => {},
});

interface Props {
  children: React.ReactNode;
}
const IndicationDataProvider = ({ children }: Props) => {
  const [isShown, setIsShown] = React.useState<boolean>(false);

  return (
    <IndicationDataContext.Provider value={{ isShown, setIsShown }}>
      {children}
    </IndicationDataContext.Provider>
  );
};

export default IndicationDataProvider;
