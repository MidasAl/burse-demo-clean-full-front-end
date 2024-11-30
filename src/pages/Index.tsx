import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ReimbursementCard from "@/components/ReimbursementCard";
import AnalyticsView from "@/components/analytics/AnalyticsView";

const Index = () => {
  const [selectedExpense, setSelectedExpense] = useState<{
    title: string;
    amount: string;
    user: string;
    date: string;
    category?: string;
    note?: string;
    status?: string;
    aiRecommendation?: string;
  } | null>(null);

  const [currentView, setCurrentView] = useState('reimbursements');

  const reimbursementRequests = [
    {
      title: "Office Supplies",
      amount: "$24.50",
      user: "John Doe",
      date: "Today",
      category: "Business Expense",
      note: "Purchased office supplies for the team",
      status: "Pending AI Review",
      aiRecommendation: "Based on historical patterns and receipt analysis, this appears to be a valid business expense. Recommended for approval."
    },
    {
      title: "Team Lunch",
      amount: "$156.75",
      user: "Sarah Smith",
      date: "Yesterday",
      category: "Meals & Entertainment",
      note: "Team lunch meeting with clients",
      status: "AI Approved",
      aiRecommendation: "Expense matches company policy for client meetings. Receipt verified. Recommended for approval."
    }
  ];

  return (
    <div className="flex h-screen bg-warm-50">
      <Sidebar onNavigate={(view) => setCurrentView(view)} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {currentView === 'analytics' ? (
            <AnalyticsView />
          ) : (
            <>
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold">Reimbursement Requests</h1>
                <Button variant="default" className="bg-warm-500 hover:bg-warm-400">
                  New Request
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
            </>
          )}
        </div>
      </main>

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
                <span className="text-sm">{selectedExpense?.status}</span>
              </div>
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

export default Index;