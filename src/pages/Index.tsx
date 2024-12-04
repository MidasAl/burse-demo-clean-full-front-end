import { useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import ReimbursementView from "@/components/ReimbursementView";
import AnalyticsView from "@/components/analytics/AnalyticsView";

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="flex h-screen bg-warm-50">
      {/* Main Content */}
      <main className="flex-1">
        {currentView === 'dashboard' && <AdminDashboard />}
        {currentView === 'reimbursements' && <ReimbursementView />}
        {currentView === 'analytics' && <AnalyticsView />}
      </main>
    </div>
  );
};

export default Index;