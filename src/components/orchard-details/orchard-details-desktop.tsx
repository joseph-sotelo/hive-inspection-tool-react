import { useRef } from "react";
import clsx from "clsx";

// UI imports
import { ChartNoAxesColumn, Check, ChevronDown, MapPin, ReceiptText, Users, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/status-badge";

// Custom hooks - extracted logic for reusability and testability
import { useMobileSheetAnimation, useFormData } from "@/hooks";

// Local component imports - each section is now its own component
import HiveContractSection from "./hive-contract-section";
import FieldInfoSection from "./field-info-section";
import TeamInfoSection from "./team-info-section";
import InspectionSection from "./inspection-section";
import SignatureSection from "./signature-section";

// Types
import { OrchardDetailsProps } from "../types";

// Constants
import { SHEET, STATUS_CONFIG } from "@/constants";

// Context
import { useInspectionData } from "@/context/inspectionData"

export default function OrchardDetailsDesktop({ props }: { props: OrchardDetailsProps }) {

  const { setIsShown } = useInspectionData();

  const sheetRef = useRef<HTMLDivElement>(null);

  // Use custom hooks to manage complex logic
  const { formData, handleChange } = useFormData(props);
  const { isOffScreen, setIsOffScreen, toggleOpen } = useMobileSheetAnimation({
    fieldmapId: props.fieldmap_id_primary
  });

  // Determine delivery status text using constants
  let deliveryStatus = props.partdeliv_yn === "no" 
    ? STATUS_CONFIG.DELIVERY_STATUS.COMPLETE 
    : STATUS_CONFIG.DELIVERY_STATUS.INCOMPLETE;

  return (
    <div>
      <div 
        ref={sheetRef} 
        className={clsx(
          `shadow-md transition-all ${SHEET.ANIMATION_DURATION} overflow-hidden bottom-0 absolute z-10 h-full border-r-1`,
          {            
            [`${SHEET.POSITIONS_DESKTOP.COLLAPSED}`]: isOffScreen,
            [`${SHEET.POSITIONS_DESKTOP.EXPANDED}`]: !isOffScreen
          }
        )}
      >
        {/* Header/Peek section */}
        <div 
          id="peek" 
          className="p-6 flex justify-between border-b-1 rounded-none bg-background w-[440px]"
        >
          <div className="flex flex-col gap-2">
            <h4>
              {props.client} | {props.fieldmap_id_primary}
            </h4>
            <div>
              <StatusBadge status={props.F_status} />
              <small className="text-sm text-foreground-flexible ml-2">
                Delivery {deliveryStatus}: {props.hives_contracted} hives
              </small>
            </div>
          </div>
          <div onClick={() => setIsOffScreen(true)}>
            <X width="16" height="16" />
          </div>
        </div>

        {/* Main content body */}
        <div 
          id="body" 
          className="p-2 flex flex-col gap-6 items-center h-full overflow-scroll bg-background-secondary w-[440px]"
        >
          <Accordion type="single" collapsible defaultValue="item-4">
            {/* Hive Contract Information */}
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2"> 
                  <ReceiptText width="16" height="16" />
                  Hive Contract Info
                </div>
                </AccordionTrigger>
              <AccordionContent>
                <HiveContractSection formData={formData} handleChange={handleChange} />
              </AccordionContent>
            </AccordionItem>

            {/* Field Information */}
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2"> 
                  <MapPin width="16" height="16" />
                  Field Info
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <FieldInfoSection formData={formData} handleChange={handleChange} />
              </AccordionContent>
            </AccordionItem>

            {/* Team Information */}
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2"> 
                  <Users width="16" height="16" />
                  Team Info
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <TeamInfoSection formData={formData} handleChange={handleChange} />
              </AccordionContent>
            </AccordionItem>

            {/* Inspection Data */}
            <AccordionItem value="item-4">
              <AccordionTrigger className="flex items-center gap-2">
                <div className="flex items-center gap-2">     
                  <ChartNoAxesColumn width="16" height="16" />             
                  Inspection Data                   
                </div>                
              </AccordionTrigger>
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
            <Check width="16" height="16" />
            Mark Complete
          </Button>
        </div>
      </div>
    </div>
  );
}