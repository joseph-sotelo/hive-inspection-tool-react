// Team information form section
// Small sections like this are easier to understand and modify
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Combobox } from "../ui/combobox";
import { comboBoxOptions } from "@/lib/utils/comboBoxOptions";

interface TeamInfoSectionProps {
  formData: {
    team_leader: string;
    assistants: string | string[]; // Can be string or array
  };
  handleChange: (key: string, value: string | boolean | number) => void;
}

export default function TeamInfoSection({ formData, handleChange }: TeamInfoSectionProps) {
  return (
    <>
      <Separator className="mb-5"/>
      <div className="flex flex-col gap-6">
        {/* Team leader selector */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Team leader</Label>
          <Combobox 
            props={comboBoxOptions("team_leader")} 
            defaultValue={formData.team_leader} 
            onChange={(value) => handleChange("team_leader", value)}
          />
        </div>

        {/* Assistants selector - Fixed to use correct field */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Assistants</Label>
          <Combobox 
            props={comboBoxOptions("team_leader")} 
            defaultValue={Array.isArray(formData.assistants) ? formData.assistants[0] || "" : formData.assistants} 
            onChange={(value) => handleChange("assistants", value)}
          />
        </div>
      </div>
    </>
  );
}