// Clients list placed inside clients-sidebar.tsx
// this programming came from a Rene Rubalcava tutorial

// ui
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// routing
import { Link } from "react-router-dom";

// context
import { useClientsData } from "@/context/clientsData/useClientsData";

// function
export default function ClientsList({ types }: {types: string[] }) {    
    
    const { setShowReportGenerator } = useClientsData();
    
    return (
        <ul className="flex flex-col">
            {types.map((value, index) => (
                <div key={`${value}-${index}`} className="hover:bg-secondary transition-colors duration-300">
                    <Separator/>
                    <li>
                        <Link 
                            to={`/clients/${encodeURIComponent(value)}`}
                            onClick={() => setShowReportGenerator(false)}
                        >
                            <div className="flex gap-2 items-center pr-12 pl-6 py-2 my-3">
                                <Avatar style={{ backgroundColor: getRandomPastelColor() }}>                                
                                    <AvatarFallback>
                                        {value.split(' ').map(word => word[0]).join('').toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="font-medium font-semibold">{value}</span>
                                    <span className="truncate text-xs text-muted-foreground">{`${Math.floor(Math.random() * 20)} pending orchards`}</span>
                                </div>                                                      
                            </div>                        
                        </Link>
                    </li>
                </div>
            ))}
        </ul>
    );
}

// generates a random pastel color to help differentiate clients.
const getRandomPastelColor = () => {
    // Generate random RGB values with higher minimums for pastel effect
    const r = Math.floor(Math.random() * 25 + 220); // 200-255 range for lighter colors
    const g = Math.floor(Math.random() * 25 + 220);
    const b = Math.floor(Math.random() * 25 + 220);
    
    return `rgb(${r}, ${g}, ${b})`;
}