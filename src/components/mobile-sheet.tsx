import { useState, useEffect } from "react";
import clsx from "clsx";

import { ChevronDown } from "lucide-react";
// import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Combobox } from "./combobox";
import { Button } from "@/components/ui/button"
import { Badge, badgeVariantsType } from "@/components/ui/badge"

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
    fieldmap_id_primary: props.fieldmap_id_primary
  })

  // ensures the mobile sheet content updates when a new feature is clicked
  useEffect(() => {
    setFormData({
      client: props.client,
      F_status: props.F_status,
      fieldmap_id_primary: props.fieldmap_id_primary
    });
  }, [props.client, props.F_status, props.fieldmap_id_primary]);

  // updates formData to inclue the user inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, fieldmap_id_primary: event.target.value})
  }

  // toggles the mobile sheet open and closed
  const [isOpen, setIsOpen] = useState(true);

  const status = props.F_status.split("_")[0] as badgeVariantsType

  return (
    <div className={clsx("shadow-md-reverse rounded-t-xl w-full transition-all duration-400 h-9/10 absolute z-10", {"top-1/10": isOpen, "top-9/10": !isOpen})}>
      {/* <div id="peek" className={clsx("p-6 flex justify-between border-1 rounded-t-xl border-border-flexible bg-background", {"bg-status-fail": status === "fail", "bg-status-low": status === "low", "bg-status-pass": status === "pass"})}> */}
      <div id="peek" className={clsx("p-6 flex justify-between border-1 rounded-t-xl bg-[#F5F7F6]")}>
        <div className="flex flex-col gap-2">
          <h4>
            {props.client} | {props.fieldmap_id_primary}
          </h4>
          <div className="flex items-center gap-2">
            <Badge variant={status}>Status: {status}</Badge> 
            <small className="text-sm font-semibold leading-none text-foreground-flexible">Delivery complete</small>
          </div>
          
        </div>
        <div onClick={() => (setIsOpen(!isOpen))}>
          <ChevronDown className={clsx({"rotate-180": !isOpen})}/>
        </div>
      </div>
      <div id="sheet-body" className="px-2 pt-2 pb-20 flex flex-col justify-between h-full bg-[#F5F7F6] border-border">
        <Accordion type="single" collapsible className="flex flex-col gap-2">
          <AccordionItem value="item-1" className="border-1 rounded-2xl bg-background px-3 ">
            <AccordionTrigger>
              <div className="text-lg px-2">Hive Contract Info</div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-6 p-2">
                <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Deliery Complete</Label>
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
          <AccordionItem value="item-2" className="border-1 rounded-2xl bg-background px-3 ">
            <AccordionTrigger>
              <div className="text-lg px-2">Field Info</div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-6 p-2"> 
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
          <AccordionItem value="item-3" className="border-1 rounded-2xl bg-background px-3 ">
            <AccordionTrigger>
              <div className="text-lg px-2">Team Info</div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-6 p-2">
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
          <AccordionItem value="item-4" className="border-1 rounded-2xl bg-background px-3 ">
            <AccordionTrigger>
              <div className="text-lg px-2">Inspection Data</div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-6 p-2">
                <Button variant="outline">Begin Inspection</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button onClick={() =>props.onMarkComplete(formData)}>Mark Complete</Button>
      </div>
    </div>
  );
}