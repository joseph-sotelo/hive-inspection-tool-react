import { useState, useEffect } from "react";

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
    const populationSize = totalHivesContracted;

    const [standardDeviation, setStandardDeviation] = useState<number>(0);
    const confidenceInterval = 1.960;
    const marginOfError = 2
    const sampleSize = Math.pow(confidenceInterval * standardDeviation / marginOfError, 2)    
    const samplePercentage = sampleSize / populationSize

    const [hivesCounted, setHivesCounted] = useState<number>(0);
    const [totalHiveGrades, setTotalHiveGrades] = useState<number[][]>([]);

    const { isShown } = useInspectionData();
    const [hiveGrades, setHiveGrades] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentHiveDropIndex, setCurrentHiveDropIndex] = useState<number>(0);

    useEffect(() => {
        if (totalHiveGrades.length > 0) {
            calculateStandardDeviation();
        }
    }, [totalHiveGrades]);

    const calculateStandardDeviation = () => {
        console.log("here");
        const grades = totalHiveGrades.flat();
        if (grades.length === 0) return;

        // calculate mean
        const sum = grades.reduce((sum, grade) => sum + grade, 0);
        const mean = sum / grades.length;

        // calculate deviations
        const deviations = grades.reduce((sum, grade) => sum + Math.pow(grade - mean, 2), 0);

        // calculate variance
        const variance = deviations / grades.length;

        // calculate standard deviation
        const standardDeviation = Math.sqrt(variance);

        setStandardDeviation(standardDeviation);
    };

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
                                console.log(standardDeviation)                                                            
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
                                console.log(standardDeviation)         
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
                                console.log(standardDeviation)         
                                setIsOpen(false);
                                resetDialog();
                            }}>Finish</Button>
                        </DialogFooter>
                </DialogContent>            
            </Dialog>
            <Accordion type="single" collapsible defaultValue="progress">
                <AccordionItem value="progress">
                    <AccordionTrigger>
                        <Progress className="border-1 border-foreground-flexible-light" value={totalHiveGrades.flat().length/sampleSize*100}/> 
                    </AccordionTrigger>
                    <AccordionContent>
                        <h4>Statistics</h4>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>   
        </div>
    )
}
