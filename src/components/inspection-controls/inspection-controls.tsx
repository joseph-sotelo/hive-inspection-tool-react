import { useState, useEffect } from "react";
import { getSamplePercentage } from "./getSamplePercentage";

// UI
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Textarea } from "../ui/textarea";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { CORNERS } from "@/constants";

// styling
import clsx from "clsx";

// context
import { useInspectionData } from "@/context/inspectionData"
import { getHiveDropAverage } from "./getHiveDropAverage";

interface InspectionControlsProps {
    totalHivesContracted: number;
}

export default function InspectionControls({ totalHivesContracted }: InspectionControlsProps) {

    // context to be updated
    const { 
        isShown, 
        orchardHiveGrades, 
        setOrchardHiveGrades, 
        hiveDropHiveGrades, 
        setHiveDropHiveGrades,         
        setHivesCounted, 
        hivesGraded,
        setHivesGraded,        
        average,
        setAverage,
        setNotes,
        hiveDropIndex,
        setHiveDropIndex,        
        applyHiveDrop,
        setApplyHiveDrop
    } = useInspectionData();
    // the minimum percentage of hives that need to be graded
    const [samplePercentage, setSamplePercentage] = useState<number>(0);    
    // toggles the dialog open or closed
    const [isOpen, setIsOpen] = useState(false);        
    // stores hivesCounted within the component until user hits "finish" -- then it updates context
    const [hivesCountedLocal, setHivesCountedLocal] = useState<number[]>([]);
    // track when to clear form data
    const [shouldClearForm, setShouldClearForm] = useState(false);
    
    useEffect(() => {                
        const totalGradedHives = orchardHiveGrades.flat().length;
        if (totalGradedHives > 2) {                         
            const percentage = getSamplePercentage({ 
                populationSize: totalHivesContracted, 
                totalHiveGrades: orchardHiveGrades
            });
            setSamplePercentage(percentage);                   
        } else {
            setSamplePercentage(0.1);
        }
    }, [orchardHiveGrades, totalHivesContracted]);

    // Clear form data after save is complete
    useEffect(() => {
        if (shouldClearForm) {
            setHiveDropHiveGrades([]);
            setShouldClearForm(false);
        }
    }, [shouldClearForm]);

    return (
        <div id="inspection-controls-wrapper" className={clsx("absolute right-0 w-full md:w-[calc(100vw-500px)] z-5 flex gap-2 p-2 items-stretch pointer-events-none", isShown ? "block" : "hidden")}>             
            <div className="pointer-events-auto w-full shadow-lg">
                <Accordion type="single" collapsible defaultValue="progress">
                    <AccordionItem value="progress">
                        <AccordionTrigger>
                            <Progress 
                                className={clsx("border-1 border-foreground-flexible-light", CORNERS.CHILD)} 
                                value={Math.min(orchardHiveGrades.flat().length, totalHivesContracted*samplePercentage)} 
                                max={totalHivesContracted*samplePercentage} /> 
                        </AccordionTrigger>
                    </AccordionItem>
                </Accordion>                                    
            </div>            
            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);                
            }}>
                <DialogTrigger>
                    <div id="button-wrapper" className="h-full pointer-events-auto">
                        <Button variant="map" size="map">
                            Add hive-drop
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle>
                            New Hive-Drop
                        </DialogTitle>
                        <Progress 
                            className={clsx("border-1 border-foreground-flexible-light", CORNERS.CHILD)}   
                            value={Math.min(hiveDropHiveGrades.length, hivesCountedLocal[hiveDropIndex]*samplePercentage)}
                            max={hivesCountedLocal[hiveDropIndex]*samplePercentage}
                        />
                    </DialogHeader>                
                    <Button variant="customSecondary"> Re-capture Location </Button>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="count">Hives counted</Label>
                        <Input 
                            type="number" 
                            id="count"                                 
                            placeholder="number" 
                            onChange={(event) => {
                                const newHivesCountedLocal = [...hivesCountedLocal];
                                newHivesCountedLocal[hiveDropIndex] = Number(event.target.value);
                                setHivesCountedLocal(newHivesCountedLocal);                                                                   
                            }}/>
                        <p className="text-sm text-muted-foreground">How many hives are there in this hive-drop?</p>
                    </div>
                    <Separator />
                    <h4>Hives graded: {hiveDropHiveGrades.length}</h4>
                    <div className="max-h-[200px] overflow-y-scroll flex flex-col gap-8 border-1 border-border rounded-md p-5">
                        {hiveDropHiveGrades.map((value, index) => (
                            <div key={index} className="flex gap-6">
                                <p className="text-nowrap">Hive {index + 1}</p>
                                <Slider 
                                defaultValue={[value]}
                                max={24}
                                step={1}
                                color="brand-light"
                                onValueChange={(newValue) => {
                                    const newHiveDropHiveGrades = [...hiveDropHiveGrades];
                                    newHiveDropHiveGrades[index] = newValue[0];
                                    setHiveDropHiveGrades(newHiveDropHiveGrades);    
                                    const newOrchardHiveGrades = [...orchardHiveGrades];
                                    newOrchardHiveGrades[hiveDropIndex] = hiveDropHiveGrades;
                                    setOrchardHiveGrades(newOrchardHiveGrades);  
                                    console.log("value: ", Math.min(hiveDropHiveGrades.length, hivesCountedLocal[hiveDropIndex]*samplePercentage));
                                    console.log("max: ", hivesCountedLocal[hiveDropIndex]*samplePercentage)                                    
                                }}
                                />     
                                <div className="text-nowrap text-lg font-bold text-brand-dark">{value}</div>                           
                            </div>
                        ))}                          
                        <Button variant="action" size="action" onClick={() => {  
                            setHiveDropHiveGrades([...hiveDropHiveGrades, 12])                                
                            const newOrchardHiveGrades = [...orchardHiveGrades];
                            newOrchardHiveGrades[hiveDropIndex] = hiveDropHiveGrades;
                            setOrchardHiveGrades(newOrchardHiveGrades);                                
                        }}>Add hive +</Button>
                        </div>                                                                                                                
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Notes" onChange={(event) => {
                        setNotes(event.target.value);
                    }}/>
                    <div className="w-full">
                        <Button variant="ghost" size="left">Add Photos +</Button>
                    </div>
                    <DialogFooter>
                        <Button variant="customSecondary" size="action" onClick={() => {                                                                                                      
                            // First update all the context data
                            setHivesCounted(hivesCountedLocal);
                            const newHivesGraded = [...hivesGraded, hiveDropHiveGrades.length];                                
                            setHivesGraded(newHivesGraded);                                
                            setAverage([...average, getHiveDropAverage(hiveDropHiveGrades)]);                                                                                    
                            // Then trigger the save operation
                            setApplyHiveDrop(applyHiveDrop + 1);
                            // Update UI state
                            setHiveDropIndex(hiveDropIndex + 1);
                            setIsOpen(false);
                            // Signal that form should be cleared after save
                            setShouldClearForm(true);
                        }}>Finish</Button>
                    </DialogFooter>
                </DialogContent>            
            </Dialog>
        </div>
    )
}
