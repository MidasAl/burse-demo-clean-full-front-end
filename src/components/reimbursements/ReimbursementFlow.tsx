import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type ReimbursementType = "Uber" | "Hotel" | "Flight" | "Food" | "Other";
type Step = "select-type" | "upload-receipt" | "status";

export const ReimbursementFlow = () => {
  const [step, setStep] = useState<Step>("select-type");
  const [type, setType] = useState<ReimbursementType | "">("");
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setStep("status");
  };

  const renderSelectType = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center mb-8">Reimbursement Requests</h2>
        <div className="space-y-4">
          <label className="text-sm text-warm-500">Select Reimbursement Type</label>
          <Select value={type} onValueChange={(value) => setType(value as ReimbursementType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Uber">Uber</SelectItem>
              <SelectItem value="Hotel">Hotel</SelectItem>
              <SelectItem value="Flight">Flight</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => window.history.back()}>Back</Button>
          <Button 
            disabled={!type} 
            onClick={() => setStep("upload-receipt")}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderUploadReceipt = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center mb-8">Upload {type} Receipt</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-warm-500">Amount</label>
            <Input 
              type="number" 
              placeholder="Enter amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-warm-500">Document Type</label>
            <Select defaultValue="receipt">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="receipt">Receipt</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-warm-500">Reimbursement Details</label>
            <Textarea 
              placeholder="Enter details about your reimbursement request"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-warm-50 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm text-warm-500">Drop files here or click to upload</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => setStep("select-type")}>Back</Button>
          <Button 
            disabled={!amount || !details} 
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStatus = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center">Reimbursement Decision</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Status:</span>
            <span className="text-green-600 font-medium">Approved</span>
          </div>
          <div className="bg-warm-50 p-4 rounded-lg">
            <p className="text-sm text-warm-600">
              The reimbursement request for legitimate expenses incurred for the Fall Community
              Welcome Event at Duke University. The total amount requested is ${amount}, which aligns with
              the detailed breakdown provided for community event supplies and food & beverage.
            </p>
          </div>
        </div>
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => window.history.back()}>Return to Groups</Button>
          <Button onClick={() => setStep("select-type")}>Submit Another</Button>
        </div>
      </CardContent>
    </Card>
  );

  if (isSubmitting) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-warm-500 mb-4"></div>
          <p className="text-warm-500">Verifying Reimbursement...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {step === "select-type" && renderSelectType()}
      {step === "upload-receipt" && renderUploadReceipt()}
      {step === "status" && renderStatus()}
    </div>
  );
};