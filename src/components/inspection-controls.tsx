import { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

// styling
import clsx from "clsx";

// context
import { useInspectionDataContext } from "@/data/inspectionDataContext";

export default function InspectionControls() {

    // const [standardDeviation, setStandardDeviation] = useState<number>(0);
    // const confidenceInterval = 1.960;
    // const marginOfError = 2
    // const sampleSize = Math.pow(confidenceInterval * standardDeviation / marginOfError, 2)
    const sampleSize = 100
    const populationSize = 1000
    const samplePercentage = sampleSize / populationSize * 100

    const [hivesCounted, setHivesCounted] = useState<number>(10);
    


    const { isInspectionModeActive } = useInspectionDataContext();
    const [gradedHives, setGradedHives] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const resetDialog = () => {
        setGradedHives([]);
    };

    return (
        <div id="inspection-controls-wrapper" className="absolute w-full z-5 flex gap-2 p-2 items-start">                                              
            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) resetDialog();
            }}>
                <DialogTrigger>
                    <div id="button-wrapper" className={clsx(isInspectionModeActive ? "block" : "hidden")}>
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
                        <Progress className="border-1 border-foreground-flexible-light" value={gradedHives.length/hivesCounted*100}/>
                    </DialogHeader>                
                    <Button variant="customSecondary"> Re-capture Location </Button>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="count">Hives counted</Label>
                            <Input type="number" id="count" placeholder="number" onChange={(event) => {
                                setHivesCounted(Number(event.target.value))
                                console.log(hivesCounted)
                            }}/>
                            <p className="text-sm text-muted-foreground">How many hives are there in this hive-drop?</p>
                        </div>
                        <Separator />
                        <h4>Hives graded: {gradedHives.length}</h4>
                        <div className="max-h-[300px] overflow-y-scroll">
                            {gradedHives.map((value, index) => (
                                <div key={index} className="flex gap-2">
                                    <p>Hive {index}</p>
                                    <Slider 
                                    defaultValue={[value]}
                                    max={24}
                                    step={1}
                                    color="brand-light"
                                    onValueChange={(newValue) => {
                                        gradedHives[index] = newValue[0];
                                        console.log(gradedHives)
                                    }}
                                    />                                
                                </div>
                            ))}                        
                        <Button variant="text" size="text" onClick={() => setGradedHives([...gradedHives, 12])}>Add hive +</Button>
                        </div>                    
                        <Separator />
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea id="notes" placeholder="Notes"/>
                        <Button variant="customSecondary" size="action">Add Photos</Button>
                        <DialogFooter>
                            <Button variant="action" size="action">Finish</Button>
                        </DialogFooter>
                </DialogContent>            
            </Dialog>
            <Accordion type="single" collapsible defaultValue="progress">
                <AccordionItem value="progress">
                    <AccordionTrigger>
                        <Progress className="border-1 border-foreground-flexible-light" value={50}/> 
                    </AccordionTrigger>
                    <AccordionContent>
                        <h4>Statistics</h4>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>   
        </div>
    )
}
