// This sidebar presents the user with options customize the client report

// ui
import { Combobox } from "@/components/ui/combobox";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";

// context
import { useClientsData } from "@/context/clientsData/useClientsData";
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";
import { useOverviewReportData } from "@/context/overviewReportData/useOverviewReportData";

// hooks
import { useEffect } from "react";
import { getOrchardData } from "./report-preview/getOrchardData";
import { getGlobalData } from "./report-preview/getGlobalData";

export default function ReportSidebar() {    
    
    // accessing some relevant parts of clientsData context that had been previously set
    const { 
        fieldmapIdPrimary, 
        statuses, 
        hiveCounts, 
        orchardGrades,
        setShowReportGenerator,
        showReportGenerator
    } = useClientsData();


// getting variables from context that will be set and displayed in the report
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

    // this value is used to create the overview chart for both the orchard and overview reports
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

    // creates an object used to populate the orchard combobox
    const orchardProps = {
        optionsType: "fieldmap_id_primary",
        options: fieldmapIdPrimary.map((value) => ({
            value: value,
            label: value
        }))
    };

    return (       
        <div className="w-[440px] border-l-1 border-border flex flex-col gap-6 p-6">
            <Button 
                variant="iconGhost"
                size="iconGhost"                                         
                onClick={() => setShowReportGenerator(!showReportGenerator)}>
                <ChevronLeft />
            </Button>
            <h3>Generate Report</h3>
            <Separator />
            <div className="flex flex-col gap-6"> 
                <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Report Type</Label>
                <Select defaultValue="orchard report">
                    <SelectTrigger>
                        <SelectValue 
                            placeholder="Select a report type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Report Type</SelectLabel>
                        <SelectItem value="orchard report">Orchard Report</SelectItem>
                        <SelectItem value="overview report">Overview Report</SelectItem>         
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
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
                </div>
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
                <Separator />
                <Button variant="outline">Print</Button>
                <Button variant="customSecondary">Download</Button>
            </div>
        </div>        
    )
}