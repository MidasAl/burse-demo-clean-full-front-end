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
import ReimbursementCard from "@/components/ReimbursementCard";
import { useState } from "react";
import { ExpenseDetailsDialog } from "./ExpenseDetailsDialog";
import { useToast } from "@/hooks/use-toast";

const reimbursementRequests = [
  {
    title: "Office Supplies",
    amount: "$24.50",
    user: "John Doe",
    date: "Today",
    category: "Business Expense",
    note: "Purchased office supplies for the team",
    status: "AI Rejected",
    department: "Engineering",
    aiConfidence: "High" as const,
    rejectionReason: "Receipt shows personal items mixed with office supplies. Please submit a new request with only business-related items.",
    aiRecommendation: "Advise the user to separate personal and business items and upload a new receipt. Alternatively, approve partial amount of $15 for business items only."
  },
  {
    title: "Team Lunch",
    amount: "$156.75",
    user: "Sarah Smith",
    date: "Yesterday",
    category: "Meals & Entertainment",
    note: "Team lunch meeting with clients",
    status: "AI Approved",
    department: "Sales",
    aiConfidence: "High" as const,
    aiRecommendation: "Expense matches company policy for client meetings. Receipt verified. Recommended for approval."
  }
];

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
  const [selectedExpense, setSelectedExpense] = useState<{
    title: string;
    amount: string;
    user: string;
    date: string;
    category?: string;
    note?: string;
    status?: string;
    aiRecommendation?: string;
    rejectionReason?: string;
    aiConfidence?: "High" | "Medium" | "Low";
  } | null>(null);

  const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleApprove = (request: typeof reimbursementRequests[0]) => {
    toast({
      description: `Approved reimbursement for ${request.user}`,
    });
  };

  const handleFlag = (request: typeof reimbursementRequests[0]) => {
    toast({
      description: `Flagged reimbursement from ${request.user} for review`,
    });
  };

  const handleNotify = (request: typeof reimbursementRequests[0]) => {
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

  const toggleRequestSelection = (request: typeof reimbursementRequests[0]) => {
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
                <div className="text-3xl font-bold">$1,000.00</div>
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
      <div className="space-y-6">
        <div className="text-sm font-medium text-warm-400">Today</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {reimbursementRequests.map((request, index) => (
            <ReimbursementCard 
              key={index}
              request={{
                ...request,
                selected: selectedRequests.has(request.title)
              }}
              onClick={setSelectedExpense}
              onApprove={handleApprove}
              onFlag={handleFlag}
              onNotify={handleNotify}
              onSelect={toggleRequestSelection}
            />
          ))}
        </motion.div>
      </div>

      <ExpenseDetailsDialog 
        selectedExpense={selectedExpense} 
        setSelectedExpense={setSelectedExpense} 
      />
    </div>
  );
};

export default ReimbursementsView;
