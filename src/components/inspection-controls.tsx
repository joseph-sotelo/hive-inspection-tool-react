import { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";

// styling
import clsx from "clsx";

// context
import { useInspectionDataContext } from "@/data/inspectionDataContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function InspectionControls() {

    const { isInspectionModeActive } = useInspectionDataContext();
    const [gradedHives, setGradedHives] = useState<number[]>([12]);

    return (
        <Dialog>
            <DialogTrigger>
                <div id="button-wrapper" className={clsx("w-full z-5 bottom-36 flex flex-col justify-center px-24", isInspectionModeActive ? "absolute" : "hidden")}>
                    <Button variant="action" size="action" onClick={() => {
                            console.log(isInspectionModeActive)
                        }}>
                        Add hive-drop
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New Hive-Drop
                    </DialogTitle>
                </DialogHeader>                
                <Button variant="customSecondary"> Re-capture Location </Button>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="number">Minimum frames</Label>
                        <Input type="number" id="count" placeholder="number"/>
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
                                }}
                                />                                
                            </div>
                        ))}                        
                    <Button variant="text" size="text" onClick={() => setGradedHives([...gradedHives, 12])}>Add hive +</Button>
                    </div>                    
                    <Separator />
                    <Label htmlFor="text">Notes</Label>
                    <textarea id="notes" placeholder="Notes"/>
                    <Button variant="customSecondary" size="action">Add Photos</Button>
                    <DialogFooter>
                        <Button variant="action" size="action">Finish</Button>
                    </DialogFooter>
            </DialogContent>            
        </Dialog>
    )
}
