// UI
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";

// types
import { HiveDropDialogProps } from "../types";
import { Button } from "../ui/button";

// context
import { useInspectionData } from "@/context/inspectionData/useInspectionData";

export default function HiveDropDialog({ props }: { props: HiveDropDialogProps }) {
 
    // toggles the dialog open or closed
    const { isHiveDropDialogOpen, setIsHiveDropDialogOpen } = useInspectionData();
    // ensures the dialog starts off empty 
    // const resetDialog = () => {
    //     setHiveDropHiveGrades([]);
    // };

    return (
        <div id="hivedrop-dialog-wrapper" className="absolute w-full z-5 flex gap-2 p-2 items-start">                                              
            <Dialog open={isHiveDropDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Hive Drop {props.index}
                        </DialogTitle>
                    </DialogHeader>                                    
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="count">Hives counted</Label>
                            <Input 
                                disabled
                                type="number" 
                                id="count" 
                                value={props.count}
                                placeholder="number" 
                            />
                            <p className="text-sm text-muted-foreground">Number of hives in this hive drop</p>
                        </div>
                        <Separator />
                        <h4>Hives graded: {props.grades.length}</h4>
                        <div className="max-h-[300px] overflow-y-scroll">
                            {props.grades.map((value, index) => (
                                <div key={index} className="flex gap-2">
                                    <p>Hive {index}</p>
                                    <Slider     
                                    disabled
                                    defaultValue={[value]}
                                    max={24}
                                    step={1}
                                    color="brand-light"
                                    />                                
                                </div>
                            ))}                        
                        </div>                    
                        <Separator />
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea disabled id="notes" placeholder="Notes" value={props.notes}/>                        
                        <DialogFooter>
                            <Button variant="secondary" size="action" onClick={() => setIsHiveDropDialogOpen(false)}>Close</Button>
                        </DialogFooter>
                </DialogContent>            
            </Dialog>
        </div>
    )
}
