import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ui imports
import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Combobox } from "./combobox";
import { Button } from "@/components/ui/button"
import { Badge, badgeVariantsType } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import SignatureCanvas from 'react-signature-canvas'


// types
import { MobileSheetProps } from "./types";

const clients = {
  optionsType: "client",
  options: [
    {
      value: "Matthews",
      label: "Matthews"
    },
    {
      value: "Pittigliano/Everret",
      label: "Pittigliano/Everret"
    }
  ]
}

const members = {
  optionsType: "member",
  options: [
    {
      value: "Frank",
      label: "Frank"
    },
    {
      value: "Veronica",
      label: "Veronica"
    },
      {
      value: "Lee",
      label: "Lee"
    }
  ]
}

export default function MobileSheet({props}: {props: MobileSheetProps}) {

  // formData will be passed to the applyEdits method when Mark Complete button is pressed
  const [formData, setFormData] = useState({
    client: props.client,
    F_status: props.F_status,
    fieldmap_id_primary: props.fieldmap_id_primary,
    partdeliv_yn: props.partdeliv_yn,
    hives_contracted: props.hives_contracted
  })

  useEffect(() => { 
    // ensures the mobile sheet content updates when a new feature is clicked
    setFormData({
      client: props.client,
      F_status: props.F_status,
      fieldmap_id_primary: props.fieldmap_id_primary,
      partdeliv_yn: props.partdeliv_yn,
      hives_contracted: props.hives_contracted
    });
    // ensures the mobile sheet does not mount in the 'open' position
    setIsOpen(false)
  }, [props.client, props.F_status, props.fieldmap_id_primary]);
  
  // used for mounting and unmounting animations
  const [isOffScreen, setIsOffScreen] = useState(true);

  useEffect(() => {
    if (props.fieldmap_id_primary !== undefined){
      // causes the mobile sheet to slide up rather than appear
      setIsOffScreen(false);
    } else {
      // prevents an empty mobile sheet from appearing when the user clicks on a non-feature part of the map
      setIsOffScreen(true);
    }
  }, [props]);

  // used to animate the mobile sheet closing when the user clicks outside of it
  const exit = (event: MouseEvent) => {
    if (sheetRef.current && !sheetRef.current.contains(event.target as Node)){
      setIsOffScreen(true);
    }
  }

  // updates formData to inclue the user inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, fieldmap_id_primary: event.target.value})
    console.log(formData);
  }

  // used for toggling the mobile sheet open and closed
  const [isOpen, setIsOpen] = useState(false);

  // gets the first part of the F_status attribute for conditional styling and text
  let statusString = props.F_status.split("_")[0]
  // will be passed to the badge component as a variant type
  const status = props.F_status ? statusString as badgeVariantsType : "default";
  if (statusString = "nodata") {
    statusString = "no data";
  }

  // references the entire mobile sheet so that exit() can detect when the user clicked outside of it
  const sheetRef = useRef<HTMLDivElement>(null);

  // used to call exit() on click
  document.addEventListener("click", exit)

  // used for conditionally rendering the text in the 'peek'
  let deliveryStatus = props.partdeliv_yn === "no" ? "complete" : "incomplete";

  return (
    <div ref={sheetRef} className={clsx("shadow-md-reverse rounded-t-xl w-full transition-all duration-400 overflow-hidden bottom-0 absolute z-10", {"h-0": isOffScreen && !isOpen || isOffScreen && isOpen, "h-[108px]": !isOffScreen && !isOpen, "h-9/10": !isOffScreen && isOpen})}>
      <div id="peek" className={clsx("p-6 flex justify-between border-1 rounded-t-xl bg-background")}>
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
        <div onClick={() => (setIsOpen(!isOpen))}>
          <ChevronDown className={clsx({"rotate-180": !isOpen})}/>
        </div>
      </div>
      <div id="body" className="px-2 pt-6 flex flex-col gap-6 items-center h-full overflow-scroll bg-background-secondary border-x-1 border-border">
        <Accordion type="single" collapsible defaultValue="item-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Hive Contract Info
            </AccordionTrigger>
            <AccordionContent>
              <Separator className="mb-5"/>
              <div className="flex flex-col gap-6">
                <div className="flex items-center space-x-2">
                <Switch id="delivery-complete" checked={props.partdeliv_yn === "no"}/>
                <Label htmlFor="delivery-complete">Delivery Complete</Label>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="text">Beekeeper</Label>
                <Input type="text" id="beekeper" placeholder="Beekeeper"/>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="text">Bee broker</Label>
                <Input type="text" id="bee-broker" placeholder="Bee broker" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="number">Total hives</Label>
                <Input type="number" id="total-hives" placeholder="0" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="number">Average frames</Label>
                <Input type="number" id="average-frames" placeholder="0" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="number">Minimum frames</Label>
                <Input type="number" id="minimum-frames" placeholder="0" />
              </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Field Info
            </AccordionTrigger>
            <AccordionContent className="px-1 pb-5">
              <Separator className="mb-5"/>
              <div className="flex flex-col gap-6"> 
                <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label >Client</Label>
                <Combobox props={clients} />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="text">Grower</Label>
                <Input type="text" id="grower" placeholder="Grower" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="text">Primary field ID</Label>
                <Input type="text" id="primary-field-id" placeholder="Primary field ID" value={formData.fieldmap_id_primary || ""} onChange={handleChange}/>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="text">Auxilary Field ID</Label>
                <Input type="text" id="auxilary-field-id" placeholder="Auxilary Field ID" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="text">Crossroads</Label>
                <Input type="text" id="crossroads" placeholder="Crossroads" />
              </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Team Info
            </AccordionTrigger>
            <AccordionContent>
              <Separator className="mb-5"/>
              <div className="flex flex-col gap-6">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label >Team leader</Label>
                  <Combobox props={members} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label >Assistants</Label>
                  <Combobox props={members} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Inspection Data
            </AccordionTrigger>
            <AccordionContent>
              <Separator className="mb-5"/>
              <div className="flex flex-col gap-6">
                <Button variant="action" size="action">Begin Inspection</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div id="signature-section" className="w-full flex flex-col items-center gap-3">
          <div className="text-base">Signature</div>
          <div id="signature-canvas-wrapper" className="bg-white inset-shadow-md rounded-2xl border-1 border-border p-2 flex items-center justify-center">
            <SignatureCanvas penColor="black" canvasProps={{width: 270, height: 200, className: 'sigCanvas'}} backgroundColor="rgba(255, 255, 255, 1)"/>
          </div>
        </div>
        <Button variant="outlineBranded" size="action" onClick={() => props.onMarkComplete(formData)}>Mark Complete</Button>
      </div>
    </div>
  );
}