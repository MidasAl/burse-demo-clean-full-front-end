import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface FormData {
  name: string;
  companyName: string;
  workEmail: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
}

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    companyName: "",
    workEmail: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cooldown) {
      toast({
        title: "Please wait",
        description: "You can try registering again in a few seconds",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!formData.isAdmin) {
      toast({
        title: "Error",
        description: "Only admin registration is allowed at this time",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setCooldown(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.workEmail,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            company_name: formData.companyName,
            is_admin: formData.isAdmin,
          },
        },
      });

      if (error) {
        if (error.message.includes('rate_limit')) {
          toast({
            title: "Too many attempts",
            description: "Please wait a few seconds before trying again",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      if (data) {
        toast({
          title: "Success",
          description: "Registration successful! You can now sign in.",
        });
        navigate("/sign-in");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      // Reset cooldown after 11 seconds (Supabase's rate limit)
      setTimeout(() => {
        setCooldown(false);
      }, 11000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm text-warm-500">
          Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="companyName" className="block text-sm text-warm-500">
          Company Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="companyName"
          name="companyName"
          placeholder="Your company name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="workEmail" className="block text-sm text-warm-500">
          Work Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="workEmail"
          name="workEmail"
          type="email"
          placeholder="Your work email"
          value={formData.workEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm text-warm-500">
          Password <span className="text-red-500">*</span>
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password (at least 10 characters)"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={10}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm text-warm-500">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isAdmin"
          checked={formData.isAdmin}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, isAdmin: checked as boolean }))
          }
        />
        <label
          htmlFor="isAdmin"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Yes, I want to register as an admin
        </label>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[#4F46E5] hover:bg-[#4338CA]"
        disabled={loading || cooldown}
      >
        {loading ? "Registering..." : cooldown ? "Please wait..." : "Register"}
      </Button>
    </form>
  );
};