import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { EarlyAccessModal } from "@/components/early-access/EarlyAccessModal";
import { LineChart, BarChart } from "lucide-react";

const AnalyticsView = () => {
  const [selectedEntity, setSelectedEntity] = useState('groups');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="groups" className="w-full" onValueChange={setSelectedEntity}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="groups">Groups/Projects</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>
        <TabsContent value="groups" className="space-y-6">
          <EmptyState
            title="No Analytics Data Yet"
            description="Start tracking expenses to see spending analytics for your groups and projects."
            icon={<BarChart className="w-12 h-12 text-warm-400" />}
          />
        </TabsContent>
        <TabsContent value="people" className="space-y-6">
          <EmptyState
            title="No Individual Data Yet"
            description="Individual spending analytics will appear here once expenses are tracked."
            icon={<LineChart className="w-12 h-12 text-warm-400" />}
          />
        </TabsContent>
      </Tabs>

      <EarlyAccessModal isOpen={showModal} onOpenChange={setShowModal} />
    </div>
  );
};

export default AnalyticsView;