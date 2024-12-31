import DashboardView from "@/components/dashboard/DashboardView";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "reimbursements":
        return <div>Reimbursements View</div>;
      case "finance-hub":
        return <div>Finance Hub View</div>;
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