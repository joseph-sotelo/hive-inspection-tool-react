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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

// styling
import clsx from "clsx";

// context
import { useInspectionData } from "@/context/inspectionData"
import { useArray2dReplace, useArrayReplace } from "@/hooks";

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
        hivesCounted, 
        setHivesCounted, 
        notes, 
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
    // updates the sample percentage whenever the user adds a new hive

    useEffect(() => {
        if (orchardHiveGrades.length > 0) {            
            const percentage = getSamplePercentage({ 
                populationSize: totalHivesContracted, 
                totalHiveGrades: orchardHiveGrades
            });
            setSamplePercentage(percentage);            
        }
    }, [orchardHiveGrades, totalHivesContracted]);
    // ensures the dialog starts off empty 
    const resetDialog = () => {
        setHiveDropHiveGrades([]);
    };

    return (
        <div id="inspection-controls-wrapper" className="absolute w-full z-5 flex gap-2 p-2 items-start">                                              
            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) resetDialog();
            }}>
                <DialogTrigger>
                    <div id="button-wrapper" className={clsx(isShown ? "block" : "hidden")}>
                        <Button variant="action" size="action">
                            Add hive-drop
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            New Hive-Drop
                        </DialogTitle>
                        <Progress 
                            className="border-1 border-foreground-flexible-light"
                            value={(hiveDropHiveGrades.length / (hivesCounted[hiveDropIndex] * samplePercentage)) * 100}
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
                                    const newHivesCounted = [...hivesCounted];
                                    newHivesCounted[hiveDropIndex] = Number(event.target.value);
                                    setHivesCounted(newHivesCounted);
                                }}/>
                            <p className="text-sm text-muted-foreground">How many hives are there in this hive-drop?</p>
                        </div>
                        <Separator />
                        <h4>Hives graded: {hiveDropHiveGrades.length}</h4>
                        <div className="max-h-[300px] overflow-y-scroll">
                            {hiveDropHiveGrades.map((value, index) => (
                                <div key={index} className="flex gap-2">
                                    <p>Hive {index}</p>
                                    <Slider 
                                    defaultValue={[value]}
                                    max={24}
                                    step={1}
                                    color="brand-light"
                                    onValueChange={(newValue) => {
                                        const newGrades = [...hiveDropHiveGrades];
                                        newGrades[index] = newValue[0];
                                        setHiveDropHiveGrades(newGrades);

                                        
                                    }}
                                    />                                
                                </div>
                            ))}                        
                            <Button variant="text" size="text" onClick={() => {  
                                setHiveDropHiveGrades([...hiveDropHiveGrades, 12])                                
                                setOrchardHiveGrades(useArray2dReplace({array: orchardHiveGrades, index: hiveDropIndex, value: hiveDropHiveGrades}))
                                console.log("hiveDropHiveGrades", hiveDropHiveGrades)
                                console.log("orchardHiveGrades", orchardHiveGrades)
                            }}>Add hive +</Button>
                        </div>                    
                        <Separator />
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea id="notes" placeholder="Notes" value={notes[hiveDropIndex]} onChange={(event) => {
                            const newNotes = [...notes];
                            newNotes[hiveDropIndex] = event.target.value;
                            setNotes(newNotes);
                        }}/>
                        <Button variant="customSecondary" size="action">Add Photos</Button>
                        <DialogFooter>
                            <Button variant="action" size="action" onClick={() => {                                
                                setHiveDropIndex(hiveDropIndex + 1);      
                                setApplyHiveDrop(applyHiveDrop + 1);
                                setIsOpen(false);
                                resetDialog();
                            }}>Finish</Button>
                        </DialogFooter>
                </DialogContent>            
            </Dialog>
            <Accordion type="single" collapsible defaultValue="progress">
                <AccordionItem value="progress">
                    <AccordionTrigger>
                        <Progress className="border-1 border-foreground-flexible-light" value={orchardHiveGrades.flat().length/(totalHivesContracted*samplePercentage)*100}/> 
                    </AccordionTrigger>
                    <AccordionContent>
                        <h4>Statistics</h4>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>   
        </div>
    )
}
