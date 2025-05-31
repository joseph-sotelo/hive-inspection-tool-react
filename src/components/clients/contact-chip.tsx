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
        <div className="flex flex-row gap-2">
            <div className="bg-gray-100 p-2 rounded-md">
                <Icon />            
            </div>
            <div>
                <div>{label}</div>
                <div>{value}</div>
            </div>            
        </div>
    );
}