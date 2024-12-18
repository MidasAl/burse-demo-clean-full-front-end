import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AuthHeader = () => {
  return (
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
  );
};