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
import { Badge } from "@/components/ui/badge"

// context
import { useInspectionData } from "@/context/inspectionData"

interface InspectionSectionProps {
  toggleOpen: () => void;
}

export default function InspectionSection({ toggleOpen }: InspectionSectionProps) {

  // data from context used to fill out the hivedrops list
  const { setIsShown, hivesCounted, hivesGraded, average } = useInspectionData();

  // used to display the average as a badge with the correct variant
  const getBadgeVariant = (average: number): "pass" | "fail" | "low" | "outline" => {
    if (average === null) return "outline";
    if (average >= 7) return "pass";
    if (average >= 5) return "low";
    return "fail";
  };

  return (
    <>
      <Separator className="mb-5"/>
      <div className="flex flex-col gap-2">
        <Label>
          <p className="text-sm text-muted-foreground">
            Enter the orchard to begin an inspection
          </p>
        </Label>
        <Button 
          id="begin-inspection" 
          variant="action" 
          size="action" 
          onClick={() => (
            setIsShown(true),
            toggleOpen()            
          )}
        >
        Begin Inspection
        </Button>
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
                return (
                  <TableRow key={index}>                    
                    <TableCell>{count}</TableCell>
                    <TableCell>{hivesGraded[index]}</TableCell>
                    <TableCell>
                      {average[index] !== null ? (
                        <Badge variant={getBadgeVariant(average[index])}>
                          {Number(average[index]).toFixed(1)}
                        </Badge>
                      ) : null}
                    </TableCell>
                  </TableRow>
                )
              })}            
          </TableBody>
        </Table>
      </div>
    </>
  );
}