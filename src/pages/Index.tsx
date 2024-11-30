import { motion } from "framer-motion";
import { ChartBar, FileText, Download, DollarSign, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Index = () => {
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
              <span>Admin Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors">
              <DollarSign className="w-5 h-5" />
              <span>Expenses</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors">
              <ChartBar className="w-5 h-5" />
              <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors">
              <FileText className="w-5 h-5" />
              <span>Invoices</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded-lg text-warm-500 hover:bg-warm-100 transition-colors">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </a>
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
            <h1 className="text-2xl font-semibold">Expenses</h1>
            <Button variant="default" className="bg-warm-500 hover:bg-warm-400">
              Add expense
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
                    <div className="text-warm-400 mt-1">Available balance</div>
                  </div>
                  <Button variant="outline">Top-up →</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              <Button variant="ghost" className="text-warm-500 font-medium">
                All
              </Button>
              <Button variant="ghost" className="text-warm-400">
                Review
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>

          {/* Expenses List */}
          <div className="space-y-6">
            <div className="text-sm font-medium text-warm-400">Today</div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Sample Expense Items */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-warm-100" />
                      <div>
                        <div className="font-medium">Office Supplies</div>
                        <div className="text-sm text-warm-400">John Doe</div>
                      </div>
                    </div>
                    <div className="font-medium">$24.50</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;