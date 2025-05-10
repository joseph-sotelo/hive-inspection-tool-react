import { useState } from "react";
import clsx from "clsx";

import { ChevronDown } from "lucide-react";
import { Badge } from "./ui/badge";
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

type MobileSheetProps = {
  F_title: string,
  F_status: string
}

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

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={clsx("px-6 pt-6 pb-20 rounded-xl w-full transition-all duration-400 h-9/10 absolute z-10 bg-white", {"top-1/10": isOpen, "top-9/10": !isOpen})}>
      <div id="peek" className="h-12 flex justify-between">
        <div>
          <h4>
            {props.F_title}
            <Badge variant="statusLow">Low</Badge>
          </h4>
        </div>
        <div onClick={() => (setIsOpen(!isOpen))}>
          <ChevronDown className={clsx({"rotate-180": !isOpen})}/>
        </div>
      </div>
      <div id="sheet-body" className="flex flex-col justify-between h-full">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Hive Contract Info</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-6">
                <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Deliery Complete</Label>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="text">Beekeeper</Label>
                <Input type="text" id="beekeper" placeholder="Beekeeper" />
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
            <AccordionTrigger>Field Info</AccordionTrigger>
            <AccordionContent>
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
                <Input type="text" id="primary-field-id" placeholder="Primary field ID" />
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
            <AccordionTrigger>Team Info</AccordionTrigger>
            <AccordionContent>
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
            <AccordionTrigger>Inspection Data</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-6">
                <Button>Begin Inspection</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button>Mark Complete</Button>
      </div>
    </div>
  );
}