import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";
import { STATUS_CONFIG } from "@/constants/ui";

export default function ReportSectionGeneral() {

    const { 
        clientName, 
        fieldmapIdPrimary, 
        fieldmapIdAuxiliary, 
        partdeliv_yn, 
        deliveryDate, 
        beeBroker, 
        beekeeper, 
        hiveCount, 
        avgContracted, 
        minimum 
    } = useOrchardReportData();

    let deliveryStatus = partdeliv_yn === "no" 
    ? STATUS_CONFIG.DELIVERY_STATUS.COMPLETE 
    : STATUS_CONFIG.DELIVERY_STATUS.INCOMPLETE;

    return(
        <>
            <h1 className="text-left ml-51">General</h1>
            <div className="grid grid-cols-12 gap-4 p-6 section">
                <div id="headers" className="col-span-3 text-right flex flex-col gap-8">
                    <h4>
                        Orchard Info
                    </h4> 
                </div>
                <div id="data"className="col-span-9 flex flex-col gap-2 mt-[10px]">
                    <small>
                        <strong>
                            {'Client: '}
                        </strong>
                        {clientName}
                    </small>
                    <small>
                        <strong>{'Primary Field ID: '}</strong>
                        {fieldmapIdPrimary}
                    </small>
                    {fieldmapIdAuxiliary && (
                        <small>
                            <strong>{'Auxiliary Field ID: '}</strong>
                            {fieldmapIdAuxiliary}
                        </small>
                    )}
                </div>
            </div>            
            <div className="grid grid-cols-12 gap-4 p-6 section">
                <div id="headers" className="col-span-3 text-right flex flex-col gap-8">
                    <h4>
                        Bee Contract Info
                    </h4> 
                </div>
                <div id="data"className="col-span-9 flex flex-col gap-2 mt-[10px]">
                    <small>
                        <strong>
                            {'Delivery status: '}
                        </strong>
                        {deliveryStatus}
                    </small> 
                    <small>
                        <strong>
                            {'Delivery date: '}
                        </strong>
                        {deliveryDate}
                    </small>     
                    {beeBroker && (
                        <small>
                            <strong>
                                {'Bee broker: '}
                        </strong>
                            {beeBroker}
                        </small>    
                    )}
                    {beekeeper && (
                    <small>
                        <strong>
                            {'Beekeeper: '}
                        </strong>
                            {beekeeper}
                        </small>
                    )}
                    <small>
                        <strong>
                            {'Total hives delivered: '}
                        </strong>
                        {hiveCount}
                    </small> 
                    <small>
                        <strong>
                            {'Average frames per hive: '}
                        </strong>
                        {avgContracted}
                    </small>  
                    {minimum && (
                    <small>
                        <strong>
                            {'Minimum frames per hive: '}
                        </strong>
                        {minimum}
                    </small>
                    )}           
                </div>
            </div>
        </>
    )
}