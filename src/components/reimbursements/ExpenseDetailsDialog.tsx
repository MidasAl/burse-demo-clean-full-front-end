import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Download, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExpenseDetailsDialogProps {
  selectedExpense: {
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
  } | null;
  setSelectedExpense: (expense: null) => void;
}

export const ExpenseDetailsDialog = ({ selectedExpense, setSelectedExpense }: ExpenseDetailsDialogProps) => {
  const { toast } = useToast();

  const handleNotify = (method: 'email' | 'slack') => {
    toast({
      description: `Notification sent to ${selectedExpense?.user} via ${method}`,
    });
  };

  const handleExport = () => {
    toast({
      description: "Report downloaded successfully",
    });
  };

  return (
    <Dialog open={!!selectedExpense} onOpenChange={() => setSelectedExpense(null)}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Reimbursement Request Details</DialogTitle>
          <DialogDescription>
            Review and manage this reimbursement request
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{selectedExpense?.amount}</div>
            <div className="text-warm-400">{selectedExpense?.date}</div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>{selectedExpense?.user}</span>
              {selectedExpense?.aiConfidence && (
                <Badge variant="outline" className="ml-2">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Confidence: {selectedExpense.aiConfidence}
                </Badge>
              )}
            </div>
            
            <div>
              <span className="text-warm-400">Category:</span>
              <span className="ml-2">{selectedExpense?.category}</span>
            </div>

            <div>
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
              <div className="bg-red-50 border border-red-100 p-3 rounded-lg">
                <div className="font-medium text-red-800">Rejection Reason:</div>
                <p className="mt-1 text-sm text-red-700">{selectedExpense.rejectionReason}</p>
              </div>
            )}

            {selectedExpense?.aiRecommendation && (
              <div className="bg-warm-50 p-4 rounded-lg space-y-2">
                <div className="font-medium flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Suggestion
                </div>
                <p className="text-sm">{selectedExpense.aiRecommendation}</p>
              </div>
            )}

            {selectedExpense?.note && (
              <div className="bg-warm-50 p-3 rounded-lg text-sm">
                <div className="font-medium mb-1">Additional Notes:</div>
                {selectedExpense.note}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleNotify('email')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Notify via Email
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleNotify('slack')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Notify via Slack
              </Button>
            </div>
            
            <Button
              variant="secondary"
              onClick={handleExport}
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Export for Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};