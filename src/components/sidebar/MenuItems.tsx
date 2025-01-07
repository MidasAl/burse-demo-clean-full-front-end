import { DollarSign, FileText, Settings } from "lucide-react";

interface MenuItemsProps {
  onNavigate: (view: string) => void;
  isCollapsed: boolean;
  currentView?: string;
}

const MenuItems = ({ onNavigate, isCollapsed, currentView }: MenuItemsProps) => {
  const isUserDashboard = currentView === "dashboard";

  return (
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
      {!isUserDashboard && (
        <a 
          href="#" 
          onClick={() => onNavigate('finance-hub')}
          className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors"
          title={isCollapsed ? "Finance Hub" : ""}
        >
          <FileText className="w-5 h-5" />
          {!isCollapsed && <span>Finance Hub</span>}
        </a>
      )}
    </div>
  );
};

export default MenuItems;