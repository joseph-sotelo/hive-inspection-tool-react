import { Phone, Mail } from "lucide-react";

type ContactType = "email" | "phone";

interface ContactChipProps {
    contactType: ContactType;
    value?: string;
}

export default function ContactChip({ contactType, value }: ContactChipProps) {
    const isEmail = contactType === "email";
    const Icon = isEmail ? Mail : Phone;
    const label = isEmail ? "Email" : "Phone";    
    
    return (
        <div className="flex gap-2 items-center pr-12 py-2">
            <div className="bg-foreground-flexible/10 p-2 rounded-md">
                <Icon className="text-foreground-flexible"/>            
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="font-medium font-semibold">{label}</div>
                <div className="truncate text-xs text-muted-foreground">{value}</div>
            </div>            
        </div>
    );
}