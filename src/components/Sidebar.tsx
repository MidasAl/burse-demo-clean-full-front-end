import { Settings, DollarSign, ChartBar, FileText, Users2, ChevronLeft, ChevronRight, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface SidebarProps {
  onNavigate: (view: string) => void;
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      description: "Successfully logged out",
      duration: 2000,
    });
    // Add actual logout logic here when authentication is implemented
  };

  return (
    <nav className={`relative ${isCollapsed ? 'w-16' : 'w-64'} p-8 border-r border-warm-100 transition-all duration-300`}>
      <div className="space-y-8">
        {/* Logo */}
        <div className={`text-2xl font-bold tracking-tight ${isCollapsed ? 'hidden' : ''}`}>
          BURSE
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <a 
            href="#" 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors"
            title={isCollapsed ? "Dashboard" : ""}
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span>Dashboard</span>}
          </a>
          <a 
            href="#" 
            onClick={() => onNavigate('reimbursements')}
            className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors"
            title={isCollapsed ? "Reimbursements" : ""}
          >
            <DollarSign className="w-5 h-5" />
            {!isCollapsed && <span>Reimbursements</span>}
          </a>
          <a 
            href="#" 
            onClick={() => onNavigate('analytics')}
            className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors"
            title={isCollapsed ? "Analytics" : ""}
          >
            <ChartBar className="w-5 h-5" />
            {!isCollapsed && <span>Analytics</span>}
          </a>
          <a 
            href="#" 
            onClick={() => onNavigate('invoices')}
            className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors"
            title={isCollapsed ? "Invoices" : ""}
          >
            <FileText className="w-5 h-5" />
            {!isCollapsed && <span>Invoices</span>}
          </a>
        </div>
      </div>

      {/* User Profile Dropdown */}
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

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-warm-100 rounded-full hover:bg-warm-50"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </nav>
  );
};

export default Sidebar;