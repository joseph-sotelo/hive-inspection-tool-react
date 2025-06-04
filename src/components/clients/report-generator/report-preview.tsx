// context
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";
import { useClientsData } from "@/context/clientsData/useClientsData";

// ui
import ReportMap from "./report-map";
import StatusBadge from '@/components/ui/status-badge';

export default function ReportPreview() {
    const { status, average, fieldmapIdPrimary, inspectionDate, latitude, longitude } = useOrchardReportData();
    const { name } = useClientsData();
    const reportCreatedDate = new Date().toLocaleDateString();
    
    return (
        <div className="aspect-letter w-[8.5in] border-2 border-border flex flex-col">
            <div id="header" className="grid grid-cols-12 gap-4 m-6 flex-shrink-0">
                <div id="info" className="col-span-3 text-right flex flex-col gap-8 mt-2">
                    <small>
                        <StatusBadge status={status} />
                    </small>
                    <small>
                        <strong>Average Frames:</strong> 
                        <div className="h-2" />
                        {average}
                    </small> 
                    <small>
                        <strong>Client:</strong> 
                        <div className="h-2" />
                        {name}
                    </small>                   
                    <small>
                        <strong>Inspected by:</strong> 
                        <div className="h-2" />
                        San Joaquin Bee Inspection
                    </small>
                    <small>
                        <strong>Date Inspected:</strong> 
                        <div className="h-2" />
                        {inspectionDate}
                    </small>
                    <small>
                        <strong>Report Created:</strong> 
                        <div className="h-2" />
                        {reportCreatedDate}
                    </small>
                </div>
                <div id="title"className="col-span-9">
                    <div className="text-8xl/28 -mt-3 font-bold uppercase hyphens-auto">
                        {fieldmapIdPrimary}
                    </div>
                    <div className="text-muted-foreground tracking-[0.7rem] text-lg/7 ml-1">
                        <div>
                            {latitude}°, {longitude}°
                        </div>
                    </div>
                </div>
            </div>
            <div id="map" className="flex-1 min-h-0">
                <ReportMap />
            </div>
        </div>
    )
}