import { DollarSign, FileText, Settings, ListTodo } from "lucide-react";

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
      <div className="pt-2">
        <ListTodo className="w-5 h-5 mx-2 mb-2 text-warm-400" />
      </div>
      <a 
        href="#" 
        onClick={() => onNavigate('finance-hub')}
        className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors"
        title={isCollapsed ? "Finance Hub" : ""}
      >
        <FileText className="w-5 h-5" />
        {!isCollapsed && <span>Finance Hub</span>}
      </a>
    </div>
  );
};

export default MenuItems;