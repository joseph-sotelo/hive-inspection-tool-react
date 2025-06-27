import React from "react";

interface ContextType {
  // data pertaining to entire orchard
  isShown: boolean;
  setIsShown: (arg: boolean) => void;
  recordId: string,
  setRecordId: (arg: string) => void,
  totalHivesContracted: number;
  setTotalHivesContracted: (arg: number) => void;
  orchardHiveGrades: number[][],
  setOrchardHiveGrades: (arg: number[][]) => void,
  userLocation: number[],
  setUserLocation: (arg: number[]) => void,
  // data pertaining to an individual hive drop within that orchard
  applyHiveDrop: number,
  setApplyHiveDrop: (arg: number) => void,
  hiveDropIndex: number,
  setHiveDropIndex: (arg: number) => void,
  hiveDropLocations: number[][],
  setHiveDropLocations: (arg: number[][]) => void,
  hiveDropHiveGrades: number[],
  setHiveDropHiveGrades: (arg: number[]) => void,
  hivesCounted: number[],
  setHivesCounted: (arg: number[]) => void,
  hivesGraded: number[],
  setHivesGraded: (arg: number[]) => void,
  average: number[],
  setAverage: (arg: number[]) => void,
  notes: string,
  setNotes: (arg: string) => void,
  // data pertaining to the read only view
  isHiveDropDialogOpen: boolean,    
  setIsHiveDropDialogOpen: (arg: boolean) => void
}

export const InspectionDataContext = React.createContext<ContextType>({
  isShown: false,
  setIsShown: () => {},
  recordId: "",
  setRecordId: () => {},
  totalHivesContracted: 0,
  setTotalHivesContracted: () => {},
  orchardHiveGrades: [],
  setOrchardHiveGrades: () => {},
  userLocation: [],
  setUserLocation: () => {},
  applyHiveDrop: 0,
  setApplyHiveDrop: () => {},
  hiveDropIndex: 0,
  setHiveDropIndex: () => {},
  hiveDropLocations: [],
  setHiveDropLocations: () => {},
  hiveDropHiveGrades: [],
  setHiveDropHiveGrades: () => {},
  hivesCounted: [],
  setHivesCounted: () => {},
  hivesGraded: [],
  setHivesGraded: () => {},
  average: [],
  setAverage: () => {},
  notes: "",
  setNotes: () => {},
  isHiveDropDialogOpen: false,
  setIsHiveDropDialogOpen: () => {}
});

interface Props {
  children: React.ReactNode;
}
const InspectionDataProvider = ({ children }: Props) => {
  const [recordId, setRecordId] = React.useState<string>("");
  const [totalHivesContracted, setTotalHivesContracted] = React.useState<number>(0);
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const [orchardHiveGrades, setOrchardHiveGrades] = React.useState<number[][]>([]);
  const [userLocation, setUserLocation] = React.useState<number[]>([]);
  const [applyHiveDrop, setApplyHiveDrop] = React.useState<number>(0);
  const [hiveDropIndex, setHiveDropIndex] = React.useState<number>(0);
  const [hiveDropLocations, setHiveDropLocations] = React.useState<number[][]>([]);
  const [hiveDropHiveGrades, setHiveDropHiveGrades] = React.useState<number[]>([]);
  const [hivesCounted, setHivesCounted] = React.useState<number[]>([]);
  const [hivesGraded, setHivesGraded] = React.useState<number[]>([]);
  const [average, setAverage] = React.useState<number[]>([]);
  const [notes, setNotes] = React.useState<string>("");
  const [isHiveDropDialogOpen, setIsHiveDropDialogOpen] = React.useState<boolean>(false);
  
  // Wrap setUserLocation to add logging
  const setUserLocationWithLog = React.useCallback((location: number[]) => {
    console.log("Setting user location in context:", location);
    setUserLocation(location);
  }, []);

  return (
    <InspectionDataContext.Provider value={{ 
        isShown,        
        setIsShown,
        recordId,
        setRecordId,
        totalHivesContracted,
        setTotalHivesContracted,
        orchardHiveGrades,
        setOrchardHiveGrades,
        userLocation,
        setUserLocation: setUserLocationWithLog,
        applyHiveDrop,
        setApplyHiveDrop,
        hiveDropIndex,
        setHiveDropIndex,
        hiveDropLocations,
        setHiveDropLocations,
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