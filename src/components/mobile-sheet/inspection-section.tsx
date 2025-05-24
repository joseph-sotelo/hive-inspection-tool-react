// Inspection controls section
// Separating this makes the inspection logic easier to manage
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useInspectionDataContext } from "@/data/inspectionDataContext";

interface InspectionSectionProps {
  toggleOpen: () => void;
}

export default function InspectionSection({ toggleOpen }: InspectionSectionProps) {
  const { isInspectionModeActive, toggleInspectionMode } = useInspectionDataContext();

  const handleInspectionToggle = () => {
    toggleInspectionMode();
    toggleOpen();
    console.log(isInspectionModeActive);
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
          onClick={handleInspectionToggle}
        >
          {isInspectionModeActive ? "End Inspection" : "Begin Inspection"}
        </Button>
      </div>
    </>
  );
}