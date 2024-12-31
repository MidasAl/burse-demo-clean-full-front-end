import DashboardView from "@/components/dashboard/DashboardView";

const Index = () => {
  return <DashboardView onNavigate={(view) => console.log('Navigating to:', view)} />;
};

export default Index;