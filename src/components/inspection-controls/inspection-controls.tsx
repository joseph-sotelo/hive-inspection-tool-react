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

interface InspectionControlsProps {
    totalHivesContracted: number;
}

export default function InspectionControls({ totalHivesContracted }: InspectionControlsProps) {

    // toggles the inspection cotrols visible or invisible
    const { isShown,  } = useInspectionData();
    // the minimum percentage of hives that need to be graded
    const [samplePercentage, setSamplePercentage] = useState<number>(0);
    // the number of hives counted within the focused hivedrop
    const [hivesCounted, setHivesCounted] = useState<number>(0);
    // the grades for the entire orchard. Used for overview progress bar
    const [totalHiveGrades, setTotalHiveGrades] = useState<number[][]>([]);
    // the grades within the focused hive drop
    const [hiveGrades, setHiveGrades] = useState<number[]>([]);
    // toggles the dialog open or closed
    const [isOpen, setIsOpen] = useState(false);
    // the index of the current hive drop. Used for updating the totalHiveGrades array
    const [currentHiveDropIndex, setCurrentHiveDropIndex] = useState<number>(0);
    // updates the sample percentage whenever the user adds a new hive
    useEffect(() => {
        if (totalHiveGrades.length > 0) {
            const percentage = getSamplePercentage({ 
                populationSize: totalHivesContracted, 
                totalHiveGrades 
            });
            setSamplePercentage(percentage);
        }
    }, [totalHiveGrades, totalHivesContracted]);
    // ensures the dialog starts off empty 
    const resetDialog = () => {
        setHiveGrades([]);
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
                            value={(hiveGrades.length / (hivesCounted * samplePercentage)) * 100}
                        />
                    </DialogHeader>                
                    <Button variant="customSecondary"> Re-capture Location </Button>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="count">Hives counted</Label>
                            <Input type="number" id="count" placeholder="number" onChange={(event) => {
                                setHivesCounted(Number(event.target.value));                                                                
                            }}/>
                            <p className="text-sm text-muted-foreground">How many hives are there in this hive-drop?</p>
                        </div>
                        <Separator />
                        <h4>Hives graded: {hiveGrades.length}</h4>
                        <div className="max-h-[300px] overflow-y-scroll">
                            {hiveGrades.map((value, index) => (
                                <div key={index} className="flex gap-2">
                                    <p>Hive {index}</p>
                                    <Slider 
                                    defaultValue={[value]}
                                    max={24}
                                    step={1}
                                    color="brand-light"
                                    onValueChange={(newValue) => {
                                        const newHiveGrades = [...hiveGrades];
                                        newHiveGrades[index] = newValue[0];
                                        setHiveGrades(newHiveGrades);
                                        
                                        const newTotalHiveGrades = [...totalHiveGrades];
                                        newTotalHiveGrades[currentHiveDropIndex] = newHiveGrades;
                                        setTotalHiveGrades(newTotalHiveGrades);
                                    }}
                                    />                                
                                </div>
                            ))}                        
                            <Button variant="text" size="text" onClick={() => {
                                setHiveGrades([...hiveGrades, 12])
                            }}>Add hive +</Button>
                        </div>                    
                        <Separator />
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea id="notes" placeholder="Notes"/>
                        <Button variant="customSecondary" size="action">Add Photos</Button>
                        <DialogFooter>
                            <Button variant="action" size="action" onClick={() => {
                                setTotalHiveGrades([...totalHiveGrades, hiveGrades])
                                setCurrentHiveDropIndex(currentHiveDropIndex + 1);      
                                setIsOpen(false);
                                resetDialog();
                            }}>Finish</Button>
                        </DialogFooter>
                </DialogContent>            
            </Dialog>
            <Accordion type="single" collapsible defaultValue="progress">
                <AccordionItem value="progress">
                    <AccordionTrigger>
                        <Progress className="border-1 border-foreground-flexible-light" value={totalHiveGrades.flat().length/(totalHivesContracted*samplePercentage)*100}/> 
                    </AccordionTrigger>
                    <AccordionContent>
                        <h4>Statistics</h4>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>   
        </div>
    )
}
