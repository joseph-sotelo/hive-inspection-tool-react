// UI
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// context
import { useInspectionData } from "@/context/inspectionData"

interface InspectionSectionProps {
  toggleOpen: () => void;
}

export default function InspectionSection({ toggleOpen }: InspectionSectionProps) {
  const { setIsShown, isShown } = useInspectionData();

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
            toggleOpen(),
            console.log(isShown)
          )}
        >
        Begin Inspection
        </Button>
      </div>
    </>
  );
}