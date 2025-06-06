import { Separator } from "@/components/ui/separator";
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";
import HiveDropReportSubsection from "./hivedrop-report-subsection";

export default function ReportSectionGeneral() {

    const { teamLeader, assistants } = useOrchardReportData();

    let assistantsArray = [];
    try {
        if (assistants && assistants.trim()) {
            assistantsArray = JSON.parse(assistants);
        }
    } catch (error) {
        console.error('Error parsing assistants JSON:', error);
    } 

    return(
        <>
            <h1 className="text-left ml-50">Inspection</h1>
            <div className="grid grid-cols-12 gap-4 p-6 section">
                <div id="headers" className="col-span-3 text-right flex flex-col gap-8">
                    <h4>
                        Team
                    </h4> 
                </div>
                <div id="data"className="col-span-9 flex flex-col gap-2">
                    <small>
                        <strong>
                            Team Leader:
                        </strong>
                        {teamLeader}
                    </small>
                    <small>
                        <strong>
                            Assistants:
                        </strong>
                        {assistantsArray && assistantsArray.length > 0 ? assistantsArray.join(", ") : "None"}
                    </small>         
                </div>
            </div>
            <Separator /> 
            <HiveDropReportSubsection />
        </>
    )
}