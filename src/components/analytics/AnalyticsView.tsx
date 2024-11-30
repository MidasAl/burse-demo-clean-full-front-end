import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpendingChart from './SpendingChart';
import TrendChart from './TrendChart';

const mockGroupData = [
  { name: 'Engineering', amount: 12500, budget: 15000 },
  { name: 'Marketing', amount: 8700, budget: 10000 },
  { name: 'Sales', amount: 6300, budget: 8000 },
  { name: 'HR', amount: 4200, budget: 5000 },
];

const mockPersonData = [
  { name: 'John Doe', amount: 2300 },
  { name: 'Jane Smith', amount: 1800 },
  { name: 'Bob Johnson', amount: 1500 },
  { name: 'Alice Brown', amount: 1200 },
];

const mockTrendData = [
  { date: 'Jan', amount: 4000 },
  { date: 'Feb', amount: 4500 },
  { date: 'Mar', amount: 5200 },
  { date: 'Apr', amount: 4800 },
  { date: 'May', amount: 6000 },
  { date: 'Jun', amount: 5500 },
];

const AnalyticsView = () => {
  const [selectedEntity, setSelectedEntity] = useState('groups');

  return (
    <div className="space-y-6">
      <Tabs defaultValue="groups" className="w-full" onValueChange={setSelectedEntity}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="groups">Groups/Projects</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>
        <TabsContent value="groups" className="space-y-6">
          <SpendingChart 
            data={mockGroupData} 
            title="Group Spending vs Budget"
          />
          <TrendChart 
            data={mockTrendData}
            title="Spending Trends Over Time"
          />
        </TabsContent>
        <TabsContent value="people" className="space-y-6">
          <SpendingChart 
            data={mockPersonData}
            title="Individual Spending"
          />
          <TrendChart 
            data={mockTrendData}
            title="Individual Spending Trends"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsView;