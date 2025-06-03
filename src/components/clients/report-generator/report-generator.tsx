import ReportPreview from "./report-preview";

export const ReportGenerator = ({ onBack }: { onBack: () => void }) => {
    return (
        <div className="w-full ">
            <ReportPreview />     
        </div>
    )
} 