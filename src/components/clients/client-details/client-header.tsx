import { Pencil } from 'lucide-react';

interface ClientHeaderProps {
    name: string;
    slug: string;
    onEdit?: () => void;
}

export default function ClientHeader({ name, slug, onEdit }: ClientHeaderProps) {
    return (
        <div id="header" className="flex flex-row justify-between w-full">
            <h1 className="text-2xl font-bold mb-4">{name || slug}</h1>
            <Pencil onClick={onEdit} className="cursor-pointer hover:text-muted-foreground transition-colors" />
        </div>
    );
} 