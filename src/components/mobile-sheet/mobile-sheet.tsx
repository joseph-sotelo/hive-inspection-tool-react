// Refactored mobile sheet using custom hooks for better maintainability
// Custom hooks extract reusable logic and make components easier to test
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
import { MOBILE_SHEET, STATUS_CONFIG } from "@/constants";

export default function MobileSheet({ props }: { props: MobileSheetProps }) {
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
          `shadow-md-reverse rounded-t-xl w-full transition-all ${MOBILE_SHEET.ANIMATION_DURATION} overflow-hidden bottom-0 absolute z-10`,
          {
            [MOBILE_SHEET.HEIGHTS.HIDDEN]: isOffScreen && !isOpen || isOffScreen && isOpen,
            [MOBILE_SHEET.HEIGHTS.COLLAPSED]: !isOffScreen && !isOpen,
            [MOBILE_SHEET.HEIGHTS.EXPANDED]: !isOffScreen && isOpen
          }
        )}
      >
        {/* Header/Peek section */}
        <div 
          id="peek" 
          className="p-6 flex justify-between border-1 rounded-t-xl bg-background"
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
            <ChevronDown className={clsx({ "rotate-180": !isOpen })} />
          </div>
        </div>

        {/* Main content body */}
        <div 
          id="body" 
          className="px-2 pt-6 flex flex-col gap-6 items-center h-full overflow-scroll bg-background-secondary border-x-1 border-border"
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
            size="action" 
            onClick={() => props.onMarkComplete(formData)}
          >
            Mark Complete
          </Button>
        </div>
      </div>
    </div>
  );
}