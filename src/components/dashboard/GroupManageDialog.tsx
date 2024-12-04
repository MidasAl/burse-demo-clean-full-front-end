import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
    },
    {
      title: "Client Meeting",
      amount: "$89.99",
      date: "2024-03-13",
      category: "Business Expense",
      status: "AI Approved"
    }
  ],
  2: [
    {
      title: "Software License",
      amount: "$299.99",
      date: "2024-03-13",
      category: "Software",
      status: "AI Approved"
    },
    {
      title: "Hardware Upgrade",
      amount: "$899.99",
      date: "2024-03-12",
      category: "Equipment",
      status: "AI Approved"
    }
  ],
  3: [
    {
      title: "Training Materials",
      amount: "$150.00",
      date: "2024-03-11",
      category: "Education",
      status: "AI Approved"
    },
    {
      title: "Conference Tickets",
      amount: "$499.99",
      date: "2024-03-10",
      category: "Events",
      status: "AI Rejected"
    }
  ],
  4: [
    {
      title: "Marketing Campaign",
      amount: "$2500.00",
      date: "2024-03-09",
      category: "Marketing",
      status: "AI Approved"
    },
    {
      title: "Social Media Ads",
      amount: "$750.00",
      date: "2024-03-08",
      category: "Advertising",
      status: "AI Approved"
    }
  ],
  5: [
    {
      title: "Lab Equipment",
      amount: "$3500.00",
      date: "2024-03-07",
      category: "Equipment",
      status: "AI Approved"
    },
    {
      title: "Research Materials",
      amount: "$899.99",
      date: "2024-03-06",
      category: "Supplies",
      status: "AI Rejected"
    }
  ]
};

const GroupManageDialog = ({ isOpen, onClose, department, members }: GroupManageDialogProps) => {
  const [viewMode, setViewMode] = useState<'reimbursements' | 'members'>('reimbursements');
  
  const getStatusColor = (status: string) => {
    return status === 'AI Approved' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{department}</span>
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === 'reimbursements' ? 'members' : 'reimbursements')}
            >
              {viewMode === 'reimbursements' ? 'View All Members' : 'View Reimbursements'}
            </Button>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          {viewMode === 'reimbursements' ? (
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
          ) : (
            <div className="space-y-4">
              {members.map((member) => (
                <div 
                  key={member.id}
                  className="p-4 bg-warm-50 rounded-lg flex items-center justify-between"
                >
                  <span className="font-medium">{member.name}</span>
                  <span className="text-warm-400 text-sm">Joined {member.joinDate}</span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GroupManageDialog;