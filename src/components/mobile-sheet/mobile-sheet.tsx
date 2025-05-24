// Refactored mobile sheet with extracted sections for better maintainability
// Breaking up large components makes them easier to understand and modify
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// UI imports
import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge, badgeVariantsType } from "@/components/ui/badge";

// Local component imports - each section is now its own component
import HiveContractSection from "./hive-contract-section";
import FieldInfoSection from "./field-info-section";
import TeamInfoSection from "./team-info-section";
import InspectionSection from "./inspection-section";
import SignatureSection from "./signature-section";

// Types
import { MobileSheetProps } from "../types";

export default function MobileSheet({ props }: { props: MobileSheetProps }) {
  // Form data state - centralized for all sections
  const [formData, setFormData] = useState({
    client: props.client,
    F_status: props.F_status,
    fieldmap_id_primary: props.fieldmap_id_primary,
    partdeliv_yn: props.partdeliv_yn,
    hives_contracted: props.hives_contracted,
    beekeeper: props.beekeeper,
    bee_broker: props.bee_broker,
    average: props.average,
    minimum: props.minimum,
    grower: props.grower,
    fieldmap_id_auxiliary: props.fieldmap_id_auxiliary,
    crossroads: props.crossroads,
    team_leader: props.team_leader,
    assistants: props.assistants
  });

  // Animation and visibility state
  const [isOffScreen, setIsOffScreen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Update form data when props change (new feature selected)
  useEffect(() => { 
    setFormData({
      client: props.client,
      F_status: props.F_status,
      fieldmap_id_primary: props.fieldmap_id_primary,
      partdeliv_yn: props.partdeliv_yn,
      hives_contracted: props.hives_contracted === null ? "" : props.hives_contracted,
      beekeeper: props.beekeeper === null ? "" : props.beekeeper,
      bee_broker: props.bee_broker === null ? "" : props.bee_broker,
      average: props.average === null ? "" : props.average,
      minimum: props.minimum === null ? "" : props.minimum,
      grower: props.grower === null ? "" : props.grower,
      fieldmap_id_auxiliary: props.fieldmap_id_auxiliary === null ? "" : props.fieldmap_id_auxiliary,
      crossroads: props.crossroads === null ? "" : props.crossroads,
      team_leader: props.team_leader === null ? "" : props.team_leader,
      assistants: props.assistants === null ? [] : props.assistants
    });
    setIsOpen(false); // Reset to collapsed state
  }, [props.client, props.F_status, props.fieldmap_id_primary]);

  // Handle entry/exit animations
  useEffect(() => {
    if (props.fieldmap_id_primary !== undefined) {
      setIsOffScreen(false); // Slide up from bottom
    } else {
      setIsOffScreen(true); // Hide completely
    }
  }, [props]);

  // Handle clicking outside to close
  const exit = (event: MouseEvent) => {
    if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
      setIsOffScreen(true);
    }
  };

  // Form data update handler - passed to all sections
  const handleChange = (key: string, value: string | boolean | number) => {
    setFormData({ ...formData, [key]: value });
    console.log(formData);
  };

  // Add click listener (TODO: should be moved to useEffect for proper cleanup)
  document.addEventListener("click", exit);

  // Process status for display
  let statusString = props.F_status.split("_")[0];
  const status = props.F_status ? statusString as badgeVariantsType : "default";
  if (statusString === "nodata") {
    statusString = "no data";
  }

  // Determine delivery status text
  let deliveryStatus = props.partdeliv_yn === "no" ? "complete" : "incomplete";

  return (
    <div>
      <div 
        ref={sheetRef} 
        className={clsx(
          "shadow-md-reverse rounded-t-xl w-full transition-all duration-400 overflow-hidden bottom-0 absolute z-10",
          {
            "h-0": isOffScreen && !isOpen || isOffScreen && isOpen,
            "h-[108px]": !isOffScreen && !isOpen,
            "h-9/10": !isOffScreen && isOpen
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
          <div onClick={() => setIsOpen(!isOpen)}>
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
                <InspectionSection setIsOpen={setIsOpen} isOpen={isOpen} />
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