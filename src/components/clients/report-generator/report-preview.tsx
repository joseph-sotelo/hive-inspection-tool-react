export default function ReportPreview() {
    return (
        <div className="aspect-letter w-[8.5in] border-2 border-border">
            <div id="header" className="grid grid-cols-12 gap-4">
                <div className="col-span-3">
                    <p className="text-right">
                        Orchard average
                    </p>
                </div>
                <div className="col-span-9">
                    <h1>
                        Orchard Name
                    </h1>
                </div>
            </div>
        </div>
    )
}