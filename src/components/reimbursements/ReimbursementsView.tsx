import { motion } from "framer-motion";
import { Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { ExpenseDetailsDialog } from "./ExpenseDetailsDialog";
import { useToast } from "@/hooks/use-toast";
import { reimbursementRequests } from "./mockData";
import ReimbursementsList from "./ReimbursementsList";
import type { ReimbursementRequest } from "./types";

const departments = {
  "Engineering": {
    totalRequests: 8,
    approved: 6,
    pending: 2
  },
  "Sales": {
    totalRequests: 7,
    approved: 6,
    pending: 1
  }
};

const ReimbursementsView = () => {
  const [selectedExpense, setSelectedExpense] = useState<ReimbursementRequest | null>(null);
  const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleApprove = (request: ReimbursementRequest) => {
    toast({
      description: `Approved reimbursement for ${request.user}`,
    });
  };

  const handleFlag = (request: ReimbursementRequest) => {
    toast({
      description: `Flagged reimbursement from ${request.user} for review`,
    });
  };

  const handleNotify = (request: ReimbursementRequest) => {
    toast({
      description: `Notification sent to ${request.user}`,
    });
  };

  const handleBulkNotify = () => {
    if (selectedRequests.size === 0) {
      toast({
        description: "Please select requests to notify",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      description: `Notifications sent to ${selectedRequests.size} users`,
    });
  };

  const toggleRequestSelection = (request: ReimbursementRequest) => {
    const newSelected = new Set(selectedRequests);
    if (newSelected.has(request.title)) {
      newSelected.delete(request.title);
    } else {
      newSelected.add(request.title);
    }
    setSelectedRequests(newSelected);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Reimbursement Requests</h1>
        <div className="flex gap-4">
          {selectedRequests.size > 0 && (
            <Button 
              variant="secondary"
              onClick={handleBulkNotify}
              className="bg-warm-500 hover:bg-warm-400"
            >
              <Send className="w-4 h-4 mr-2" />
              Notify Selected ({selectedRequests.size})
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default" className="bg-warm-500 hover:bg-warm-400">
                <Download className="w-5 h-5 mr-2" />
                Export
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Export Reimbursement Requests</SheetTitle>
                <SheetDescription>
                  View and export all reimbursement requests for your group
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {Object.entries(departments).map(([dept, stats]) => (
                  <div key={dept} className="space-y-2">
                    <h3 className="font-medium">{dept}</h3>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Total Requests</span>
                        <span className="font-medium">{stats.totalRequests}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>AI Approved</span>
                        <span className="font-medium text-green-600">{stats.approved}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Pending Review</span>
                        <span className="font-medium text-amber-600">{stats.pending}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4">
                  Download Report
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
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
                <div className="text-3xl font-bold">$3,049.73</div>
                <div className="text-warm-400 mt-1">Pending Reimbursements</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <Button variant="ghost" className="text-warm-500 font-medium">
            All Requests
          </Button>
          <Button variant="ghost" className="text-warm-400">
            Pending Review
          </Button>
        </div>
      </div>

      {/* Reimbursement Requests List */}
      <ReimbursementsList
        requests={reimbursementRequests}
        selectedRequests={selectedRequests}
        onSelectExpense={setSelectedExpense}
        onApprove={handleApprove}
        onFlag={handleFlag}
        onNotify={handleNotify}
        onSelect={toggleRequestSelection}
      />

      <ExpenseDetailsDialog 
        selectedExpense={selectedExpense} 
        setSelectedExpense={setSelectedExpense} 
      />
    </div>
  );
};

export default ReimbursementsView;