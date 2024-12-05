import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title, 
  description, 
  icon = <FolderOpen className="w-12 h-12 text-warm-400" />
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] p-8 text-center">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-warm-500 mb-2">{title}</h3>
      <p className="text-warm-400 max-w-sm">{description}</p>
    </div>
  );
}