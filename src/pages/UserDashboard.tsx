import { useState } from "react";
import { GroupsView } from "@/components/groups/GroupsView";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-warm-50">
      <div className="container mx-auto px-4 py-8">
        <GroupsView />
      </div>
    </div>
  );
};

export default UserDashboard;