import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-warm-500">Admin Dashboard</h1>
          <p className="text-warm-400">Duke</p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="secondary" 
            className="bg-[#565B6E] text-white hover:bg-[#464B5E]"
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

      {/* Joined Members Section */}
      <Card className="w-full bg-white shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-warm-500 mb-8">Joined Members</h2>
          <div className="flex items-center justify-center py-12 text-warm-400">
            No requests yet
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;