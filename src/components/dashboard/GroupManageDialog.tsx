import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Member {
  id: number;
  name: string;
  department: string;
  initials: string;
  joinDate: string;
}

interface Reimbursement {
  title: string;
  amount: string;
  date: string;
  category: string;
  status: string;
}

interface GroupManageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  department: string;
  members: Member[];
}

const mockReimbursements: Record<number, Reimbursement[]> = {
  1: [
    {
      title: "Office Supplies",
      amount: "$24.50",
      date: "2024-03-15",
      category: "Business Expense",
      status: "AI Approved"
    },
    {
      title: "Team Lunch",
      amount: "$156.75",
      date: "2024-03-14",
      category: "Meals & Entertainment",
      status: "AI Rejected"
    }
  ],
  2: [
    {
      title: "Software License",
      amount: "$299.99",
      date: "2024-03-13",
      category: "Software",
      status: "AI Approved"
    }
  ]
};

const GroupManageDialog = ({ isOpen, onClose, department, members }: GroupManageDialogProps) => {
  const getStatusColor = (status: string) => {
    return status === 'AI Approved' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{department} - Member Reimbursements</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {members.map((member) => (
              <div key={member.id} className="space-y-3">
                <div className="font-semibold text-lg border-b pb-2">
                  {member.name}
                </div>
                {mockReimbursements[member.id] ? (
                  <div className="space-y-3">
                    {mockReimbursements[member.id].map((reimbursement, index) => (
                      <div 
                        key={index} 
                        className="bg-warm-50 p-4 rounded-lg space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{reimbursement.title}</span>
                          <span className="font-bold">{reimbursement.amount}</span>
                        </div>
                        <div className="flex justify-between text-sm text-warm-400">
                          <span>{reimbursement.category}</span>
                          <span>{reimbursement.date}</span>
                        </div>
                        <div className={`text-sm ${getStatusColor(reimbursement.status)}`}>
                          {reimbursement.status}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-warm-400 text-sm">No reimbursements found</div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GroupManageDialog;