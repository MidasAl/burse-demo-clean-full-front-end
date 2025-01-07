import { DollarSign, Settings } from "lucide-react";

interface MenuItemsProps {
  onNavigate: (view: string) => void;
  isCollapsed: boolean;
}

const MenuItems = ({ onNavigate, isCollapsed }: MenuItemsProps) => {
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
    </div>
  );
};

export default MenuItems;