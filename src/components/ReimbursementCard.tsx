import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Flag, Send, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ReimbursementRequest {
  title: string;
  amount: string;
  user: string;
  date: string;
  category?: string;
  note?: string;
  status?: string;
  aiRecommendation?: string;
  rejectionReason?: string;
  aiConfidence?: "High" | "Medium" | "Low";
  selected?: boolean;
}

interface ReimbursementCardProps {
  request: ReimbursementRequest;
  onClick: (request: ReimbursementRequest) => void;
  onApprove: (request: ReimbursementRequest) => void;
  onFlag: (request: ReimbursementRequest) => void;
  onNotify: (request: ReimbursementRequest) => void;
  onSelect?: (request: ReimbursementRequest) => void;
}

const ReimbursementCard = ({ 
  request, 
  onClick, 
  onApprove, 
  onFlag, 
  onNotify,
  onSelect 
}: ReimbursementCardProps) => {
  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'AI Approved':
        return 'text-green-600';
      case 'AI Rejected':
        return 'text-red-600';
      default:
        return 'text-warm-400';
    }
  };

  const getConfidenceBadge = (confidence: "High" | "Medium" | "Low" | undefined) => {
    if (!confidence) return null;
    
    const colors = {
      High: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-red-100 text-red-800"
    };

    return (
      <Badge variant="outline" className={`${colors[confidence]} ml-2`}>
        <Brain className="w-3 h-3 mr-1" />
        AI Confidence: {confidence}
      </Badge>
    );
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(request)}
    >
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onSelect && (
                <input
                  type="checkbox"
                  checked={request.selected}
                  onChange={(e) => {
                    e.stopPropagation();
                    onSelect(request);
                  }}
                  className="rounded border-warm-200"
                />
              )}
              <div className="w-10 h-10 rounded-full bg-warm-100" />
              <div>
                <div className="font-medium">{request.title}</div>
                <div className="text-sm text-warm-400">{request.user}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
              {getConfidenceBadge(request.aiConfidence)}
              <div className="font-medium">{request.amount}</div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onApprove(request);
              }}
            >
              <Check className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onFlag(request);
              }}
            >
              <Flag className="w-4 h-4 mr-1" />
              Flag
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onNotify(request);
              }}
            >
              <Send className="w-4 h-4 mr-1" />
              Notify
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReimbursementCard;