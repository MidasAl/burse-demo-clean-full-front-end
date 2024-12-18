import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MenuItems from "./sidebar/MenuItems";
import UserProfile from "./sidebar/UserProfile";

interface SidebarProps {
  onNavigate: (view: string) => void;
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav className={`relative ${isCollapsed ? 'w-16' : 'w-64'} p-8 border-r border-warm-100 transition-all duration-300`}>
      <div className="space-y-8">
        {/* Logo */}
        <div className={`text-2xl font-bold tracking-tight ${isCollapsed ? 'hidden' : ''}`}>
          BURSE
        </div>

        {/* Navigation Links */}
        <MenuItems onNavigate={onNavigate} isCollapsed={isCollapsed} />
      </div>

      {/* User Profile */}
      <UserProfile onNavigate={onNavigate} isCollapsed={isCollapsed} />

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