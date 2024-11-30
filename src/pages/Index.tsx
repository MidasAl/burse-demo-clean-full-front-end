import { motion } from "framer-motion";
import { ArrowRight, Database, Users, CheckCircle2, AlertCircle } from "lucide-react";

const integrations = [
  {
    type: "ERP",
    name: "SAP Integration",
    status: "connected",
    description: "Enterprise resource planning system integration",
    icon: Database,
  },
  {
    type: "CRM",
    name: "Salesforce",
    status: "disconnected",
    description: "Customer relationship management platform",
    icon: Users,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <header className="text-center space-y-4">
          <span className="inline-block px-4 py-1.5 bg-warm-100 text-warm-500 rounded-full text-sm font-medium">
            Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold text-warm-500">
            System Integrations
          </h1>
          <p className="text-warm-400 max-w-2xl mx-auto">
            Connect and manage your enterprise systems in one place
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-warm-50 rounded-xl">
                    <integration.icon className="w-6 h-6 text-warm-500" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-warm-400">
                      {integration.type}
                    </span>
                    <h3 className="text-xl font-semibold text-warm-500">
                      {integration.name}
                    </h3>
                  </div>
                </div>
                {integration.status === "connected" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-warm-300" />
                )}
              </div>

              <p className="mt-4 text-warm-400">
                {integration.description}
              </p>

              <button className="mt-6 w-full py-3 px-4 bg-warm-50 hover:bg-warm-100 text-warm-500 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center group">
                {integration.status === "connected" ? "Manage Integration" : "Connect Now"}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;