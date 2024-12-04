import { Brain } from "lucide-react";
import { Badge } from "./badge";

export const AIBadge = () => {
  return (
    <Badge 
      variant="secondary" 
      className="fixed bottom-4 left-4 bg-warm-50/80 backdrop-blur-sm border border-warm-100"
    >
      <Brain className="w-4 h-4 mr-2 text-warm-500 animate-pulse" />
      Powered by AI
    </Badge>
  );
};