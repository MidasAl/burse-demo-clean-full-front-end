import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users2, BrainCircuit } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DepartmentCard from "./DepartmentCard";
import InviteCodeCard from "./InviteCodeCard";
import InsightsCards from "./InsightsCards";
import { AIBadge } from "../ui/ai-badge";

// Mock data for members
const members = [
  { id: 1, name: "Sarah Johnson", department: "Finance Department", initials: "SJ", joinDate: "11/12/2024" },
  { id: 2, name: "Michael Chen", department: "IT Department", initials: "MC", joinDate: "10/15/2024" },
  { id: 3, name: "Emily Rodriguez", department: "HR Department", initials: "ER", joinDate: "09/20/2024" },
  { id: 4, name: "James Wilson", department: "Marketing Department", initials: "JW", joinDate: "08/30/2024" },
  { id: 5, name: "Aisha Patel", department: "Research & Development", initials: "AP", joinDate: "07/25/2024" },
];

// Mock data for AI recommendations
const aiRecommendations = [
  {
    type: "policy",
    text: "Consider increasing Marketing's travel budget by 10% based on recent trends.",
    impact: "Could improve team productivity by 15%"
  },
  {
    type: "workflow",
    text: "Auto-approve reimbursements below $50 to reduce admin workload.",
    impact: "Estimated 30% reduction in processing time"
  },
  {
    type: "alert",
    text: "HR Department has 5 pending requests older than 3 days.",
    impact: "Affecting 3 team members"
  }
];

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

const DashboardView = ({ onNavigate }: DashboardViewProps) => {
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const { toast } = useToast();

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      if (i === 4) code += ' ';
      else code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setInviteCode(code);
  };

  const copyToClipboard = async () => {
    if (inviteCode) {
      await navigator.clipboard.writeText(inviteCode.replace(' ', ''));
      toast({
        description: "Code copied to clipboard!",
        duration: 2000,
      });
    }
  };

  // Group members by department
  const groupedMembers = members.reduce((acc, member) => {
    if (!acc[member.department]) {
      acc[member.department] = [];
    }
    acc[member.department].push(member);
    return acc;
  }, {} as Record<string, typeof members>);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
          <div className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm">
            Duke
          </div>
        </div>
        <div className="space-x-4">
          <Button 
            variant="secondary" 
            className="bg-[#494E5B] text-white hover:bg-[#363B47]"
            onClick={() => onNavigate('reimbursements')}
          >
            View Reimbursement History
          </Button>
          <Button 
            variant="secondary"
            className="bg-[#FFE4E4] text-warm-500 hover:bg-[#FFD4D4]"
            onClick={generateCode}
          >
            Generate New Code
          </Button>
        </div>
      </div>

      {/* Invite Code Section */}
      <InviteCodeCard inviteCode={inviteCode} onCopy={copyToClipboard} />

      {/* Insights Cards */}
      <InsightsCards />

      {/* Members Section */}
      <Card className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Your Groups</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedMembers).map(([department, departmentMembers]) => (
            <DepartmentCard 
              key={department} 
              department={department} 
              members={departmentMembers} 
            />
          ))}
          
          {/* Join Another Group Card */}
          <Card 
            className="p-6 border-dashed flex items-center justify-center cursor-pointer hover:bg-warm-50 transition-colors"
            onClick={generateCode}
          >
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-[#494E5B] rounded-full flex items-center justify-center mx-auto text-white">
                <Users2 className="w-6 h-6" />
              </div>
              <p className="text-warm-400">Invite Another Group</p>
            </div>
          </Card>
        </div>
      </Card>

      {/* AI Recommendations Section */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BrainCircuit className="w-6 h-6 text-warm-500" />
          <h2 className="text-xl font-semibold">Burse AI Suggests</h2>
        </div>
        <div className="space-y-4">
          {aiRecommendations.map((rec, index) => (
            <div key={index} className="p-4 bg-warm-50 rounded-lg">
              <p className="text-warm-500 font-medium">{rec.text}</p>
              <p className="text-sm text-warm-400 mt-1">{rec.impact}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Badge */}
      <AIBadge />
    </div>
  );
};

export default DashboardView;