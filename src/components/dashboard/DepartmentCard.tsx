import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileDown, Users2, Settings } from "lucide-react";
import GroupManageDialog from "./GroupManageDialog";
import PolicyEditorDialog from "./PolicyEditorDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface Member {
  id: number;
  name: string;
  department: string;
  initials: string;
  joinDate: string;
}

interface DepartmentCardProps {
  department: string;
  members: Member[];
}

// Mock data for AI summaries - in a real app, this would come from an API
const getAISummary = (department: string) => {
  const summaries = {
    "Finance Department": {
      total: 12,
      approved: 10,
      flagged: 2,
      status: "yellow",
    },
    "IT Department": {
      total: 8,
      approved: 8,
      flagged: 0,
      status: "green",
    },
    "HR Department": {
      total: 15,
      approved: 12,
      flagged: 3,
      status: "red",
    },
    "Marketing Department": {
      total: 10,
      approved: 9,
      flagged: 1,
      status: "yellow",
    },
    "Research & Development": {
      total: 6,
      approved: 6,
      flagged: 0,
      status: "green",
    },
  };
  return summaries[department as keyof typeof summaries];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-500";
    case "red":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const DepartmentCard = ({ department, members }: DepartmentCardProps) => {
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState(false);
  const { toast } = useToast();
  const aiSummary = getAISummary(department);

  const handleBulkApprove = () => {
    toast({
      description: "Opening bulk approval modal...",
      duration: 2000,
    });
  };

  const handleDownloadReceipts = () => {
    toast({
      description: "Downloading receipts...",
      duration: 2000,
    });
  };

  return (
    <>
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-warm-500">
                {department[0]}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPolicyDialogOpen(true)}
                className="text-warm-400 hover:text-warm-500"
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Policies
              </Button>
            </div>
            <h3 className="text-xl font-semibold">{department}</h3>
            <div className="text-sm text-warm-400">
              Active since {members[0].joinDate}
            </div>

            {/* AI Summary */}
            <div className="flex items-center space-x-2 mt-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(aiSummary.status)}`} />
              <p className="text-sm text-warm-400">
                AI Summary: {aiSummary.total} reimbursements this week, {aiSummary.approved} auto-approved, {aiSummary.flagged} flagged by AI for policy violations
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-warm-100 text-warm-500">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{member.name}</span>
              </div>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className="w-full bg-[#494E5B] text-white hover:bg-[#363B47]"
              >
                Quick Actions →
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => setIsManageDialogOpen(true)}>
                <Users2 className="mr-2 h-4 w-4" />
                View Group Summary
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBulkApprove}>
                <FileDown className="mr-2 h-4 w-4" />
                Bulk Approve Requests
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadReceipts}>
                <Download className="mr-2 h-4 w-4" />
                Download Receipts
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      <GroupManageDialog
        isOpen={isManageDialogOpen}
        onClose={() => setIsManageDialogOpen(false)}
        department={department}
        members={members}
      />

      <PolicyEditorDialog
        isOpen={isPolicyDialogOpen}
        onClose={() => setIsPolicyDialogOpen(false)}
        department={department}
      />
    </>
  );
};

export default DepartmentCard;