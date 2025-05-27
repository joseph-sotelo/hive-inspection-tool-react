import React from "react";

interface ContextType {
  // data pertaining to entire orchard
  isShown: boolean;
  setIsShown: (arg: boolean) => void;
  totalHivesContracted: number;
  setTotalHivesContracted: (arg: number) => void;
  orchardHiveGrades: number[][],
  setOrchardHiveGrades: (arg: number[][]) => void,
  userLocation: number[],
  setUserLocation: (arg: number[]) => void,
  // data pertaining to an individual hive drop within that orchard
  hiveDropHiveGrades: number[],
  setHiveDropHiveGrades: (arg: number[]) => void,
  hivesCounted: number[],
  setHivesCounted: (arg: number[]) => void,
  hivesGraded: number[],
  setHivesGraded: (arg: number[]) => void,
  average: number[],
  setAverage: (arg: number[]) => void,
  notes: string[],
  setNotes: (arg: string[]) => void,
  // data pertaining to the read only view
  isHiveDropDialogOpen: boolean,    
  setIsHiveDropDialogOpen: (arg: boolean) => void
}

export const InspectionDataContext = React.createContext<ContextType>({
  isShown: false,
  setIsShown: () => {},
  totalHivesContracted: 0,
  setTotalHivesContracted: () => {},
  orchardHiveGrades: [],
  setOrchardHiveGrades: () => {},
  userLocation: [],
  setUserLocation: () => {},
  hiveDropHiveGrades: [],
  setHiveDropHiveGrades: () => {},
  hivesCounted: [],
  setHivesCounted: () => {},
  hivesGraded: [],
  setHivesGraded: () => {},
  average: [],
  setAverage: () => {},
  notes: [],
  setNotes: () => {},
  isHiveDropDialogOpen: false,
  setIsHiveDropDialogOpen: () => {}
});

interface Props {
  children: React.ReactNode;
}
const InspectionDataProvider = ({ children }: Props) => {
  const [totalHivesContracted, setTotalHivesContracted] = React.useState<number>(0);
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const [orchardHiveGrades, setOrchardHiveGrades] = React.useState<number[][]>([]);
  const [userLocation, setUserLocation] = React.useState<number[]>([]);
  const [hiveDropHiveGrades, setHiveDropHiveGrades] = React.useState<number[]>([]);
  const [hivesCounted, setHivesCounted] = React.useState<number[]>([]);
  const [hivesGraded, setHivesGraded] = React.useState<number[]>([]);
  const [average, setAverage] = React.useState<number[]>([]);
  const [notes, setNotes] = React.useState<string[]>([]);
  const [isHiveDropDialogOpen, setIsHiveDropDialogOpen] = React.useState<boolean>(false);
  return (
    <InspectionDataContext.Provider value={{ 
        isShown,        
        setIsShown,
        totalHivesContracted,
        setTotalHivesContracted,
        orchardHiveGrades,
        setOrchardHiveGrades,
        userLocation,
        setUserLocation,
        hiveDropHiveGrades,
        setHiveDropHiveGrades, 
        hivesCounted, 
        setHivesCounted, 
        hivesGraded, 
        setHivesGraded, 
        average, 
        setAverage, 
        notes, 
        setNotes,
        isHiveDropDialogOpen,
        setIsHiveDropDialogOpen }}>
      {children}
    </InspectionDataContext.Provider>
  );
};

export default InspectionDataProvider;