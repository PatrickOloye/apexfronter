


interface StrategyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass?: string;
}

export const StrategyCard = ({ title, description, icon, colorClass = "blue-600" }: StrategyCardProps) => {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 border-${colorClass} hover:shadow-lg transition-shadow duration-300`}>
        <div className="flex items-start">
          <div className={`mr-4 p-3 rounded-full bg-${colorClass} bg-opacity-10 text-${colorClass}`}>
            {icon}
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">{title}</h4>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    );
  };