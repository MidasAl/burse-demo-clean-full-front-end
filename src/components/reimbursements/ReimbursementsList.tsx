import { motion } from "framer-motion";
import ReimbursementCard from "@/components/ReimbursementCard";
import { ReimbursementRequest } from "./types";

interface ReimbursementsListProps {
  requests: ReimbursementRequest[];
  selectedRequests: Set<string>;
  onSelectExpense: (request: ReimbursementRequest) => void;
  onApprove: (request: ReimbursementRequest) => void;
  onFlag: (request: ReimbursementRequest) => void;
  onNotify: (request: ReimbursementRequest) => void;
  onSelect: (request: ReimbursementRequest) => void;
}

const ReimbursementsList = ({
  requests,
  selectedRequests,
  onSelectExpense,
  onApprove,
  onFlag,
  onNotify,
  onSelect,
}: ReimbursementsListProps) => {
  return (
    <div className="space-y-6">
      <div className="text-sm font-medium text-warm-400">Today</div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {requests.map((request, index) => (
          <ReimbursementCard
            key={index}
            request={{
              ...request,
              selected: selectedRequests.has(request.title),
            }}
            onClick={onSelectExpense}
            onApprove={onApprove}
            onFlag={onFlag}
            onNotify={onNotify}
            onSelect={onSelect}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ReimbursementsList;