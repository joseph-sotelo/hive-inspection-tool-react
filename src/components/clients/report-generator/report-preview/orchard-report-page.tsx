// ui
import { Separator } from "@/components/ui/separator";
import GeneralInfoSection from "./general-info-section";
import TeamInfoSection from "./team-info-section";
import OverviewSection from "./overview-section";

export default function OrchardReportPage() {         

    return (  
        <div className="w-[8.5in] h-[1056px] border-1 shadow-lg border-border p-6 flex flex-col gap-8 bg-background">            
            <GeneralInfoSection />                        
            <Separator />
            <TeamInfoSection />              
            <OverviewSection />              
        </div>  
    )
}   