import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ReimbursementsView from "@/components/reimbursements/ReimbursementsView";
import AnalyticsView from "@/components/analytics/AnalyticsView";
import DashboardView from "@/components/dashboard/DashboardView";

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="flex h-screen bg-warm-50">
      <Sidebar onNavigate={(view) => setCurrentView(view)} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {currentView === 'analytics' && <AnalyticsView />}
        {currentView === 'reimbursements' && <ReimbursementsView />}
        {currentView === 'dashboard' && <DashboardView onNavigate={setCurrentView} />}
      </main>
    </div>
  );
};

export default Index;