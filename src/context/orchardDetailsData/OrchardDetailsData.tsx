import React from "react";

interface ContextType {
  isDesktopSheetOpen: boolean;
  setIsDesktopSheetOpen: (isDesktopSheetOpen: boolean) => void;
}

export const OrchardDetailsDataContext = React.createContext<ContextType>({
  isDesktopSheetOpen: false,
  setIsDesktopSheetOpen: () => {}
});

interface Props {
  children: React.ReactNode;
}
const OrchardDetailsDataProvider = ({ children }: Props) => {

  const [isDesktopSheetOpen, setIsDesktopSheetOpen] = React.useState<boolean>(false);
  
  return (
    <OrchardDetailsDataContext.Provider value={{
      isDesktopSheetOpen,
      setIsDesktopSheetOpen
    }}>
      {children}
    </OrchardDetailsDataContext.Provider>
  );
};

export default OrchardDetailsDataProvider;