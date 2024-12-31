import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ReimbursementsView from "@/components/reimbursements/ReimbursementsView";
import GroupsView from "@/components/groups/GroupsView";

const Index = () => {
  const [currentView, setCurrentView] = useState('groups');

  return (
    <div className="flex h-screen bg-warm-50">
      <Sidebar onNavigate={(view) => setCurrentView(view)} />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {currentView === 'reimbursements' && <ReimbursementsView />}
        {currentView === 'groups' && <GroupsView onNavigate={setCurrentView} />}
      </main>
    </div>
  );
};

export default Index;