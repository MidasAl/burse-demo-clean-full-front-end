import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DashboardView = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
          <div className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm">
            Duke
          </div>
        </div>
        <div className="space-x-4">
          <Button 
            variant="secondary" 
            className="bg-[#494E5B] text-white hover:bg-[#363B47]"
          >
            View Reimbursement History
          </Button>
          <Button 
            variant="secondary"
            className="bg-[#FFE4E4] text-warm-500 hover:bg-[#FFD4D4]"
          >
            Generate New Code
          </Button>
        </div>
      </div>

      {/* Members Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-8">Joined Members</h2>
        <div className="flex items-center justify-center py-12 text-warm-400">
          No requests yet
        </div>
      </Card>
    </div>
  );
};

export default DashboardView;