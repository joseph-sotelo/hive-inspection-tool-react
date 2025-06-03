import ReportMap from "./report-map";

export default function ReportPreview() {
    return (
        <div className="aspect-letter w-[8.5in] border-2 border-border flex flex-col">
            <div id="header" className="grid grid-cols-12 gap-4 m-4 flex-shrink-0">
                <div className="col-span-3 text-right font">
                    <p>
                        Status
                    </p>
                    <p>
                        Orchard average
                    </p>
                    <p>
                        Inspected by
                    </p>
                    <p>
                        Date Inspected
                    </p>
                    <p>
                        Date of Report Creation
                    </p>
                    <p>
                        Beekeeper
                    </p>
                    <p>
                        Bee Broker
                    </p>
                </div>
                <div className="col-span-9">
                    <div className="text-8xl font-bold">
                        Orchard Name
                    </div>
                    <div className="text-muted-foreground tracking-[0.7rem] font-mono text-lg">
                        <div>
                            36.062776, -120.014287
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