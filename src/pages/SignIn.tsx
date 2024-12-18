import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      toast({
        description: "Successfully signed in!",
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
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
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
            Continue with Google
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