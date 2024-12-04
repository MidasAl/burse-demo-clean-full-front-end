import { Check, Clock, Users2, BrainCircuit } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface InsightCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  tooltip: string;
  isActive?: boolean;
}

const InsightCard = ({ title, value, icon, tooltip, isActive = false }: InsightCardProps) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Card className={`p-4 transition-all ${isActive ? 'bg-[#F2FCE2]' : 'bg-warm-50'} hover:shadow-md`}>
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-full ${isActive ? 'bg-[#E2F2D2]' : 'bg-warm-100'}`}>
            {icon}
          </div>
          <div className="space-y-1">
            <p className="text-sm text-warm-400">{title}</p>
            <p className="text-2xl font-bold text-warm-500">{value}</p>
          </div>
        </div>
      </Card>
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
      <p className="text-sm text-warm-400">{tooltip}</p>
    </HoverCardContent>
  </HoverCard>
);

const InsightsCards = () => {
  // Mock data - in a real app, this would come from an API
  const insights = {
    processed: "38",
    avgTime: "2.5",
    activeGroup: "Marketing",
    activeGroupCount: "15"
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-2">
        <BrainCircuit className="w-5 h-5 text-warm-500" />
        <h2 className="text-lg font-semibold text-warm-500">AI Insights</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <InsightCard
          title="Reimbursements Processed"
          value={`${insights.processed} requests`}
          icon={<Check className="w-5 h-5 text-warm-500 animate-pulse" />}
          tooltip="Total number of reimbursements processed this week by AI"
          isActive={true}
        />
        <InsightCard
          title="Average Approval Time"
          value={`${insights.avgTime} days`}
          icon={<Clock className="w-5 h-5 text-warm-500" />}
          tooltip="AI-calculated average time for reimbursement approval this week"
        />
        <InsightCard
          title="Most Active Department"
          value={`${insights.activeGroup}: ${insights.activeGroupCount}`}
          icon={<Users2 className="w-5 h-5 text-warm-500" />}
          tooltip="AI-identified department with highest reimbursement activity"
        />
      </div>
    </div>
  );
};

export default InsightsCards;