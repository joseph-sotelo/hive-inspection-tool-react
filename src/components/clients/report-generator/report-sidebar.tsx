import { Combobox } from "@/components/combobox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Checkbox } from "@/components/ui/checkbox"

export default function ReportSidebar() {
    return (       
        <div className="w-[440px] border-l-1 border-border">
            <div>
                <h1>Generate Report</h1>
            </div>
            <div> 
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a report type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Report Type</SelectLabel>
                        <SelectItem value="orchard report">Orchard Report</SelectItem>
                        <SelectItem value="overview report">Overview Report</SelectItem>         
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Label>Field</Label>
                <Combobox 
                    props={{
                    optionsType: "team leader",
                    options: [
                        { value: "john-doe", label: "John Doe" },
                        { value: "jane-smith", label: "Jane Smith" },
                        { value: "mike-johnson", label: "Mike Johnson" }
                    ]
                    }}
                />        
                <div className="flex items-start gap-3">
                    <Checkbox id="toggle" />
                    <Label htmlFor="toggle">Include time of report creation</Label>
                </div>
                <div className="flex items-start gap-3">
                    <Checkbox id="toggle" />
                    <Label htmlFor="toggle">Include Percentile graph</Label>
                </div>
                <div className="flex items-start gap-3">
                    <Checkbox id="toggle" />
                    <Label htmlFor="toggle">Include Field ID</Label>
                </div>
            </div>
        </div>        
    )
}