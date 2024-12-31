import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Group } from "./types";

interface GroupCardProps {
  group: Group;
  onSubmitReimbursement: () => void;
}

const GroupCard = ({ group, onSubmitReimbursement }: GroupCardProps) => {
  const navigate = useNavigate();
  const formattedDate = new Date(group.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
        <CardDescription>Active since {formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => navigate("/reimbursement")} 
          className="w-full"
        >
          Submit Reimbursements →
        </Button>
      </CardContent>
    </Card>
  );
};

export default GroupCard;