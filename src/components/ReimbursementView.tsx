import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ReimbursementCard from "@/components/ReimbursementCard";

const ReimbursementView = () => {
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
  } | null>(null);

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
      rejectionReason: "Receipt shows personal items mixed with office supplies. Please submit a new request with only business-related items."
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

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Reimbursement Requests</h1>
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
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-warm-400" />
                <span className="text-sm text-warm-400">AI-Powered Approval</span>
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
              request={request}
              onClick={setSelectedExpense}
            />
          ))}
        </motion.div>
      </div>

      {/* Expense Details Dialog */}
      <Dialog open={!!selectedExpense} onOpenChange={() => setSelectedExpense(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reimbursement Request Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{selectedExpense?.amount}</div>
              <div className="text-warm-400">{selectedExpense?.date}</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span>{selectedExpense?.user}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>{selectedExpense?.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${
                  selectedExpense?.status === 'AI Approved' 
                    ? 'text-green-600' 
                    : selectedExpense?.status === 'AI Rejected'
                    ? 'text-red-600'
                    : 'text-warm-400'
                }`}>
                  {selectedExpense?.status}
                </span>
              </div>
              {selectedExpense?.status === 'AI Rejected' && selectedExpense?.rejectionReason && (
                <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-sm text-red-800">
                  <strong>Rejection Reason:</strong>
                  <p className="mt-1">{selectedExpense.rejectionReason}</p>
                </div>
              )}
              {selectedExpense?.aiRecommendation && (
                <div className="bg-warm-50 p-3 rounded-lg text-sm">
                  {selectedExpense.aiRecommendation}
                </div>
              )}
              {selectedExpense?.note && (
                <div className="bg-warm-50 p-3 rounded-lg text-sm mt-2">
                  {selectedExpense.note}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReimbursementView;