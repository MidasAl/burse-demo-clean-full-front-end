import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  } | null;
  setSelectedExpense: (expense: null) => void;
}

export const ExpenseDetailsDialog = ({ selectedExpense, setSelectedExpense }: ExpenseDetailsDialogProps) => {
  return (
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
  );
};