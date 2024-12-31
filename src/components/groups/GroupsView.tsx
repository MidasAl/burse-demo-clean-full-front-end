import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { EmptyState } from "@/components/ui/empty-state";
import JoinGroupModal from "./JoinGroupModal";
import GroupCard from "./GroupCard";
import { Group } from "./types";

export const GroupsView = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const { toast } = useToast();

  const handleJoinGroup = (code: string) => {
    if (code.toLowerCase() !== "duke2024") {
      toast({
        title: "Invalid Code",
        description: "Please check your invite code and try again.",
        variant: "destructive",
      });
      return;
    }

    const mockGroup: Group = {
      id: Date.now().toString(),
      name: "Duke Finance",
      createdAt: new Date().toISOString(),
      inviteCode: code,
    };

    setGroups([...groups, mockGroup]);
    setIsJoinModalOpen(false);
    toast({
      title: "Success!",
      description: "You've successfully joined the group.",
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
            >
              <Button onClick={() => setIsJoinModalOpen(true)} className="mt-4">
                Join a Group
              </Button>
            </EmptyState>
          </Card>
        ) : (
          <>
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onSubmitReimbursement={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Reimbursement submission will be available soon.",
                  });
                }}
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