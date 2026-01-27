'use client';

import Image from 'next/image';



interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
  colorClass?: string;
}

const BenefitCard = ({ icon, title, description, colorClass = "text-blue-600" }: BenefitCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
      <div className={`rounded-full p-3 inline-flex ${colorClass} bg-opacity-10 mb-4`}>
        <Image src={icon} alt={title} width={28} height={28} />
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface StatsBenefitsGridProps {
  title: string;
  description: string;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
    colorClass?: string;
  }>;
  colorClass?: string;
  bgColorClass?: string;
}

const StatsBenefitsGrid = ({ 
  title, 
  description, 
  benefits = [],
  colorClass = "text-blue-600",
  bgColorClass = "bg-blue-50" 
}: StatsBenefitsGridProps) => {
  return (
    <div className={`${bgColorClass} py-12 px-4 rounded-xl`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="max-w-2xl mx-auto text-gray-600">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              colorClass={benefit.colorClass || colorClass}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBenefitsGrid;