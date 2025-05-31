import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MobileMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="absolute z-5 md:hidden">
            <Sheet>
                <SheetTrigger>
                    <Button variant="outline" className="mt-4 ml-4 ">
                        <MenuIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col gap-4 ">
                        <Button variant="ghost" className="w-full" onClick={() => navigate('/clients')}>Clients</Button>
                        <Button variant="ghost" className="w-full" onClick={() => navigate('/map')}>Map</Button>
                        <Button variant="ghost" className="w-full" onClick={() => navigate('/account')}>Account</Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};