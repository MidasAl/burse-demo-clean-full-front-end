import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Navigation */}
      <div className="w-full fixed top-0 z-50 px-8 py-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-2xl font-light text-white">
              burse
            </span>
          </Link>
          <div className="ml-auto space-x-4">
            <Link to="/sign-in">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Register
              </Button>
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section 
        className="h-screen w-full relative flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url("/lovable-uploads/685d07ba-496b-4539-b759-eeaf8f015310.png")',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white md:w-1/2"
          >
            <h1 className="text-5xl font-serif font-semibold leading-tight mb-6">
              Effortless Research Administration.
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Automate and streamline grants, reimbursements, and compliance. Focus on advancing knowledge, not paperwork.
            </p>
            <Link to="/register">
              <Button className="bg-white text-warm-500 hover:bg-white/90 w-fit text-lg px-8 py-6">
                Get Started →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-12 bg-white">
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
      <section className="py-20 px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-warm-500 mb-4">
            Our Partners
          </h2>
          <p className="text-warm-400 mb-12">
            We're proud to collaborate with prestigious institutions.
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="w-16 h-16 bg-[#012169] flex items-center justify-center rounded">
              <span className="text-white text-lg font-bold">Duke</span>
            </div>
            <div className="w-16 h-16 bg-[#57068c] flex items-center justify-center rounded">
              <span className="text-white text-lg font-bold">NYU</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-warm-500 mb-8">
            Ready to Transform Your Research Administration?
          </h2>
          <Link to="/register">
            <Button className="bg-[#494E5B] text-white hover:bg-[#363B47]">
              Join Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-50 py-8 px-12">
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
    title: "AI-Powered Grant Management",
    description: "Automate grant compliance and expense validation, ensuring policies are met without manual intervention.",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Seamless Integration",
    description: "Connect with your institution's existing systems for payroll, budgets, and compliance.",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Collaboration Made Easy",
    description: "Manage projects, budgets, and reimbursements across teams and departments effortlessly.",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Focus on Discovery",
    description: "Let automation handle the bureaucracy so your team can concentrate on research breakthroughs.",
  },
];

export default Landing;