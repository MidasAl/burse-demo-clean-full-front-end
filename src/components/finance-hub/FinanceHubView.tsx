import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoicesTab } from "./InvoicesTab";
import { IntegrationsTab } from "./IntegrationsTab";
import { AuditLogsTab } from "./AuditLogsTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FinanceHubView = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Finance Hub</h1>
        <p className="text-warm-400">Manage your invoices, accounting tools, and compliance seamlessly.</p>
        
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-warm-400">Total Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125</div>
              <p className="text-xs text-warm-400">invoices synced</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-warm-400">Sync Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98</div>
              <p className="text-xs text-warm-400">synced | 20 pending | 7 errors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-warm-400">Last Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h ago</div>
              <p className="text-xs text-warm-400">next sync in 1h</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices">
          <InvoicesTab />
        </TabsContent>
        <TabsContent value="integrations">
          <IntegrationsTab />
        </TabsContent>
        <TabsContent value="audit-logs">
          <AuditLogsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};