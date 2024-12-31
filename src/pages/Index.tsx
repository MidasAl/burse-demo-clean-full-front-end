import { Routes, Route } from "react-router-dom";
import { GroupsView } from "@/components/groups/GroupsView";
import { ReimbursementFlow } from "@/components/reimbursements/ReimbursementFlow";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupsView />} />
      <Route path="/reimbursement" element={<ReimbursementFlow />} />
    </Routes>
  );
};

export default Index;