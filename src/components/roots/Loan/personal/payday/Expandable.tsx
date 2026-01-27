// ExpandableContent.tsx
import { ReactNode, useState } from 'react';

interface ExpandableContentProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  defaultExpanded?: boolean;
  colorScheme?: string;
}

export const ExpandableContent = ({ 
  title, 
  children, 
  icon, 
  defaultExpanded = false,
  colorScheme = 'blue-600'
}: ExpandableContentProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      <button
        className={`w-full p-4 flex items-center justify-between text-left ${isExpanded ? `bg-${colorScheme} text-white` : 'bg-white text-gray-800'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {icon && <span>{icon}</span>}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <svg
          className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};