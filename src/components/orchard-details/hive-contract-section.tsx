// Hive contract form section - separated for better maintainability
// This pattern makes each form section easier to test and modify independently
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface HiveContractSectionProps {
  formData: {
    partdeliv_yn: string;
    beekeeper: string;
    bee_broker: string;
    hives_contracted: string | number;
    average: string | number;
    minimum: string | number;
  };
  handleChange: (key: string, value: string | boolean | number) => void;
}

export default function HiveContractSection({ formData, handleChange }: HiveContractSectionProps) {
  return (
    <>
      <Separator className="mb-5"/>
      <div className="flex flex-col gap-6">
        {/* Delivery completion toggle */}
        <div className="flex items-center space-x-2">
          <Switch 
            id="partdeliv_yn" 
            defaultChecked={formData.partdeliv_yn === "no"} 
            onCheckedChange={(checked) => handleChange("partdeliv_yn", checked ? "no" : "yes")}
          />
          <Label htmlFor="delivery-complete">Delivery Complete</Label>
        </div>

        {/* Beekeeper input */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="beekeeper">Beekeeper</Label>
          <Input 
            type="text" 
            id="beekeeper" 
            placeholder="Beekeeper" 
            value={formData.beekeeper} 
            onChange={(event) => handleChange(event.target.id, event.target.value)}
          />
        </div>

        {/* Bee broker input */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="bee_broker">Bee broker</Label>
          <Input 
            type="text" 
            id="bee_broker" 
            placeholder="Bee broker" 
            value={formData.bee_broker} 
            onChange={(event) => handleChange(event.target.id, event.target.value)}
          />
        </div>

        {/* Total hives input */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="hives_contracted">Total hives</Label>
          <Input 
            type="number" 
            id="hives_contracted" 
            placeholder="number" 
            value={formData.hives_contracted} 
            onChange={(event) => handleChange(event.target.id, Number(event.target.value))}
          />
        </div>

        {/* Average frames input */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="average">Average frames</Label>
          <Input 
            type="number" 
            id="average" 
            placeholder="number" 
            value={formData.average} 
            onChange={(event) => handleChange(event.target.id, Number(event.target.value))}
          />
        </div>

        {/* Minimum frames input */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="minimum">Minimum frames</Label>
          <Input 
            type="number" 
            id="minimum" 
            placeholder="number" 
            value={formData.minimum} 
            onChange={(event) => handleChange(event.target.id, Number(event.target.value))}
          />
        </div>
      </div>
    </>
  );
}