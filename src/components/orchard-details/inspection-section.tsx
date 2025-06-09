// UI
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,  
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AverageBadge from "@/components/ui/average-badge"

// context
import { useInspectionData } from "@/context/inspectionData"

interface InspectionSectionProps {
  toggleOpen: () => void;
}

export default function InspectionSection({ toggleOpen }: InspectionSectionProps) {

  // data from context used to fill out the hivedrops list
  const { setIsShown, hivesCounted, hivesGraded, average, isShown } = useInspectionData();

  return (
    <>
      <Separator className="mb-5"/>
      <div className="flex flex-col gap-2 bg-background">
        <Label>
          <p className="text-sm text-muted-foreground">
            Enter the orchard to begin an inspection
          </p>
        </Label>
        <Button 
          id="begin-inspection" 
          variant={isShown ? "customSecondary" : "action"} 
          size="action" 
          onClick={() => (
            setIsShown(!isShown),
            toggleOpen()
          )}
        >
          {isShown ? "End Inspection" : "New Inspection"}
        </Button>
        {hivesCounted.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>              
              <TableHead>Hives Counted</TableHead>
              <TableHead>Hives Graded</TableHead>
              <TableHead>Average</TableHead>
            </TableRow>
          </TableHeader>            
          <TableBody>            
              {hivesCounted.map((count, index) => {
                console.log('average: ', average[index])
                return (
                  <TableRow key={index}>                    
                    <TableCell>{count}</TableCell>
                    <TableCell>{hivesGraded[index]}</TableCell>
                    <TableCell>
                      {average[index] !== null && (
                        <AverageBadge value={average[index]}>{Number(average[index]).toFixed(1)}</AverageBadge>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}    
          </TableBody>
        </Table>              
        )}                  
      </div>
    </>
  );
}