// Field information form section - separated for better organization
// Grouping related fields makes the code more maintainable
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Combobox } from "../combobox";
import { comboBoxOptions } from "@/lib/utils";

interface FieldInfoSectionProps {
  formData: {
    client: string;
    grower: string;
    fieldmap_id_primary: string;
    fieldmap_id_auxiliary: string;
    crossroads: string;
  };
  handleChange: (key: string, value: string | boolean | number) => void;
}

export default function FieldInfoSection({ formData, handleChange }: FieldInfoSectionProps) {
  return (
    <div className="px-1 pb-5">
      <Separator className="mb-5"/>
      <div className="flex flex-col gap-6"> 
        {/* Client selector */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Client</Label>
          <Combobox 
            props={comboBoxOptions("client")} 
            defaultValue={formData.client} 
            onChange={(value) => handleChange("client", value)}
          />
        </div>

        {/* Grower input */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="grower">Grower</Label>
          <Input 
            type="text" 
            id="grower" 
            placeholder="Grower" 
            value={formData.grower} 
            onChange={(event) => handleChange(event.target.id, event.target.value)}
          />
        </div>

        {/* Primary field ID input */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="fieldmap_id_primary">Primary field ID</Label>
          <Input 
            type="text" 
            id="fieldmap_id_primary" 
            placeholder="Primary field ID" 
            value={formData.fieldmap_id_primary} 
            onChange={(event) => handleChange(event.target.id, event.target.value)}
          />
        </div>

        {/* Auxiliary field ID input */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="fieldmap_id_auxiliary">Auxiliary Field ID</Label>
          <Input 
            type="text" 
            id="fieldmap_id_auxiliary" 
            placeholder="Auxiliary Field ID" 
            value={formData.fieldmap_id_auxiliary} 
            onChange={(event) => handleChange(event.target.id, event.target.value)}
          />
        </div>

        {/* Crossroads input */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="crossroads">Crossroads</Label>
          <Input 
            type="text" 
            id="crossroads" 
            placeholder="Crossroads" 
            value={formData.crossroads} 
            onChange={(event) => handleChange(event.target.id, event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}