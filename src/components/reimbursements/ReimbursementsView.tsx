import { motion } from "framer-motion";
import { Download, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

const ReimbursementsView = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Reimbursement Requests</h1>
        <Button variant="default" className="bg-warm-500 hover:bg-warm-400">
          <Download className="w-5 h-5 mr-2" />
          Export
        </Button>
      </div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-bold">$0.00</div>
                <div className="text-warm-400 mt-1">Pending Reimbursements</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Empty State */}
      <EmptyState
        title="No Reimbursement Requests"
        description="Your reimbursement requests will appear here once they're submitted."
        icon={<Receipt className="w-12 h-12 text-warm-400" />}
      />
    </div>
  );
};

export default ReimbursementsView;