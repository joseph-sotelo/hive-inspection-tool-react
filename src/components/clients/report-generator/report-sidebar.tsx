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
import { useClientsData } from "@/context/clientsData/useClientsData";
import { useEffect } from "react";
import { getOrchardData } from "./report-preview/getOrchardData";
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";
import { getGlobalData } from "./report-preview/getGlobalData";
import { useOverviewReportData } from "@/context/overviewReportData/useOverviewReportData";

export default function ReportSidebar() {
    
    const { 
        fieldmapIdPrimary, 
        statuses, 
        hiveCounts, 
        orchardGrades 
    } = useClientsData();


// getting variables from context that will be passed to hooks and updated
    const { 
        setClientName,
        setStatus, 
        setHiveCount, 
        setAverage, 
        setFieldmapIdPrimary, 
        setTeamLeader, 
        setInspectionDate, 
        setLatitude, 
        setLongitude, 
        setRecordId, 
        setFieldmapIdAuxiliary, 
        setPartdeliv_yn, 
        setBeeBroker, 
        setDeliveryDate, 
        setBeekeeper, 
        setAvgContracted,
        setMinimum,
        setAssistants
    } = useOrchardReportData();

    const {
        setAllHiveDrops
    } = useOverviewReportData();

// initializing context values
    useEffect(() => {
        getOrchardData(
            setClientName,
            setStatus,
            setHiveCount,
            setAverage,
            setFieldmapIdPrimary,   
            setTeamLeader,
            setInspectionDate,
            setLatitude,
            setLongitude,
            setRecordId,
            setFieldmapIdAuxiliary,
            setPartdeliv_yn,    
            setBeeBroker,
            setDeliveryDate,
            setBeekeeper,
            setAvgContracted,
            setMinimum,
            setAssistants,
            statuses[0],
            hiveCounts[0],
            orchardGrades[0],
            fieldmapIdPrimary[0]
        );
        getGlobalData(
            setAllHiveDrops
        );
    }, []);

    const orchardProps = {
        optionsType: "fieldmap_id_primary",
        options: fieldmapIdPrimary.map((value) => ({
            value: value,
            label: value
        }))
    };

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
                <Label>Orchard</Label>
                    <Combobox 
                        props={orchardProps} 
                        defaultValue={fieldmapIdPrimary[0]}
                        onChange={(value) => {
                            const index = fieldmapIdPrimary.findIndex(item => item === value);
                            getOrchardData(
                                setClientName,
                                setStatus,
                                setHiveCount,
                                setAverage,
                                setFieldmapIdPrimary,
                                setTeamLeader,
                                setInspectionDate,
                                setLatitude,
                                setLongitude,
                                setRecordId,
                                setFieldmapIdAuxiliary,
                                setPartdeliv_yn,
                                setBeeBroker,
                                setDeliveryDate,
                                setBeekeeper,
                                setAvgContracted,
                                setMinimum,
                                setAssistants,
                                statuses[index],
                                hiveCounts[index],
                                orchardGrades[index],
                                fieldmapIdPrimary[index]                                
                            );
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