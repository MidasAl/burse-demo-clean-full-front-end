import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { EarlyAccessModal } from "@/components/early-access/EarlyAccessModal";
import { Receipt, Plug, FileText, ListTodo } from "lucide-react";
import AnalyticsView from "../analytics/AnalyticsView";

export const FinanceHubView = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <ListTodo className="w-8 h-8 text-warm-400" />
          <h1 className="text-3xl font-bold tracking-tight">Finance Hub</h1>
        </div>
        <p className="text-warm-400">Manage your invoices, accounting tools, and compliance seamlessly.</p>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices">
          <EmptyState
            title="No Invoices Yet"
            description="Your invoices will appear here once you start processing them."
            icon={<Receipt className="w-12 h-12 text-warm-400" />}
          />
        </TabsContent>
        <TabsContent value="integrations">
          <EmptyState
            title="No Integrations Set Up"
            description="Connect your accounting tools and services here."
            icon={<Plug className="w-12 h-12 text-warm-400" />}
          />
        </TabsContent>
        <TabsContent value="audit-logs">
          <EmptyState
            title="No Audit Logs"
            description="Your audit trail will appear here once you start using the system."
            icon={<FileText className="w-12 h-12 text-warm-400" />}
          />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsView />
        </TabsContent>
      </Tabs>

      <EarlyAccessModal isOpen={showModal} onOpenChange={setShowModal} />
    </div>
  );
};