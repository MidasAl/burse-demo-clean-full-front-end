import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import JoinGroupModal from "./JoinGroupModal";
import GroupCard from "./GroupCard";
import { Group } from "./types";

interface GroupsViewProps {
  onNavigate: (view: string) => void;
}

const GroupsView = ({ onNavigate }: GroupsViewProps) => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const { toast } = useToast();

  // Simulated group joining logic
  const handleJoinGroup = (code: string) => {
    // This is a mock implementation. In a real app, this would validate against a backend
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
          <Card className="col-span-full p-6">
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">No groups joined yet</p>
              <Button onClick={() => setIsJoinModalOpen(true)}>
                Join a Group
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onSubmitReimbursement={() => onNavigate("reimbursements")}
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

export default GroupsView;