// context
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";
import { useClientsData } from "@/context/clientsData/useClientsData";

// ui
import { Separator } from "@/components/ui/separator";
import { STATUS_CONFIG } from "@/constants";

export default function OrchardReportPage() {
    const { name } = useClientsData();
    const { 
        fieldmapIdPrimary, 
        fieldmapIdAuxiliary, 
        partdeliv_yn, 
        beeBroker, 
        deliveryDate, 
        beekeeper, 
        hiveCount, 
        avgContracted,
        minimum,
        teamLeader,
        assistants
    } = useOrchardReportData();

    // Debug: Log the actual value
    console.log("partdeliv_yn value:", partdeliv_yn, "type:", typeof partdeliv_yn);

    let deliveryStatus = partdeliv_yn === "no" 
        ? STATUS_CONFIG.DELIVERY_STATUS.COMPLETE 
        : STATUS_CONFIG.DELIVERY_STATUS.INCOMPLETE;

    const assistantsArray = JSON.parse(assistants);
    
    return (  
        <div className="w-[8.5in] border-2 border-border p-6">
            {/* <div className="grid-col-span-3"/> */}
            <h1 className="text-left ml-50">General</h1>
            <div className="grid grid-cols-12 gap-4 p-6 section">
                <div id="headers" className="col-span-3 text-right flex flex-col gap-8">
                    <h4>
                        Orchard Info
                    </h4> 
                </div>
                <div id="data"className="col-span-9 flex flex-col gap-2">
                    <small>
                        <strong>
                            Client:
                        </strong>
                        {name}
                    </small>
                    <small>
                        <strong>Primary Field ID:</strong>
                        {fieldmapIdPrimary}
                    </small>
                    {fieldmapIdAuxiliary && (
                        <small>
                            <strong>Auxiliary Field ID:</strong>
                            {fieldmapIdAuxiliary}
                        </small>
                    )}
                </div>
            </div>
            <Separator />
            <div className="grid grid-cols-12 gap-4 p-6 section">
                <div id="headers" className="col-span-3 text-right flex flex-col gap-8">
                    <h4>
                        Bee Contract Info
                    </h4> 
                </div>
                <div id="data"className="col-span-9 flex flex-col gap-2">
                    <small>
                        <strong>
                            Delivery status:
                        </strong>
                        {deliveryStatus}
                    </small> 
                    <small>
                        <strong>
                            Delivery date:
                        </strong>
                        {deliveryDate}
                    </small>     
                    {beeBroker && (
                        <small>
                            <strong>
                                Bee broker:
                        </strong>
                            {beeBroker}
                        </small>    
                    )}
                    {beekeeper && (
                    <small>
                        <strong>
                            Beekeeper:
                        </strong>
                            {beekeeper}
                        </small>
                    )}
                    <small>
                        <strong>
                            Total hives delivered:
                        </strong>
                        {hiveCount}
                    </small> 
                    <small>
                        <strong>
                            Average frames per hive:
                        </strong>
                        {avgContracted}
                    </small>  
                    {minimum && (
                    <small>
                        <strong>
                            Minimum frames per hive:
                        </strong>
                        {minimum}
                    </small>
                    )}           
                </div>
            </div>
            <Separator />
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
            <div className="grid grid-cols-12 gap-4 p-6 section">
                <div id="headers" className="col-span-3 text-right flex flex-col gap-8">
                    <h4>
                        Data
                    </h4> 
                </div>
                <div id="data"className="col-span-9 flex flex-col gap-2">
                    <small>
                        <strong>
                            Team Leader:
                        </strong>
                        name
                    </small>
                    <small>
                        <strong>
                            Assistants:
                        </strong>
                            name
                    </small>         
                </div>
            </div>
        </div>
    )
}