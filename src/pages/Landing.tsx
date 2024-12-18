import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-serif font-semibold leading-tight text-warm-500 mb-6">
            Seamless Reimbursements Made Simple.
          </h1>
          <p className="text-lg text-warm-400 mb-8">
            Automate and streamline your expense approval process with AI-driven precision. 
            Say goodbye to delays and inconsistent approvals.
          </p>
          <Link to="/register">
            <Button className="bg-[#494E5B] text-white hover:bg-[#363B47]">
              Try Now →
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-white">
        <h2 className="text-4xl font-serif text-center text-warm-500 mb-16">
          Why Choose Burse?
        </h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="p-8 rounded-xl bg-warm-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-10 h-10 text-warm-500 mb-4">
                <feature.icon />
              </div>
              <h3 className="text-xl font-semibold text-warm-500 mb-2">
                {feature.title}
              </h3>
              <p className="text-warm-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-warm-500 mb-4">
            Our Partners
          </h2>
          <p className="text-warm-400 mb-12">
            We're proud to collaborate with prestigious institutions.
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <img 
              src="/lovable-uploads/af397d13-920f-4c43-b9d7-cecd92e3d707.png" 
              alt="Duke University Logo" 
              className="h-16 object-contain"
            />
            <div className="w-16 h-16 bg-[#57068c] flex items-center justify-center rounded">
              <span className="text-white text-2xl font-bold">NYU</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-warm-500 mb-8">
            Ready to Transform Your Approvals?
          </h2>
          <Link to="/register">
            <Button className="bg-[#494E5B] text-white hover:bg-[#363B47]">
              Join Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-50 py-8 px-8">
        <div className="max-w-7xl mx-auto text-center text-warm-400">
          <p>© 2024 Burse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>
    ),
    title: "AI-Powered Approvals",
    description: "Automatically validate every reimbursement against your policies—no manual oversight required.",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Seamless ERP Integration",
    description: "Easily connect with existing ERP systems like SAP, NetSuite, or QuickBooks to streamline your workflows.",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Group & Team Support",
    description: "Organize and manage reimbursement across projects, departments, or startup batches effortlessly.",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Automate and Grow",
    description: "Free your team from repetitive admin tasks, enabling them to focus on growth and strategic priorities.",
  },
];

export default Landing;
