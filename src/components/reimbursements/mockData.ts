export const reimbursementRequests = [
  {
    title: "Office Supplies Bundle",
    amount: "$124.50",
    user: "Sarah Johnson",
    date: "Today",
    category: "Office Supplies",
    note: "Purchased printer paper, ink cartridges, and filing supplies for Finance Department",
    status: "AI Approved",
    department: "Finance Department",
    aiConfidence: "High" as const,
    aiRecommendation: "Receipt matches company policy for office supplies. All items are business-related."
  },
  {
    title: "Software License",
    amount: "$299.99",
    user: "Michael Chen",
    date: "Today",
    category: "Software",
    note: "Annual subscription renewal for development tools",
    status: "AI Approved",
    department: "IT Department",
    aiConfidence: "High" as const,
    aiRecommendation: "Standard software renewal, matches previous year's expense pattern."
  },
  {
    title: "Team Building Event",
    amount: "$450.00",
    user: "Emily Rodriguez",
    date: "Yesterday",
    category: "Team Events",
    note: "Team lunch and workshop materials for HR quarterly meeting",
    status: "AI Approved",
    department: "HR Department",
    aiConfidence: "High" as const,
    aiRecommendation: "Expense matches quarterly team event budget allocation."
  },
  {
    title: "Marketing Materials",
    amount: "$875.25",
    user: "James Wilson",
    date: "Yesterday",
    category: "Marketing",
    note: "Printed brochures and banners for upcoming trade show",
    status: "AI Approved",
    department: "Marketing Department",
    aiConfidence: "High" as const,
    aiRecommendation: "Expense aligns with approved trade show budget."
  },
  {
    title: "Research Equipment",
    amount: "$1,299.99",
    user: "Aisha Patel",
    date: "Yesterday",
    category: "Equipment",
    note: "New testing equipment for R&D lab",
    status: "AI Pending Review",
    department: "Research & Development",
    aiConfidence: "Medium" as const,
    aiRecommendation: "Equipment purchase exceeds standard limit. Requires department head approval."
  }
];