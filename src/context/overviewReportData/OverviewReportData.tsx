// data to be displayed in the overview report. It is also used to create the overview chart in overview-section.tsx within orchard-report-page.tsx

import React from "react";

interface ContextType {
  allHiveDrops: number[][],
  setAllHiveDrops: (arg: number[][]) => void
}

export const OverviewReportDataContext = React.createContext<ContextType>({
  allHiveDrops: [],
  setAllHiveDrops: () => {}
});

interface Props {
  children: React.ReactNode;
}
const OverviewReportDataProvider = ({ children }: Props) => {

  const [allHiveDrops, setAllHiveDrops] = React.useState<number[][]>([]);
  
  return (
    <OverviewReportDataContext.Provider value={{
      allHiveDrops,
      setAllHiveDrops
    }}>
      {children}
    </OverviewReportDataContext.Provider>
  );
};

export default OverviewReportDataProvider;