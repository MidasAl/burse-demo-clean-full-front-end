import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  isCollapsed: boolean;
  onNavigate: (view: string) => void;
}

const UserProfile = ({ isCollapsed, onNavigate }: UserProfileProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      description: "Successfully logged out",
      duration: 2000,
    });
    navigate("/");
  };

  return (
    <div className="absolute bottom-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-3 p-0 h-auto hover:bg-transparent">
            <div className="w-10 h-10 rounded-full bg-warm-200" />
            {!isCollapsed && (
              <div className="text-left">
                <div className="font-medium">Shalim</div>
                <div className="text-sm text-warm-400">Duke University</div>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onNavigate('profile')} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;