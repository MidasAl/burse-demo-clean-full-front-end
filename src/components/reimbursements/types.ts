export interface ReimbursementRequest {
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
  department?: string;
}