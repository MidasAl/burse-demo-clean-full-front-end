import { Link } from "react-router-dom";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { RegisterForm } from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-warm-50">
      <AuthHeader />
      <div className="max-w-md mx-auto mt-12 px-8">
        <h1 className="text-4xl font-semibold text-center mb-4">Get Started Today</h1>
        <p className="text-center text-warm-400 mb-8">
          Automate reimbursement requests in seconds.
        </p>
        <RegisterForm />
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