import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Check, Upload } from "lucide-react";

interface PolicyEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  department: string;
}

interface PolicyRule {
  category: string;
  amount: number;
  frequency: number;
  period: "Weekday" | "Month" | "Year";
}

const PolicyEditorDialog = ({ isOpen, onClose, department }: PolicyEditorDialogProps) => {
  const [isManualMode, setIsManualMode] = useState(false);
  const [policyText, setPolicyText] = useState("");
  const [rules, setRules] = useState<PolicyRule[]>([
    { category: "Food", amount: 25, frequency: 1, period: "Weekday" },
    { category: "Rideshare", amount: 30, frequency: 2, period: "Weekday" },
  ]);
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Success!",
      description: "Policy has been updated.",
      duration: 3000,
    });
    onClose();
  };

  const handleAddRule = () => {
    setRules([...rules, { category: "", amount: 0, frequency: 1, period: "Weekday" }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Set Policy for {department}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!isManualMode ? (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium mb-2">Set Guidelines</h3>
                <Textarea
                  placeholder="Type up your itinerary or reimbursement guidelines and let our AI generate a policy for you"
                  className="min-h-[100px]"
                  value={policyText}
                  onChange={(e) => setPolicyText(e.target.value)}
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <Button variant="outline" onClick={() => setIsManualMode(true)}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                  <Button onClick={handleSubmit}>Submit</Button>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-muted-foreground">OR</div>
                <Button
                  variant="ghost"
                  className="mt-2 text-warm-400"
                  onClick={() => setIsManualMode(true)}
                >
                  Set your guidelines manually
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center text-sm text-blue-500 mb-4">
                <Button variant="ghost" size="sm" onClick={() => setIsManualMode(false)}>
                  ← Back to AI Mode
                </Button>
              </div>

              <div className="space-y-4">
                {rules.map((rule, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center">
                    <Input
                      value={rule.category}
                      onChange={(e) => {
                        const newRules = [...rules];
                        newRules[index].category = e.target.value;
                        setRules(newRules);
                      }}
                      placeholder="Category"
                    />
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <Input
                        type="number"
                        value={rule.amount}
                        onChange={(e) => {
                          const newRules = [...rules];
                          newRules[index].amount = Number(e.target.value);
                          setRules(newRules);
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={rule.frequency}
                        onChange={(e) => {
                          const newRules = [...rules];
                          newRules[index].frequency = Number(e.target.value);
                          setRules(newRules);
                        }}
                        className="w-20"
                      />
                      <span>per</span>
                      <select
                        value={rule.period}
                        onChange={(e) => {
                          const newRules = [...rules];
                          newRules[index].period = e.target.value as "Weekday" | "Month" | "Year";
                          setRules(newRules);
                        }}
                        className="border rounded p-2"
                      >
                        <option>Weekday</option>
                        <option>Month</option>
                        <option>Year</option>
                      </select>
                    </div>
                    <div className="text-green-500 font-medium">Active</div>
                  </div>
                ))}
              </div>

              <Button onClick={handleAddRule} variant="outline" className="w-full">
                + Add
              </Button>

              <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={handleSubmit}>
                  <Check className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyEditorDialog;