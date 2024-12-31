import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users2, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { EmptyState } from "@/components/ui/empty-state";
import InviteCodeCard from "./InviteCodeCard";

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

const DashboardView = ({ onNavigate }: DashboardViewProps) => {
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [isGroupsOpen, setIsGroupsOpen] = useState(true);
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

      {/* Members Section */}
      <Card className="p-6">
        <Collapsible open={isGroupsOpen} onOpenChange={setIsGroupsOpen}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Your Groups</h2>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isGroupsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <EmptyState
              title="No Groups Yet"
              description="Generate an invite code to add your first group."
              icon={<Users2 className="w-12 h-12 text-warm-400" />}
            />
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default DashboardView;