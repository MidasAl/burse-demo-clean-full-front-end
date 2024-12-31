import { useState } from "react";
import DashboardView from "@/components/dashboard/DashboardView";
import Sidebar from "@/components/Sidebar";
import ReimbursementsView from "@/components/reimbursements/ReimbursementsView";
import { FinanceHubView } from "@/components/finance-hub/FinanceHubView";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "reimbursements":
        return <ReimbursementsView />;
      case "finance-hub":
        return <FinanceHubView />;
      default:
        return <DashboardView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar onNavigate={setCurrentView} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;