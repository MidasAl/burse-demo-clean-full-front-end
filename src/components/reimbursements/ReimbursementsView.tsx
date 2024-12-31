import { Download, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

const ReimbursementsView = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold tracking-tight">Reimbursement Requests</h1>
        <Button variant="default" className="bg-warm-500 hover:bg-warm-400">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Balance Card */}
      <Card className="p-6 bg-white">
        <div>
          <div className="text-3xl font-bold">$0.00</div>
          <div className="text-warm-400 mt-1">Pending Reimbursements</div>
        </div>
      </Card>

      {/* Empty State */}
      <div className="mt-20">
        <EmptyState
          icon={<Receipt className="w-12 h-12 text-warm-400" />}
          title="No Reimbursement Requests"
          description="Your reimbursement requests will appear here once they're submitted."
        />
      </div>
    </div>
  );
};

export default ReimbursementsView;