import { Settings, DollarSign, ChartBar, FileText, Download, Users2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onNavigate: (view: string) => void;
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  return (
    <nav className="w-64 p-8 border-r border-warm-100">
      <div className="space-y-8">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight">
          BURSE
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <a 
            href="#" 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a 
            href="#" 
            onClick={() => onNavigate('reimbursements')}
            className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors"
          >
            <DollarSign className="w-5 h-5" />
            <span>Reimbursements</span>
          </a>
          <a 
            href="#" 
            onClick={() => onNavigate('analytics')}
            className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors"
          >
            <ChartBar className="w-5 h-5" />
            <span>Analytics</span>
          </a>
          <a 
            href="#" 
            onClick={() => onNavigate('invoices')}
            className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Invoices</span>
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <a href="#" className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </a>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Export Reimbursement Requests</SheetTitle>
                <SheetDescription>
                  View and export all reimbursement requests for your group
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Total Requests</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>AI Approved</span>
                  <span className="font-medium text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Pending Review</span>
                  <span className="font-medium text-amber-600">3</span>
                </div>
                <Button className="w-full mt-4">
                  Download Report
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* User Profile */}
      <div className="absolute bottom-8 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-warm-200" />
        <div>
          <div className="font-medium">Shalim</div>
          <div className="text-sm text-warm-400">Duke University</div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;