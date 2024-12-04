import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Users2, LayoutGrid, List } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data for members
const members = [
  { id: 1, name: "Sarah Johnson", department: "Finance Department", initials: "SJ", joinDate: "11/12/2024" },
  { id: 2, name: "Michael Chen", department: "IT Department", initials: "MC", joinDate: "10/15/2024" },
  { id: 3, name: "Emily Rodriguez", department: "HR Department", initials: "ER", joinDate: "09/20/2024" },
  { id: 4, name: "James Wilson", department: "Marketing Department", initials: "JW", joinDate: "08/30/2024" },
  { id: 5, name: "Aisha Patel", department: "Research & Development", initials: "AP", joinDate: "07/25/2024" },
];

const DashboardView = () => {
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
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
      {inviteCode && (
        <Card className="p-6">
          <div className="space-y-4 text-center">
            <h2 className="text-lg text-warm-400">Your invite code is ready:</h2>
            <div className="flex justify-center items-center space-x-2">
              <div className="bg-white px-6 py-3 rounded-lg text-xl font-mono">
                {inviteCode}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                className="hover:bg-warm-100"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-warm-400">
              Click the copy icon to copy the code
            </p>
          </div>
        </Card>
      )}

      {/* Members Section */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Your Groups</h2>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-warm-100' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-warm-100' : ''}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-4">
            {members.map((member) => (
              <div 
                key={member.id} 
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-warm-100 text-warm-500">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-warm-400">{member.department}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedMembers).map(([department, departmentMembers]) => (
              <Card key={department} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-warm-500">
                      {department[0]}
                    </div>
                    <h3 className="text-xl font-semibold">{department}</h3>
                    <div className="text-sm text-warm-400">
                      Active since {departmentMembers[0].joinDate}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {departmentMembers.map((member) => (
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

                  <Button 
                    className="w-full bg-[#494E5B] text-white hover:bg-[#363B47]"
                  >
                    Submit Reimbursements →
                  </Button>
                </div>
              </Card>
            ))}
            
            {/* Join Another Group Card */}
            <Card className="p-6 border-dashed flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-[#494E5B] rounded-full flex items-center justify-center mx-auto text-white">
                  <Users2 className="w-6 h-6" />
                </div>
                <p className="text-warm-400">Join Another Group</p>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardView;