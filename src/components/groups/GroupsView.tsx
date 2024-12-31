import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { EmptyState } from "@/components/ui/empty-state";
import JoinGroupModal from "./JoinGroupModal";
import GroupCard from "./GroupCard";
import { Group } from "./types";

// Dummy data for testing
const DUMMY_INVITE_CODES = {
  'GROUP123': {
    name: 'Duke Finance',
    createdAt: '2024-02-11T00:00:00.000Z',
  },
  'DUKE2024': {
    name: 'NYU Admin Group',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  'NYU567': {
    name: 'Venture Capital Team',
    createdAt: '2023-05-06T00:00:00.000Z',
  }
};

export const GroupsView = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const { toast } = useToast();

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
      // Check if group already exists
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

  const handleSubmitReimbursement = () => {
    toast({
      title: "Coming Soon",
      description: "Reimbursement submission will be available soon.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Your Groups</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.length === 0 ? (
          <Card className="col-span-full">
            <EmptyState
              title="No groups joined yet"
              description="Join a group to start submitting reimbursements"
              icon={
                <div className="w-12 h-12 rounded-full bg-warm-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-warm-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              }
            />
            <div className="flex justify-center p-6 pt-0">
              <Button onClick={() => setIsJoinModalOpen(true)}>
                Join a Group
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onSubmitReimbursement={handleSubmitReimbursement}
              />
            ))}
            <Card className="flex items-center justify-center p-6 border-dashed">
              <Button
                variant="outline"
                onClick={() => setIsJoinModalOpen(true)}
                className="w-full"
              >
                Join Another Group
              </Button>
            </Card>
          </>
        )}
      </div>

      <JoinGroupModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={handleJoinGroup}
      />
    </div>
  );
};