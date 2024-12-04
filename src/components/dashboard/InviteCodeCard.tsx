import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface InviteCodeCardProps {
  inviteCode: string | null;
  onCopy: () => void;
}

const InviteCodeCard = ({ inviteCode, onCopy }: InviteCodeCardProps) => {
  if (!inviteCode) return null;

  return (
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
            onClick={onCopy}
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
  );
};

export default InviteCodeCard;