import { Pencil } from 'lucide-react';

type HeaderSectionProps = {
    name: string;
    slug: string;
    onEdit?: () => void;
}

export default function HeaderSection({ name, slug, onEdit }: HeaderSectionProps) {
    return (
        <div id="header" className="flex flex-row justify-between w-full items-center">
            <h1 className="text-2xl font-bold">{name || slug}</h1>
            <Pencil onClick={onEdit} className="cursor-pointer hover:text-muted-foreground transition-colors" />
        </div>
    );
} 