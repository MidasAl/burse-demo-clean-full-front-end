import { useState } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import Sidebar from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";
import JoinGroupModal from "@/components/groups/JoinGroupModal";
import { useToast } from "@/hooks/use-toast";
import { Group } from "@/components/groups/types";

const UserDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Dummy data for testing
  const DUMMY_INVITE_CODES = {
    'GROUP123': {
      name: 'Duke Finance',
      createdAt: '2024-02-11T00:00:00.000Z',
    },
    'DUKE2024': {
      name: 'NYU Admin Group',
      createdAt: '2024-01-01T00:00:00.000Z',
    }
  };

  const handleJoinGroup = (code: string) => {
    const groupData = DUMMY_INVITE_CODES[code as keyof typeof DUMMY_INVITE_CODES];
    
    if (!groupData) {
      toast({
        title: "Invalid Code",
        description: "Please check your invite code and try again.",
        variant: "destructive",
      });
      return;
    }

    const newGroup: Group = {
      id: Date.now().toString(),
      name: groupData.name,
      createdAt: groupData.createdAt,
      inviteCode: code,
    };

    setGroups((prevGroups) => {
      if (prevGroups.some(g => g.inviteCode === code)) {
        toast({
          title: "Already Joined",
          description: "You've already joined this group.",
          variant: "destructive",
        });
        return prevGroups;
      }
      
      toast({
        title: "Success!",
        description: "You've successfully joined the group.",
      });
      return [...prevGroups, newGroup];
    });
    
    setIsJoinModalOpen(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case "reimbursements":
        return (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold tracking-tight">Reimbursement Requests</h1>
              <div className="flex gap-4">
                <Button 
                  onClick={() => navigate("/reimbursement")}
                  className="bg-warm-500 hover:bg-warm-400"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Request
                </Button>
                <Button variant="default" className="bg-warm-500 hover:bg-warm-400">
                  <Download className="w-5 h-5 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Balance Card */}
            <Card className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-3xl font-bold">$0.00</div>
                  <div className="text-warm-400 mt-1">Pending Reimbursements</div>
                </div>
              </div>
            </Card>

            {/* Empty State */}
            <Card className="p-6">
              <EmptyState
                title="No Reimbursement Requests"
                description="Your reimbursement requests will appear here once they're submitted."
                icon={
                  <svg className="w-12 h-12 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
              />
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">User Dashboard</h1>
                <div className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm mt-2">
                  Duke University
                </div>
              </div>
              <Button 
                onClick={() => navigate("/reimbursement")}
                className="bg-warm-500 hover:bg-warm-400"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Reimbursement
              </Button>
            </div>

            <div className="grid gap-6">
              <Card className="p-6">
                <EmptyState
                  title="Welcome to Your Dashboard"
                  description="Start by joining a group or submitting a reimbursement request."
                  icon={
                    <svg className="w-12 h-12 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                />
                <div className="flex justify-center p-6 pt-0">
                  <Button onClick={() => setIsJoinModalOpen(true)}>
                    Join a Group
                  </Button>
                </div>
              </Card>

              {groups.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {groups.map((group) => (
                      <Card key={group.id} className="p-4">
                        <h3 className="font-medium">{group.name}</h3>
                        <p className="text-sm text-warm-400">
                          Joined {new Date(group.createdAt).toLocaleDateString()}
                        </p>
                      </Card>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar onNavigate={setCurrentView} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
      <JoinGroupModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={handleJoinGroup}
      />
    </div>
  );
};

export default UserDashboard;