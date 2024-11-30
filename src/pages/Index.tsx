import { motion } from "framer-motion";
import { ChartBar, FileText, Download, DollarSign, Settings, Users2, Receipt, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useState } from "react";

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

  const [showExport, setShowExport] = useState(false);

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
      {/* Sidebar */}
      <nav className="w-64 p-8 border-r border-warm-100">
        <div className="space-y-8">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight">
            BURSE
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <a href="#" className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors">
              <DollarSign className="w-5 h-5" />
              <span>Reimbursements</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors">
              <ChartBar className="w-5 h-5" />
              <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors">
              <FileText className="w-5 h-5" />
              <span>Invoices</span>
            </a>
            <SheetTrigger asChild>
              <a href="#" className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </a>
            </SheetTrigger>
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
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
                <Card 
                  key={index}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedExpense(request)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-warm-100" />
                        <div>
                          <div className="font-medium">{request.title}</div>
                          <div className="text-sm text-warm-400">{request.user}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-warm-400">{request.status}</span>
                        <div className="font-medium">{request.amount}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Export Sheet */}
      <Sheet>
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
                <Users2 className="w-4 h-4 text-warm-400" />
                <span>{selectedExpense?.user}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Receipt className="w-4 h-4 text-warm-400" />
                <span>{selectedExpense?.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-warm-400" />
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