// UI
import { Button } from "@/components/ui/button";

// styling
import clsx from "clsx";

// context
import { useInspectionDataContext } from "@/data/inspectionDataContext";

export default function InspectionControls() {

    const { isInspectionModeActive } = useInspectionDataContext();

    return (
        <div id="button-wrapper" className={clsx("w-full z-5 bottom-36 flex flex-col justify-center px-24", isInspectionModeActive ? "absolute" : "hidden")}>
            <Button variant="action" size="action" onClick={() => {
                    console.log(isInspectionModeActive)
                  }}>
                Add hive-drop
            </Button>
        </div>
    )
}
