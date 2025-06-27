// displays the team leader and assistants for the orchard report

// context
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";

export default function TeamInfoSection() {
    // get values from context
    const { teamLeader, assistants } = useOrchardReportData();

    // turn the single string that the json provides into an array
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
            <h1 className="text-right ml-48">Inspection</h1>
            <div className="grid grid-cols-12 gap-4 section">
                <div id="headers" className="col-span-3 text-right flex flex-col gap-8">
                    <h4>
                        Team
                    </h4> 
                </div>
                <div id="data"className="col-span-9 flex flex-col gap-2 mt-[10px]">
                    <small>
                        <strong>
                            {'Team Leader: '}
                        </strong>
                        {teamLeader}
                    </small>
                    <small>
                        <strong>
                            {'Assistants: '}
                        </strong>
                        {assistantsArray && assistantsArray.length > 0 ? assistantsArray.join(", ") : "None"}
                    </small>         
                </div>
            </div>            
        </>
    )
}