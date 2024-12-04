import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DashboardView = () => {
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const { toast } = useToast();

  const generateCode = () => {
    // Generate a random 8-character code (4 chars + space + 4 chars)
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
        <h2 className="text-2xl font-semibold mb-8">Joined Members</h2>
        <div className="flex items-center justify-center py-12 text-warm-400">
          No requests yet
        </div>
      </Card>
    </div>
  );
};

export default DashboardView;