import { Badge, badgeVariantsType } from "@/components/ui/badge";
import { STATUS_CONFIG } from "@/constants";

interface StatusBadgeProps {
    status: string;
    showLabel?: boolean;
    className?: string;
}

export default function StatusBadge({ status, showLabel = true, className }: StatusBadgeProps) {
    // Process status for display using constants (same logic as mobile-sheet)
    let statusString = status?.split("_")[0] || "";
    const badgeVariant = status ? statusString as badgeVariantsType : "default";
    
    // Handle special cases
    if (statusString === "nodata") {
        statusString = STATUS_CONFIG.DISPLAY_NAMES.nodata;
    }

    return (
        <Badge variant={badgeVariant} className={className}>
            {showLabel ? `Status: ${statusString}` : statusString}
        </Badge>
    );
} 