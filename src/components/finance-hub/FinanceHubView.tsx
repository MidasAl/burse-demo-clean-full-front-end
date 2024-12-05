import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { EarlyAccessModal } from "@/components/early-access/EarlyAccessModal";
import { Receipt, Plug, FileText } from "lucide-react";

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
        <h1 className="text-3xl font-bold tracking-tight">Finance Hub</h1>
        <p className="text-warm-400">Manage your invoices, accounting tools, and compliance seamlessly.</p>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
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
      </Tabs>

      <EarlyAccessModal isOpen={showModal} onOpenChange={setShowModal} />
    </div>
  );
};