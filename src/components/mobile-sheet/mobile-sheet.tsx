import { useRef } from "react";
import clsx from "clsx";

// UI imports
import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge, badgeVariantsType } from "@/components/ui/badge";

// Custom hooks - extracted logic for reusability and testability
import { useMobileSheetAnimation, useFormData, useClickOutside } from "@/hooks";

// Local component imports - each section is now its own component
import HiveContractSection from "./hive-contract-section";
import FieldInfoSection from "./field-info-section";
import TeamInfoSection from "./team-info-section";
import InspectionSection from "./inspection-section";
import SignatureSection from "./signature-section";

// Types
import { MobileSheetProps } from "../types";

// Constants
import { SHEET, STATUS_CONFIG } from "@/constants";

// Context
import { useInspectionData } from "@/context/inspectionData"

export default function MobileSheet({ props }: { props: MobileSheetProps }) {

  const { setIsShown } = useInspectionData();

  const sheetRef = useRef<HTMLDivElement>(null);

  // Use custom hooks to manage complex logic
  const { formData, handleChange } = useFormData(props);
  const { isOffScreen, isOpen, setIsOffScreen, toggleOpen } = useMobileSheetAnimation({
    fieldmapId: props.fieldmap_id_primary
  });

  // Handle clicking outside to close the sheet
  useClickOutside(sheetRef, () => setIsOffScreen(true));

  // Process status for display using constants
  let statusString = props.F_status.split("_")[0];
  const status = props.F_status ? statusString as badgeVariantsType : "default";
  if (statusString === "nodata") {
    statusString = STATUS_CONFIG.DISPLAY_NAMES.nodata;
  }

  // Determine delivery status text using constants
  let deliveryStatus = props.partdeliv_yn === "no" 
    ? STATUS_CONFIG.DELIVERY_STATUS.COMPLETE 
    : STATUS_CONFIG.DELIVERY_STATUS.INCOMPLETE;

  return (
    <div>
      <div 
        ref={sheetRef} 
        className={clsx(
          `shadow-md-reverse md:rounded-r-xl w-full transition-all ${SHEET.ANIMATION_DURATION} overflow-hidden bottom-0 absolute z-10 md:w-[440px] md:h-full`,
          {
            [`${SHEET.POSITIONS.HIDDEN} md:h-full`]: isOffScreen && !isOpen || isOffScreen && isOpen,
            [`${SHEET.POSITIONS.COLLAPSED} md:h-full`]: !isOffScreen && !isOpen,
            [`${SHEET.POSITIONS.EXPANDED} md:h-full`]: !isOffScreen && isOpen
          }
        )}
      >
        {/* Header/Peek section */}
        <div 
          id="peek" 
          className="p-6 flex justify-between border-1 rounded-t-xl md:rounded-none bg-background"
        >
          <div className="flex flex-col gap-2">
            <h4>
              {props.client} | {props.fieldmap_id_primary}
            </h4>
            <div>
              <Badge variant={status}>Status: {statusString}</Badge> 
              <small className="text-sm text-foreground-flexible ml-2">
                Delivery {deliveryStatus}: {props.hives_contracted} hives
              </small>
            </div>
          </div>
          <div onClick={toggleOpen}>
            <ChevronDown className={clsx("md:hidden", { "rotate-180": !isOpen })} />
          </div>
        </div>

        {/* Main content body */}
        <div 
          id="body" 
          className="p-2 flex flex-col gap-6 items-center h-full overflow-scroll bg-background-secondary border-x-1 border-border"
        >
          <Accordion type="single" collapsible defaultValue="item-4">
            {/* Hive Contract Information */}
            <AccordionItem value="item-1">
              <AccordionTrigger>Hive Contract Info</AccordionTrigger>
              <AccordionContent>
                <HiveContractSection formData={formData} handleChange={handleChange} />
              </AccordionContent>
            </AccordionItem>

            {/* Field Information */}
            <AccordionItem value="item-2">
              <AccordionTrigger>Field Info</AccordionTrigger>
              <AccordionContent>
                <FieldInfoSection formData={formData} handleChange={handleChange} />
              </AccordionContent>
            </AccordionItem>

            {/* Team Information */}
            <AccordionItem value="item-3">
              <AccordionTrigger>Team Info</AccordionTrigger>
              <AccordionContent>
                <TeamInfoSection formData={formData} handleChange={handleChange} />
              </AccordionContent>
            </AccordionItem>

            {/* Inspection Data */}
            <AccordionItem value="item-4">
              <AccordionTrigger>Inspection Data</AccordionTrigger>
              <AccordionContent>
                <InspectionSection toggleOpen={toggleOpen} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Signature section */}
          <SignatureSection />

          {/* Submit button */}
          <Button 
            variant="customSecondary" 
            size="lg" 
            onClick={() => {
              props.onMarkComplete(formData);
              setIsShown(false);
            }}>
            Mark Complete
          </Button>
        </div>
      </div>
    </div>
  );
}