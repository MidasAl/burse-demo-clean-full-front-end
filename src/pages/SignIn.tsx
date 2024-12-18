import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Attempt to sign in directly without checking email confirmation
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If we get any error other than email_not_confirmed, throw it
        if (!error.message.includes('email_not_confirmed')) {
          throw error;
        }
      }

      // Check if user is an admin
      const { data: userData } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', data?.user?.id)
        .single();

      if (!userData?.is_admin) {
        throw new Error('Access denied. Admin privileges required.');
      }

      toast({
        title: "Success",
        description: "Successfully signed in!",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

      <div className="max-w-md mx-auto mt-20 px-8">
        <h1 className="text-4xl font-semibold text-center mb-8">Welcome back</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-warm-500">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-warm-500">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link
              to="/forgot-password"
              className="block text-sm text-blue-600 hover:underline mt-1"
            >
              Forgot your password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/90"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <p className="text-center mt-6 text-sm text-warm-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Let's get started
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
