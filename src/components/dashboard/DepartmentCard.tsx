import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GroupManageDialog from "./GroupManageDialog";

interface Member {
  id: number;
  name: string;
  department: string;
  initials: string;
  joinDate: string;
}

interface DepartmentCardProps {
  department: string;
  members: Member[];
}

const DepartmentCard = ({ department, members }: DepartmentCardProps) => {
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);

  return (
    <>
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-warm-500">
              {department[0]}
            </div>
            <h3 className="text-xl font-semibold">{department}</h3>
            <div className="text-sm text-warm-400">
              Active since {members[0].joinDate}
            </div>
          </div>
          
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-warm-100 text-warm-500">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{member.name}</span>
              </div>
            ))}
          </div>

          <Button 
            className="w-full bg-[#494E5B] text-white hover:bg-[#363B47]"
            onClick={() => setIsManageDialogOpen(true)}
          >
            Manage →
          </Button>
        </div>
      </Card>

      <GroupManageDialog
        isOpen={isManageDialogOpen}
        onClose={() => setIsManageDialogOpen(false)}
        department={department}
        members={members}
      />
    </>
  );
};

export default DepartmentCard;