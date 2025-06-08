// this function came from a tutorial and will eventually need to be updated

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function Clients({ types }: {types: string[] }) {

    return (
        <ul className="flex flex-col gap-3">
            {types.map((value, index) => (
                <div key={`${value}-${index}`}>
                <Separator className="mb-3"/>
                <li>
                    <Link to={`/clients/${encodeURIComponent(value)}`}
                    >
                        <div className="flex gap-2 items-center pr-12 py-2">
                            <Avatar>                                
                                <AvatarFallback>
                                    {value.split(' ').map(word => word[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="font-medium font-semibold">{value}</span>
                                <span className="truncate text-xs text-muted-foreground">{"3 pending orchards"}</span>
                            </div>                                                      
                        </div>                        
                    </Link>
                </li>
                </div>
            ))}
        </ul>
    );
}