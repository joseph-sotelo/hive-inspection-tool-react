import { useContext } from "react";
import { InspectionDataContext } from "@/data/inspectionDataContext";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function InspectionControls() {
    const isInspectionModeActive = useContext(InspectionDataContext);
    return (
        <div id="button-wrapper" className={clsx("w-full z-5 bottom-36 flex flex-col justify-center px-24", isInspectionModeActive ? "absolute" : "hidden")}>
            <Button variant="action" size="action">
                Add hive-drop
            </Button>
        </div>
    )
}
