import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

const DashboardView = ({ onNavigate }: DashboardViewProps) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">User Dashboard</h1>
          <div className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm mt-2">
            Duke University
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warm-100 rounded-full">
                <DollarSign className="w-6 h-6 text-warm-500" />
              </div>
              <div>
                <div className="font-medium">Reimbursements</div>
                <div className="text-sm text-warm-400">View your requests</div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-4"
              onClick={() => onNavigate("reimbursements")}
            >
              View Reimbursement History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;