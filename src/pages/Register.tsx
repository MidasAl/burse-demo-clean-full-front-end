import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    workEmail: "",
    password: "",
    confirmPassword: "",
    isAdmin: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        description: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }

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
        toast({
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      toast({
        description: "Registration successful! Please check your email to verify your account.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-warm-50">
      <nav className="flex justify-between items-center px-8 py-4">
        <Link to="/" className="text-2xl font-semibold text-warm-500">
          Burse
        </Link>
        <div className="space-x-4">
          <Link to="/sign-in">
            <Button variant="ghost" className="text-warm-500">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-[#494E5B] text-white hover:bg-[#363B47]">
              Register
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-md mx-auto mt-12 px-8">
        <h1 className="text-4xl font-semibold text-center mb-4">Get Started Today</h1>
        <p className="text-center text-warm-400 mb-8">
          Automate reimbursement requests in seconds.
        </p>
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
              Yes, I want to register as an admin.
            </label>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#4F46E5] hover:bg-[#4338CA]"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-warm-50 px-2 text-warm-400">or</span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate("/dashboard")}
          >
            Sign Up with Google
          </Button>
        </form>
        <p className="text-center mt-6 text-sm text-warm-400">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;