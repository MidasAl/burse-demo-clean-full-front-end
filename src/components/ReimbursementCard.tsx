import { Card, CardContent } from "@/components/ui/card";

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
}

interface ReimbursementCardProps {
  request: ReimbursementRequest;
  onClick: (request: ReimbursementRequest) => void;
}

const ReimbursementCard = ({ request, onClick }: ReimbursementCardProps) => {
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

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(request)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
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
            <div className="font-medium">{request.amount}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReimbursementCard;