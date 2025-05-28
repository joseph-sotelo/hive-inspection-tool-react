// this function came from a tutorial and will eventually need to be updated

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function Clients({ types }: {types: string[] }) {
    return (
        <ul >
            {types.map((value, index) => (
                <li key = {`${value}-${index}`}
                >
                    <Link to={`/map/${value}`}>
                        <div className="flex">
                            <Avatar>                                
                                <AvatarFallback>
                                    {value.split(' ').map(word => word[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <h4>{value}</h4>                            
                        </div>                        
                    </Link>
                </li>
            ))}
        </ul>
    );
}