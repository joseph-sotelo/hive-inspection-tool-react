import React from "react";

interface ContextType {
  isShown: boolean;
  setIsShown: (arg: boolean) => void;
  hiveGrades: number[][],
  setHiveGrades: (arg: number[][]) => void,
  hivesCounted: number[],
  setHivesCounted: (arg: number[]) => void,
  hivesGraded: number[],
  setHivesGraded: (arg: number[]) => void,
  average: number[],
  setAverage: (arg: number[]) => void,
}

export const InspectionDataContext = React.createContext<ContextType>({
  isShown: false,
  setIsShown: () => {},
  hiveGrades: [],
  setHiveGrades: () => {},
  hivesCounted: [],
  setHivesCounted: () => {},
  hivesGraded: [],
  setHivesGraded: () => {},
  average: [],
  setAverage: () => {},
});

interface Props {
  children: React.ReactNode;
}
const InspectionDataProvider = ({ children }: Props) => {
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const [hiveGrades, setHiveGrades] = React.useState<number[][]>([]);
  const [hivesCounted, setHivesCounted] = React.useState<number[]>([]);
  const [hivesGraded, setHivesGraded] = React.useState<number[]>([]);
  const [average, setAverage] = React.useState<number[]>([]);

  return (
    <InspectionDataContext.Provider value={{ isShown, setIsShown, hiveGrades, setHiveGrades, hivesCounted, setHivesCounted, hivesGraded, setHivesGraded, average, setAverage }}>
      {children}
    </InspectionDataContext.Provider>
  );
};

export default InspectionDataProvider;